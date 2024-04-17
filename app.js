const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/Post');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/posts', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: 'desc' });
    res.json(posts);
});

app.post('/api/posts', async (req, res) => {
    const { title, content } = req.body;
    const post = new Post({ title, content });
    await post.save();
    res.status(201).json(post);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
