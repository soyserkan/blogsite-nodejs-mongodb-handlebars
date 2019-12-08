const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public'
    },
    allowComments: {
        type: Boolean,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    file: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    slug: {
        type: String
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comments'
    }]
});

PostSchema.plugin(URLSlugs('title', { field: 'slug' }));

module.exports = mongoose.model('Posts', PostSchema);

