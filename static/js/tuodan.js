(function(document){
    var $ = document.querySelectorAll.bind(document);

    var days = Math.floor((Date.now()-Date.UTC(2014, 6, 14, 2))/1000/3600/24);
    var seconds =  Math.floor((Date.now()-days*1000*3600*24-Date.UTC(2014, 6, 14, 2))/1000);

    $(".lovedays")[0].innerHTML= days.toString() + "天";
    var secondsHtml = $(".seconds")[0];
    secondsHtml.innerHTML = seconds.toString() + "秒";

    var cycleTime = 1000;
    setTimeout(function(){
        secondsHtml.innerHTML = (seconds+1).toString() + "秒";
        setTimeout(arguments.callee, cycleTime);
    }, cycleTime);

}(document));
