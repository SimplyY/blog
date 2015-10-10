var scene = new Vue({
    el: '#list',
    data: {
        list_title: '春薄日暖花相惜',
        author: 'XXX',
        month: '3',
        season: '春',
        location: 'lala',
        article_content: ''
    },
    methods: {
        clickList: function(e) {
            var article = new Vue({
                el: '#article',
                data: {
                    title: scene.list_title,
                    author: scene.author,
                    season: scene.season,
                    month: scene.month,
                    location: scene.location,
                    article_content: scene.article_content
                },
                methods: {
                    contribute: function(e) {
                        scene.list_title = article.title;
                        scene.author = article.author;
                        scene.month = article.month;
                        scene.season = article.season;
                        scene.location = article.location;
                        scene.article_content = article.article_content
                    }
                }
            })
        }
    }
})
