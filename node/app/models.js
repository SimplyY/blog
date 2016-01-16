var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.mongoUrl);

var tagSchema = new mongoose.Schema({
    tagName: String,
    parentTagName: String,
    aritcleTitleList:[String]
});

// TODO : change date timezone
var articleSchema = new mongoose.Schema({
    title: String,
    parentTagName: String,
    md: String,
    date: { type: Date, default: Date.now },

    loveNumber: Number,
    shareNumber: Number,
    comments:[{
        date: { type: Date, default: Date.now },

        email: String,
        avatorUrl: String,
        nickName: String,
        content: String,
    }]
});

module.exports = {
    tagSchema,
    articleSchema
};
