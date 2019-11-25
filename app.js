const express = require('express');
const exphbs = require('express-handlebars');

const app = express();


app.use(express.static(`${__dirname}/public`));


app.engine('handlebars', exphbs({
    defaultLayout: 'home'
}));

app.set('view engine', 'handlebars');

const mainRoutes = require('./routes/home/index');
const adminRoutes = require('./routes/admin/index');

app.use('/',mainRoutes);
app.use('/admin',adminRoutes);



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});