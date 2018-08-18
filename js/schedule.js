$(document).ready(function(){
    // $.getJSON('./data/schedule.json',function(response){
    //     createScheduleBlock(response);
    // });
    var response = {
    "Schedule": [{
            "Date": "05-Oct-2018",
            "TimeTable": [{
                    "Time": "08:00 AM - 09:00 AM",
                    "Tracks": [{
                        "Title": "REGISTRATION"
                    }]
                },
                {
                    "Time": "10:00 AM - 01:00 PM",
                    "Tracks": [{
                            "Title": "Demystifying the Django REST Framework: Web Development",
                            "Speaker": "Haris Ibrahim K. V",
                            "Hall": "Hall 1",
                            "Url": "https://in.pycon.org/cfp/2016/proposals/demystifying-the-django-rest-framework~dBNxd/?ref=schedule"
                        },
                        {
                            "Title": "Docker Workshop: Infrastructure",
                            "Speaker": "Lalatendu Mohanty",
                            "Hall": "Hall 2",
                            "Url": "https://in.pycon.org/cfp/2016/proposals/docker-workshop~dyXwb/?ref=schedule"
                        },
                        {
                            "Title": "Talking to Machines : Optimizing Neural Networks with Theano: Scientific Computing",
                            "Speaker": "Kumar Krishna Agarwal",
                            "Hall": "Hall 3",
                            "Url": "https://in.pycon.org/cfp/2016/proposals/talking-to-machines-optimizing-neural-networks-with-theano~ep2rb/?ref=schedule"
                        },
                        {
                            "Title": "Demystifying the Django REST Framework: Web Development",
                            "Speaker": "Haris Ibrahim K. V",
                            "Hall": "Hall 4",
                            "Url": "https://in.pycon.org/cfp/2016/proposals/demystifying-the-django-rest-framework~dBNxd/?ref=schedule"
                        }
                    ]
                },
                {
                    "Time": "01:00 PM - 02:00 PM",
                    "Tracks": [{
                        "Title": "LUNCH"
                    }]
                },
                {
                    "Time": "02:00 PM - 05:00 PM",
                    "Tracks": [{
                            "Title": "Scaling Django with Kubernetes: Infrastructure",
                            "Speaker": "Saket Bhushan",
                            "Hall": "Hall 1",
                            "Url": "https://in.pycon.org/cfp/2016/proposals/scaling-django-with-kubernetes~boONb/?ref=schedule"
                        },
                        {
                            "Title": "Productive Coding with PyCharm",
                            "Speaker": "Paul Everitt",
                            "Hall": "Hall 2",
                            "Url": "https://in.pycon.org/cfp/2016/proposals/productive-coding-with-pycharm~aA11a/?ref=schedule"
                        },
                        {
                            "Title": "Building a Lie Detector: Multi-Modal Sentiment Analysis: Scientific Computing",
                            "Speaker": "Mimansa Jaiswal and Sairam Tabibu",
                            "Hall": "Hall 3",
                            "Url": "https://in.pycon.org/cfp/2016/proposals/building-a-lie-detector-multi-modal-sentiment-analysis~epk1d/?ref=schedule"
                        },
                        {
                            "Title": "Scaling Django with Kubernetes: Infrastructure",
                            "Speaker": "Saket Bhushan",
                            "Hall": "Hall 4",
                            "Url": "https://in.pycon.org/cfp/2016/proposals/scaling-django-with-kubernetes~boONb/?ref=schedule"
                        }
                    ]
                }
            ]
        }
    ]
};

createScheduleBlock(response);
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
            (item[i].Tracks[0].Title == "REGISTRATION") || item[i].Tracks[0].Title == "LUNCH"){
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