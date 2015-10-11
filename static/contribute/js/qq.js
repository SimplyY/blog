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
        saveCookie();
        saveUserInfo(oInfo);
    }

    function logoutCallBack() {
        alert("注销成功!");
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
