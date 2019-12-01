const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');


router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});

router.get('/', async (req, res) => {

    try {
        const postData = await Post.find({});
        const categoryData = await Category.find({});
        res.render('home/index', { postData,categoryData });
    } catch (error) {
        console.log(`Error occured: ${error}`);
    }

});
router.get('/about-us', (req, res) => {
    res.render('home/about-us');
});
router.get('/login', (req, res) => {
    res.render('home/login');
});

router.get('/post-detail/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            _id: req.params.id
        });
        const categoryData = await Category.find({});
        res.render('home/post-detail', { postData,categoryData });
    } catch (error) {
        console.log(`Error occured: ${error}`);
    }
})

module.exports = router;