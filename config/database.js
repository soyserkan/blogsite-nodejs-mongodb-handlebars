const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect('mongodb+srv://serkan:qRJ2gXt8mzb84oEE@cluster0-axzgd.mongodb.net/blog-site?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("MongoDB Connection Error: ", err);
    }
}