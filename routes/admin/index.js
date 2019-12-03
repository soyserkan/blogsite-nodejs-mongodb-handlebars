const express = require('express');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/Post');
const { userAuthenticated } = require('../../helpers/authentication');

router.all('/*', userAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', (req, res) => {

    res.render('admin/index');
});
router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard');
});

router.post('/generate-fake-posts', async (req, res) => {

    for (let i = 0; i < req.body.amount; i++) {
        let post = new Post();
        post.title = faker.lorem.words();
        post.status = 'public';
        post.allowComments = faker.random.boolean();
        post.body = faker.lorem.sentences();
        post.file = faker.image.imageUrl();
        try {
            await post.save();

        } catch (error) {
            console.log('Error occured: ', error);
        }
    }
    res.redirect('/admin/posts');
});




module.exports = router;