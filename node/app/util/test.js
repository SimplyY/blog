var getTagAndArticle = require('./read-tag-article').getTagAndArticle;

getTagAndArticle(function(tags, articles) {
    console.log(articles.length);
});
