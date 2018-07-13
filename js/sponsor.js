
$(document).ready(function(){
    $.get('./data/sponsors.json',function(response){
        constructSponsorBlock(response);
    });
});

constructSponsorBlock = function(response){
        var text = "";
    
        $.each(response,function(key,value){
            var title=  "<div class='row text-center'><h3>" + key +" Sponsors</h3>";
            $.each(value,function(index,item) {
                var str = "<div class='col-md-4'><img src='img/border2.png' class='border2 border2a' alt='"+item["alt-text"]+"'>\
                <img src='"+ item.img +"' alt='"+item["alt-text"]+"' class='img-responsive sponsora center-block'></div>";
                title +=str;
                str = "";
            });
            text += title + "</div><br /><br /><br /><br />";
            title = "";
        });
            
        $("#sponsors-content").append(text);
}
