// in there https://github.com/SimplyY/JnPlant-node/blob/master/models%2Fscene.js

(function(window, document, $) {
    var sceneApiUrl = 'http://simplyy.space:8080/JnPlant/api/scene';

    // 获得美景 list
    $.get(sceneApiUrl, function (data) {
        console.log("sceneList");
        console.log(data);
    });

    // 添加一个美景
    var newScene = {
        title: "test",
        article: "### aa url",
        author: "simplyy",
        month: 10,
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

    // 删除一个美景
    function deleteScene(scenceId) {
        $.ajax({
            url: sceneApiUrl + '/' + scenceId,
            type: 'delete',
            success: function(result) {
                console.log(result);
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
