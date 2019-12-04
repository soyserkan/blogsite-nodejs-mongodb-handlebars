const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const app = express();

const db = require('./config/database')();


app.use(express.static(`${__dirname}/public`));

const { select, generateTime, limitString } = require('./helpers/handlebars-helpers');

app.engine('handlebars', exphbs({
    defaultLayout: 'home',
    helpers: { select, generateTime, limitString }
}));

app.set('view engine', 'handlebars');


app.use(upload());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.use(session({
    secret: 'serkansoy1994',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.form_errors = req.flash('form_errors');
    res.locals.error = req.flash('error');
    next();
})


const mainRoutes = require('./routes/home/index');
const adminRoutes = require('./routes/admin/index');
const postsRoutes = require('./routes/admin/posts');
const categoriesRoutes = require('./routes/admin/categories');
const commentsRoutes = require('./routes/admin/comments');

app.use('/', mainRoutes);
app.use('/admin', adminRoutes);
app.use('/admin/posts', postsRoutes);
app.use('/admin/categories', categoriesRoutes);
app.use('/admin/comments', commentsRoutes);



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});