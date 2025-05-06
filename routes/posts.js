const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.render('index', { posts });
    } catch (err) {
        console.error(err);
        res.render('error');
    }
});

// Show form to create new post
router.get('/new', auth, (req, res) => {
    res.render('new');
});

// Create new post
router.post('/', auth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = new Post({ title, content });
        await newPost.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('new', { error: 'Failed to create post' });
    }
});

// Show single post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('show', { post });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// Show edit form
router.get('/:id/edit', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('edit', { post });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// Update post
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, content } = req.body;
        await Post.findByIdAndUpdate(req.params.id, { title, content });
        res.redirect(`/posts/${req.params.id}`);
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

module.exports = router;

