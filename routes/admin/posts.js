const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', async (req, res) => {
    try {
        const postsData = await Post.find({});
        res.render("admin/posts", {
            postsData
        });
    } catch (error) {
        console.log('Error occured: ', error);
    }
});

router.get('/create', (req, res) => {
    res.render('admin/posts/create');
});

router.post('/create', async (req, res) => {
    let allowComments = await (req.body.allowComments == 'on') ? true : false
    try {
        const newPost = new Post({
            title: req.body.title,
            status: req.body.status,
            allowComments: allowComments,
            body: req.body.body
        });
        await newPost.save();
        console.log('Post added');
        res.redirect('/admin/posts');
    } catch (error) {
        console.log('Error occured: ', error);
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            _id: req.params.id
        });
        res.render("admin/posts/edit", {
            postData
        });
    } catch (error) {
        console.log('Error occured: ', error);
    }
});

router.put('/edit/:id', async (req, res) => {
    let allowComments = await (req.body.allowComments == 'on') ? true : false
    try {
        const updateData = await Post.findOne({
            _id: req.params.id
        });
        updateData.title = req.body.title;
        updateData.status = req.body.status;
        updateData.allowComments = allowComments;
        updateData.body = req.body.body;
        await updateData.save();
        await console.log(updateData);
        await res.redirect('/admin/posts');

    } catch (error) {
        console.log('Error occured: ', error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedData = await Post.remove({
            _id: req.params.id
        });
        console.log('Data deleted');
        res.redirect('admin/posts');
    } catch (error) {
        console.log('Error occured: ', error);
    }
});

module.exports = router;