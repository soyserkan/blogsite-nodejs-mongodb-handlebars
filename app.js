const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

(async () => {
    try {
        await mongoose.connect('mongodb+srv://serkan:qRJ2gXt8mzb84oEE@cluster0-axzgd.mongodb.net/blog-site?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("MongoDB Connection Error: ", err);
    }
})();


app.use(express.static(`${__dirname}/public`));

const { select, generateTime,limitString } = require('./helpers/handlebars-helpers');

app.engine('handlebars', exphbs({
    defaultLayout: 'home',
    helpers: { select, generateTime,limitString }
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

app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    next();
})


const mainRoutes = require('./routes/home/index');
const adminRoutes = require('./routes/admin/index');
const postsRoutes = require('./routes/admin/posts');
const categoriesRoutes = require('./routes/admin/categories');

app.use('/', mainRoutes);
app.use('/admin', adminRoutes);
app.use('/admin/posts', postsRoutes);
app.use('/admin/categories', categoriesRoutes);



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});