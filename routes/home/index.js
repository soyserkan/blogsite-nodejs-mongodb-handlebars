const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');


router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});

router.get('/', async (req, res) => {

    try {
        const postData = await Post.find({}).populate('category');
        const categoryData = await Category.find({});
        res.render('home/index', { postData, categoryData });
    } catch (error) {
        console.log(`Error occured: ${error}`);
    }

});
router.get('/about-us', (req, res) => {
    res.render('home/about-us');
});

router.get('/login', (req, res) => {
    res.render('home/login', { layout: false });
});

router.get('/register', (req, res) => {
    res.render('home/register', { layout: false });
});

router.post('/register', async (req, res) => {

    let errors = [];

    if (req.body.password != req.body.confirmPassword) {
        errors.push({ message: 'passwords are not mached!' });
    }
    if (errors.length > 0) {
        res.render('home/register', {
            layout: false,
            errors,
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email
        });

    } else {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            const newUser = await new User({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: req.body.password
            });
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(newUser.password, salt);
            newUser.password = hash;
            await newUser.save();
            await req.flash('success_message', 'You are now registered, please login');
            res.redirect('/login');
        } else {
            req.flash('error_message', 'That mail exist, please login');
            res.redirect('/login');
        }
    }
});

router.get('/post-detail/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            _id: req.params.id
        }).populate('category');
        const categoryData = await Category.find({});
        res.render('home/post-detail', { postData, categoryData });
    } catch (error) {
        console.log(`Error occured: ${error}`);
    }
})

module.exports = router;