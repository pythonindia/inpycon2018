$(document).ready(function(){
    $.getJSON('./data/schedule.json',function(response){
        createScheduleBlock(response);
    });
});

createScheduleBlock = function(data){
        var scheduleContent = "";
        var tab = 1;
        $.each(data, function(key, value) {
            for(var i = 0; i < value.length; i++) {
                    scheduleContent += "<div class='panel-heading pycon2018_panel page table-responsive " + ( tab ==1 ? "" : "hide" ) + "' data-page='tab"+tab+"'>"
                    scheduleContent += createScheduleForADay(value[i].TimeTable);
                    scheduleContent += "</div>"
                    tab += 1;
                }
        });

        $("#schedule-content").append(scheduleContent);
}

createScheduleForADay = function (item) {
    var dayContent = '';
    for(i = 0; i < item.length; i ++){
        if(item[i].Tracks.length == 1 &&
            (["CONFERENCE REGISTRATION", "WORKSHOP REGISTRATION", "LUNCH"].indexOf(item[i].Tracks[0].Title) >= 0)){
            dayContent += createLunchBreakfastRow(item[i]);
        }
        else {
            dayContent += createTracksRow(item[i]);
        }
    }

    return dayContent;
}

createLunchBreakfastRow = function(item) {
    var rowContent = '';

    rowContent += "<div class='row'>" +
                  "<div class='col-xs-12 col-lg-3 time schedule-column'>"+
                    "<span class='center-align'>" +
                        item.Time +
                    "</span>"+
                  "</div>"+
                  "<div class='col-xs-12 col-lg-9 text-center schedule-column'>"+
                      "<span class='center-align capitalize'>"+
                        item.Tracks[0].Title +
                      "</span>"+
                  "</div>"+
                  "</div>";
    return rowContent;
}


createTracksRow = function(item) {
    var rowContent = '';

    rowContent += "<div class='row'>"+
                    "<div class='col-xs-12 col-sm-12 col-lg-3 time schedule-column'>"+
                        "<span class='center-align'>"+
                            item.Time+
                        "</span>"+
                    "</div>";

    for (var i = 0; i < item.Tracks.length; i++) {
        rowContent += "<div class='col-xs-12 col-lg-2 schedule-column'>"+
                            "<strong>"+
                                "<a href='"+item.Tracks[i].Url+"' target='_blank'"+
                                    "title='"+item.Tracks[i].Title+"'>"+
                                    item.Tracks[i].Title+
                                "</a>"+
                            "</strong>"+
                            "<br><em>By "+item.Tracks[i].Speaker+"</em>"+
                            "<br><span class='badge'>"+item.Tracks[i].Hall+"</span>"+
                        "</div>";
    }
    rowContent += "</div>";
    return rowContent;
}
