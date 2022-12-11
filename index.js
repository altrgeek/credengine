const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');



const AppError = require('./utilities/appError');
const globalErrorHandler = require('./controller/errorController');
const userRouter = require('./routes/userRoutes');



const app = express();
const PORT = 8080;

app.use(express.json());


// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });
  app.use('/api', limiter);


// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Routes
app.use('/api/users', userRouter);



app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

mongoose.connect (process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
console.log('Connected to MongoDB!')
);

app.listen(
    PORT,
    () => console.log(`It's live on http://localhost:${PORT}`)
);
