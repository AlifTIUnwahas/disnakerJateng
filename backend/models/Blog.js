const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    photo: {
        url: { type: String },
        context: { type: String }
    },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: [String], required: true },
    author: { type: String },
    category: { type: String },
    tags: [String],
    status: { type: String, default: 'draft' },
    date: { 
        type: Date, 
        default: Date.now 
    }
}, { collection: 'posts' });

module.exports = mongoose.model('Post', PostSchema);