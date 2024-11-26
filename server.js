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

  // get comments
  app.get('/api/comments/:id', async (req, res) => {
    try {
      const ids = req.params.id;
      const comments = await Comment.find({ article_id: req.params.id });
      res.status(200).json({ message: 'Comments found', data: comments });
    } catch (err) {
      console.log('エラー:', err);
      res.status(500).json({ message: 'Server error', error: err });
    }
  })


// POSTリクエストを処理
app.post('/api/comments', async (req, res) => {
    try {
      const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment,
        date: new Date(),
        article_id: req.body.article_id
      });
  
      const result = await comment.save();
      console.log("コメントの保存成功", result);
      
      res.status(201).json({ message: 'Comment saved successfully', data: result });
    } catch (err) {
      console.log('エラー:', err);
      res.status(500).json({ message: 'Server error', error: err });
    }
  });


// cors

// use server
app.listen(SERVER_PORT, () => {
  console.log(`server is running on port ${SERVER_PORT}`);
});
