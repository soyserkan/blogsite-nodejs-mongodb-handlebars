const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const { isEmpty } = require('../../helpers/upload-helper');
const fs = require('fs');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', async (req, res) => {
    try {
        const postsData = await Post.find({}).populate('category');
        res.render("admin/posts", { postsData });
    } catch (error) {
        console.log('Error occured: ', error);
    }
});

router.get('/create', async (req, res) => {
    try {
        const categoryData = await Category.find({});
        res.render("admin/posts/create", { categoryData });
    } catch (error) {
        console.log('Error occured: ', error);
    }
});

router.post('/create', async (req, res) => {

    let errors = [];

    if (!req.body.title) {
        errors.push({ message: 'please add a title' });
    }
    if (!req.body.body) {
        errors.push({ message: 'please add a body' });
    }
    if (errors.length > 0) {
        res.render('admin/posts/create', { errors });
    } else {
        let filename = 'https://via.placeholder.com/150';
        if (!isEmpty(req.files)) {
            let file = req.files.file;
            filename = Date.now() + '-' + file.name;
            file.mv(`./public/uploads/${filename}`, (err) => {
                if (err) throw err;
            });
        };

        const allowComments = (req.body.allowComments == 'on') ? true : false;
        const newPost = new Post({
            title: req.body.title,
            status: req.body.status,
            allowComments: allowComments,
            body: req.body.body,
            file: filename,
            category: req.body.category
        });
        try {
            const savedData = await newPost.save();
            req.flash('success_message', `${savedData.title} başlıklı blog yazınız başarıyla oluşturuldu!`);
            res.redirect('/admin/posts');
        } catch (error) {
            console.log('Error occured: ', error);
        }
    }

});

router.get('/edit/:id', async (req, res) => {

    try {
        const postData = await Post.findOne({
            _id: req.params.id
        });
        const categoryData = await Category.find({});
        res.render("admin/posts/edit", { postData, categoryData });
    } catch (error) {
        console.log('Error occured: ', error);
    }
});

router.put('/edit/:id', async (req, res) => {
    const allowComments = (req.body.allowComments == 'on') ? true : false
    try {
        const updateData = await Post.findOne({ _id: req.params.id });
        updateData.title = req.body.title;
        updateData.status = req.body.status;
        updateData.allowComments = allowComments;
        updateData.body = req.body.body;
        updateData.category = req.body.category;

        if (!isEmpty(req.files)) {
            let file = req.files.file;
            filename = Date.now() + '-' + file.name;
            updateData.file = filename;
            file.mv(`./public/uploads/${filename}`, (err) => {
                if (err) throw err;
            });
        };
        await updateData.save();
        req.flash('success_message', 'Blog yazınız başarıyla güncellendi!');
        res.redirect('/admin/posts');
    } catch (error) {
        console.log('Error occured: ', error);
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        fs.unlink(`./public/uploads/${post.file}`, () => {
            post.remove();
            req.flash('success_message', 'Blog yazınız başarıyla silindi!');
            res.redirect('/admin/posts');
        });
    } catch (error) {
        console.log('Error occured: ', error);
    }
});
module.exports = router;