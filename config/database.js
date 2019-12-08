const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect('mongodb://serkan:123123a@ds113442.mlab.com:13442/blogsite-nodejs', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("MongoDB Connection Error: ", err);
    }
}