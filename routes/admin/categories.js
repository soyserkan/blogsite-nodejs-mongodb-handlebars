const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');
const { userAuthenticated } = require('../../helpers/authentication');

router.all('/*',userAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', async (req, res) => {
    const categoriesData = await Category.find({});
    res.render('admin/categories/index', { categoriesData });
});

router.post('/create', async (req, res) => {

    const newCategory = new Category({
        name: req.body.name
    });
    await newCategory.save();
    res.redirect('/admin/categories');
});

router.get('/edit/:id', async (req, res) => {
    const categoriesData = await Category.findOne({ _id: req.params.id });
    res.render('/admin/categories/edit', { categoriesData });
});

router.put('/update/:id', async (req, res) => {
    const categoriesData = await Category.findOne({ _id: req.params.id });
    categoriesData.name = req.body.name;
    await categoriesData.save();
    res.redirect('/admin/categories');
});

router.get('/:id', async (req, res) => {
    const categoriesData = await Category.findOne({ _id: req.params.id });
    await categoriesData.remove();
    res.redirect('/admin/categories');
});

module.exports = router;