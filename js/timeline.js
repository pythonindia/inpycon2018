$(document).ready(function () {
    var taskDetails = [];

    $.each(contentArray, function(key, value) {
      $template = $(contentTemplate);
      $template.find('.collage-img').attr('src', value['image']);
      $template.find('.yearly-title').html(value['title']);
      $template.find('.yearly-date').html('<b>Date: </b>'+value['date']);
      $template.find('.yearly-location').html('<b>Location: </b>'+value['location']);
      $template.find('.yearly-description').html(value['description']);
      $template.find('.yearly-speakers').html(value['speakers']);
      $template.find('.yearly-link').attr('href', value['link']);
      if (key == 9) {
        $template.find('.keynote-label').hide();
        $template.find('.yearly-link').hide();
      }
      taskDetails[key] = $template.prop('outerHTML');
    })

    // dataRoot : '/'
    var myMappedObject = [

          {
              "isSelected": "",
              "taskTitle": contentArray[0]['taskTitle'],
              "taskSubTitle": "",
              "assignDate": "25/08/2009",
              "taskShortDate": "2009",
              "taskDetails": taskDetails[0]
          },
          {
              "isSelected": "",
              "taskTitle": contentArray[1]['taskTitle'],
              "taskSubTitle": "",
              "assignDate": "25/08/2010",
              "taskShortDate": "2010",
              "taskDetails": taskDetails[1]
          },

          {
              "isSelected": "",
              "taskTitle": contentArray[2]['taskTitle'],
              "taskSubTitle": "",
              "assignDate": "25/08/2011",
              "taskShortDate": "2011",
              "taskDetails": taskDetails[2]
          },
          {
              "isSelected": "",
              "taskTitle": contentArray[3]['taskTitle'],
              "taskSubTitle": "",
              "assignDate": "25/08/2012",
              "taskShortDate": "2012",
              "taskDetails": taskDetails[3]
          },
          {
              "isSelected": "",
              "taskTitle": contentArray[4]['taskTitle'],
              "taskSubTitle": "",
              "assignDate": "25/08/2013",
              "taskShortDate": "2013",
             "taskDetails": taskDetails[4]
          },
          {
              "isSelected": "",
              "taskTitle": contentArray[5]['taskTitle'],
              "taskSubTitle": "",
              "assignDate": "25/08/2014",
              "taskShortDate": "2014",
              "taskDetails": taskDetails[5]
          },
          {
              "isSelected": "",
              "taskTitle": contentArray[6]['taskTitle'],
              "taskSubTitle": "",
              "assignDate": "25/08/2015",
              "taskShortDate": "2015",
              "taskDetails": taskDetails[6]
          },
          {
              "isSelected": "",
              "taskTitle": contentArray[7]['taskTitle'],
              "taskSubTitle": "",
              "assignDate": "25/08/2016",
              "taskShortDate": "2016",
              "taskDetails": taskDetails[7]
          },

          {
              "isSelected": "",
              "taskTitle": contentArray[8]['taskTitle'],
              "taskSubTitle": "",
              "assignDate": "25/08/2017",
              "taskShortDate": "2017",
              "taskDetails": taskDetails[8]
          },

          {
              "isSelected": "true",
              "taskTitle": contentArray[9]['taskTitle'],
              "taskSubTitle": "",
              "assignDate": "25/08/2018",
              "taskShortDate": "2018",
              "taskDetails": taskDetails[9]
          }  
    ];

    var jtLine = $('.myjtline').jTLine({
        callType: 'jsonObject',
        structureObj: myMappedObject,
        map: {
            "dataRoot": "/",
            "title": "taskTitle",
            "subTitle": "taskSubTitle",
            "dateValue": "assignDate",
            "pointCnt": "taskShortDate",
            "bodyCnt": "taskDetails",
            "isSelected": "isSelected"
        },
        onPointClick: function (e) {
            console.log(e);
        }
    });
});