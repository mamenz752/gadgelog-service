// use Express as server
const express = require('express');
const app = express();
const SERVER_PORT = 5000;

// use middle-ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use MongoDB as database
const mongoose = require('mongoose');

// use Schema and Model
const Comment = require('./models/comment');

// MongoDB接続をアプリケーションの起動時に一度だけ行う
mongoose.connect('mongodb://root:password@localhost:27017/comment?authSource=admin', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    console.log('MongoDBに接続しました');
  })
  .catch((err) => {
    console.error('MongoDB接続エラー:', err);
  });

// POSTリクエストを処理

// get
// app.get('api/comments/:id', async (req, res) => {

// })

// cors

// use server
app.listen(SERVER_PORT, () => {
  console.log(`server is running on port ${SERVER_PORT}`);
});
