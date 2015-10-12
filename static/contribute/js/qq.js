(function(window, document, undefined) {
    QC.Login(getQQButtonInfo(), loginCallBack, logoutCallBack);

    function getQQButtonInfo() {
        return {
            btnId : "qqLoginBtn",//插入按钮的html标签id
            size : "C_S",//按钮尺寸
            scope : "get_user_info,add_share,add_topic,list_album,upload_pic,add_album",
            display : "pc"//应用场景，可选
        };
    }

    function loginCallBack(oInfo, oOpts) {
        navShowQQinfo(oInfo);
        saveCookie();
        saveUserInfo(oInfo);
    }

    function logoutCallBack() {
        alert("注销成功!");
    }

    function navShowQQinfo(oInfo) {
        var button = $('#qqLoginBtn');

        var QQinfoTemplate=[
             '<span><img src="{figureurl}" class="{size_key}"/></span>',
             '<span>{nickname}</span>',
             '<span><a href="javascript:QC.Login.signOut();">退出</a></span>'
        ].join("");

        button.html(QC.String.format(QQinfoTemplate, {
           nickname : QC.String.escHTML(oInfo.nickname), //做xss过滤
           figureurl : oInfo.figureurl_qq_1
        }));
    }

    function saveCookie () {
        QC.Login.getMe(function(openId, accessToken){
            document.cookie = 'openId=' + openId;
            document.cookie = 'accessToken=' + accessToken;
            console.log('openId=' + openId);
            console.log('accessToken=' + accessToken);
        });
    }

    function saveUserInfo(oInfo) {
        console.log(oInfo.nickname);
        console.log(oInfo.figureurl_qq_1);
        console.log(oInfo.gender);
    }
})(window, document);
