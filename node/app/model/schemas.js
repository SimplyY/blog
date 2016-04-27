var moment = require('moment-timezone')
var mongoose = require('mongoose')

exports.tagSchema = new mongoose.Schema({
    tagName: { type: String, required: true },
    parentTagName: { type: String, required: true },

    // 几级目录，一级目录从 1 开始
    tagRank: Number,

    // 此标签的父标签数组，比如，对于路径 /yourPath/Article/编程/web 前端/es6简版入门
    // parentsTagNameArray： [ '编程', 'web 前端' ]
    parentsTagNameArray: [{ type: String, required: true }],

    // without sorted
    // 此标签下的所有文章，即标签所在文件路径里的所有 md 文件
    articleTitleList:[{ type: String, required: true }] // 属于此标签
})

exports.articleSchema = new mongoose.Schema({
    // md 文件，不包括'.md'后缀
    title: { type: String, required: true },
    parentTagName: { type: String, required: true },
    parentsTagNameArray: [{ type: String, required: true }], // 同上
    md:  { type: String, required: true },
    html: { type: String, required: true},
    minHtml: {type: String, require: true},
    contentOfTable: { type: String, required: true },
    // because date con't be json.stringfy safe, so use String type
    date: { type: String, default: moment().tz('Asia/Shanghai').format() },
    editedDate: { type: String, default: moment().tz('Asia/Shanghai').format() },

    loveNumber: { type: Number, default: 0 },
    shareNumber: { type: Number, default: 0 },
    // diffcult,easy grade
    grade: { type: Number, default: 50 },

    comments:[{
        date: { type: String, default: moment().tz('Asia/Shanghai').format() },

        email: String,
        avatorUrl: String,
        nickName: String,
        content: String,
    }]
})
