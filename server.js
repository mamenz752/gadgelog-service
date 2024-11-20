// use Express as server
const express = require('express');
const app = express();
const SERVER_PORT = 5000;

// use MongoDB as database
const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://localhost:27017/comments'
)

const db = mongoose.connection;

db.once('open', () => {
  console.log('database connected');
});

app.get('/', (req, res) => {
  console.log('hello express');
});

app.listen(SERVER_PORT, () => {
  console.log(`server is running on port ${SERVER_PORT}`)
})