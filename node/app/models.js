var mongoose = require('mongoose');
var config = require('./config');
var moment = require('moment-timezone');

mongoose.connect(config.mongoUrl);

var tagSchema = new mongoose.Schema({
    tagName: { type: String, required: true },
    parentTagName: { type: String, required: true },
    // 此标签所属的标签数组，TagNameArray[0] 就是一级标签，使用直接遍历即可
    TagNameArray: [{ type: String, required: true }],
    aritcleTitleList:[{ type: String, required: true }] // 属于此标签
});

var articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    parentTagName: { type: String, required: true },
    TagNameArray: [{ type: String, required: true }], // 同上
    md:  { type: String, required: true },
    // because date con't be json.stringfy safe, so use String type
    date: { type: String, default: moment().tz("Asia/Shanghai").format() },

    loveNumber: Number,
    shareNumber: Number,
    comments:[{
        date: { type: String, default: moment().tz("Asia/Shanghai").format() },

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
