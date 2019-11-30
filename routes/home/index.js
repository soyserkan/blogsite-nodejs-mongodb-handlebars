const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');


router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});

router.get('/', async (req, res) => {

    try {
        const allData = await Post.find({});
        res.render('home/index', { allData });
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
        const singleData = await Post.findOne({
            _id: req.params.id
        });
        res.render('home/post-detail', { singleData });
    } catch (error) {
        console.log(`Error occured: ${error}`);
    }
})

module.exports = router;