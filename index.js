const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 8080;

app.use(express.json());

mongoose.connect (process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
console.log('Connected to MongoDB!')
);

app.listen(
    PORT,
    () => console.log(`It's live on http://localhost:${PORT}`)
);
