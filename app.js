const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

(async () => {
    try {
        await mongoose.connect('mongodb+srv://serkan:qRJ2gXt8mzb84oEE@cluster0-axzgd.mongodb.net/blog-site?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("MongoDB Connection Error: ", err);
    }
})();




app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', exphbs({
    defaultLayout: 'home'
}));

app.set('view engine', 'handlebars');

const mainRoutes = require('./routes/home/index');
const adminRoutes = require('./routes/admin/index');
const postsRoutes = require('./routes/admin/posts');

app.use('/', mainRoutes);
app.use('/admin', adminRoutes);
app.use('/admin/posts', postsRoutes);



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});