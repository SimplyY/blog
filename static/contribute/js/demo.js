// in there https://github.com/SimplyY/JnPlant-node/blob/master/models%2Fscene.js

(function(window, document, $) {
    var sceneApiUrl = 'http://simplyy.space:8080/JnPlant/api/scene';
    // 获得美景 list
    $.get(sceneApiUrl, function (data) {
        console.log("sceneList");
        console.log(data);
        var changeInfo = {"title":"title has updated"};
        changeScene(data[0]._id, changeInfo);
    });

    // 添加一个美景
    var newScene = {
        title: "test",
        article: "### aa url",
        author: "simplyy",
        month: 10,
        season: '春',
        img: "http://7xkpdt.com1.z0.glb.clouddn.com/15-10-13/76156696.jpg",
        location: "一食堂",
        hasChecked: false,
    };
    $.post(sceneApiUrl, newScene, function (scene) {
        // in this data has got
        console.log("post success");
        console.log(scene);
        deleteScene(scene._id);
    }).fail(function() {
        // TODO show tips to user
        // must do it
        console.log("post error");
    });

    // 修改一个美景
    function changeScene(sceneId, changeInfo) {
        $.ajax({
            url: sceneApiUrl + '/' + sceneId,
            type: 'PUT',
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify(changeInfo),
            success: function (result) {
                console.log(result);
                console.log("put success");
            },
            error: function () {
                // TODO show tips to user
                // must do it
                console.log("change error");
            }
        });
    }

    // 删除一个美景
    function deleteScene(sceneId) {
        $.ajax({
            url: sceneApiUrl + '/' + sceneId,
            type: 'delete',
            success: function(result) {
                console.log("del success");
                // Do something with the result
            },
            error: function () {
                // TODO show tips to user
                // must do it
                console.log("del error");
            }
        });
    }

})(window, document, jQuery);
