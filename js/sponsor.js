
$(document).ready(function(){
    $.getJSON('./data/sponsors.json',function(response){
        constructSponsorBlock(response);
        createPopupAnimation();
    });
});
var popupId=1;
constructSponsorBlock = function(data){
        var sponsorContent = "";

        $.each(data, function(key, value) {
            sponsorContent += "<h3 class='text-center'>" + key + "</h3>";
            var cellsEachRow = (["platinum"].indexOf(key.toLowerCase()) >= 0 ? 4 : 3);
            for(var i = 0; i < value.length; i += cellsEachRow) {
                sponsorGroups = value.slice(i, i+cellsEachRow);
                sponsorContent += "<div class='row'>"
                sponsorContent += buildSponsorRow(sponsorGroups, key);
                sponsorContent += "</div>";
            }

        });

        $("#sponsors-content").append(sponsorContent);
}

buildSponsorRow = function(items,category) {
    var totalItems = items.length;
    var offset = '';
    var rowContent = '';
    switch(totalItems) {
        case 1:
            offset = 'col-lg-offset-4 col-md-offset-4 ';
            break;
        case 2:
            offset = 'col-lg-offset-2 col-md-offset-2 ';
            break;
        default:
            offset = ''
    }

    for (var i = 0; i < totalItems; i++) {
      rowContent += "<div class='" + (i == 0 ? offset : "")  + (["platinum"].indexOf(category.toLowerCase()) >= 0 ? "col-md-3" : "col-md-4") + " sponsor-padding'>"+
             "<div id='"+popupId+"' class='img-container link'><img src='" + items[i]["img"] + "' alt='" + items[i]["alt-text"] +
          "' class='img-responsive sponsor center-block " + items[i]["class"] +"'></div>"+
            "<div class='popup text-center'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>"+
               "<span class='close'><img src='icons/window-close-solid.svg' class='fas fa-window-close close-sponsor-dialogue '></span><h4 class='pop-head'>"+items[i]["alt-text"]+"</h4><p class='pop-data'>"+items[i]["description"]+
               "</p><a href='"+items[i]["link"]+"' target='_blank' title='"+items[i]["alt-text"]+"' class='pop-head btn btn-details text-center'>Website</a>"+
           "</div></div></div></div>";
            popupId=popupId+1;
    }
    return rowContent;
}

function createPopupAnimation(){
      var id;
      $(".link").click(function(event){
           $(".popup").css("display","none");
           var id = $(this).attr("id");
           $(".popup").eq(id-1).css("display","block");
      });
      $(".close").click(function(event){
           $(".popup").css("display","none");
           event.stopPropagation();
      });
}
