const express = require('express');
const router = express.Router();


router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});

router.get('/', (req, res) => {
    res.render('home/index');
});
router.get('/about-us', (req, res) => {
    res.render('home/about-us');
});
router.get('/login', (req, res) => {
    res.render('home/login');
});

module.exports = router;