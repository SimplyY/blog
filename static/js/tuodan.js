(function(document){
    var days = Math.round((Date.now()-Date.UTC(2014, 6, 14))/1000/3600/24);
    document.getElementById("lovedays").innerHTML=days.toString()+"<span>天</span>";
}(document));
