(function(window, document, undefined) {
    var hasLoved = false;
    var hasShared = false;

    $('#article-love-wrapper').on("click", function () {
        if (!hasLoved) {
            addNumber("/blog/add_love_number/", $('#love-number'));
            changeLoveImg();
            hasLoved = true;
        }

        function changeLoveImg() {
            var loveImageUrl = 'http://7xkpdt.com1.z0.glb.clouddn.com/15-10-7/95875549.jpg';
            $('#love-article').attr('src', loveImageUrl);
        }
    });

    $('.share-number-wrapper').on('click', function () {
        if (!hasShared) {
            addNumber('/blog/add_share_number/', $('#share-number'));
            shareInfo2clipboard();
            hasShared = true;
        }

        function shareInfo2clipboard() {
            var articleName = '《' + $("title").html() + '》';
            var blogName = 'SimplyY 的博客文章: ';
            var articleUrl = window.location.href;
            var shareInfo = blogName + articleName + '\n链接为： ' + articleUrl;

            window.prompt("你正在分享这篇博文\n将分享信息复制到剪贴板: Ctrl+C, Enter（回车）\n然后发到任何你想发的地方吧", shareInfo);
        }
    });

    function addNumber(apiName, numberDom) {
        var domain = document.domain;
        var articleName = $("title").html();
        var port = '';
        if (domain === '127.0.0.1') {
            port = ":8000";
        }
        var url = "http://" + domain + port + apiName + articleName;
        $.get(url);
        var number = parseInt(numberDom.html(), 10);
        numberDom.text(number + 1);
    }
})(window, document);
