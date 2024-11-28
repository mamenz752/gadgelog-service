// use Express as server
const express = require('express');
const cors = require('cors');
const app = express();
const SERVER_PORT = 5000;

// use middle-ware
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// use MongoDB as database
const mongoose = require('mongoose');

// use Schema and Model
const Comment = require('./models/comment');

// connect to MongoDB
mongoose.connect('mongodb://root:password@localhost:27017/comment?authSource=admin', {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    console.log('connection to MongoDB successful');
  })
  .catch((err) => {
    console.error('connection to MongoDB error:', err);
  });

// get comments
app.get('/api/comments/:id', async (req, res) => {
  try {
    const ids = req.params.id;
    const comments = await Comment.find({ article_id: req.params.id });
    res.status(200).json({ message: 'Comments found', data: comments });
  } catch (err) {
    console.log('error:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
})

// accept POST request
app.post('/api/comments', async (req, res) => {
  try {
    const comment = new Comment({
      name: req.body.name,
      comment: req.body.comment,
      date: new Date(),
      article_id: req.body.article_id
    });
    
    const result = await comment.save();
    console.log("save comment successful", result);
    res.status(201).json({ message: 'Comment saved successfully', data: result });
  } catch (err) {
    console.log('エラー:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// use server
app.listen(SERVER_PORT, () => {
  console.log(`server is running on port ${SERVER_PORT}`);
});
