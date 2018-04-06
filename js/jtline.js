(function ($) {
    $.fn.extend({
        jTLine: function (options) {
            // ------------------------
            var defaults = {
                eventsMinDistance: 72,
                callType: 'ajax',
                url: '',
                structureObj: [{}],
                distanceMode: 'auto', // predefinedDistance , fixDistance                
                fixDistanceValue: 2,
                firstPointMargin: 2,
                map: {
                    "dataRoot": "dataArray",
                    "isSelected": "isSelected",
                    "title": "title",
                    "subTitle": "subTitle",
                    "dateValue": "dateValue",
                    "pointCnt": "pointCnt",
                    "bodyCnt": 'bodyCnt'
                },
                isSelectedAttrProvided: false,
                formatTitle: function (title, obj) { },
                formatSubTitle: function (subTitle, obj) { },
                formatBodyContent: function (bodyCnt, obj) { }
                //onPointClick: function () { }
            };
            // ------------------------

            // ------------------------
            var options = $.extend(defaults, options);
            // ------------------------ 
            var callTypes = {
                "jsonObject": "jsonObject",
                "ajax": "ajax",
                "mappedJsonObject": "mappedJsonObject"
            }

            // ------------------------
            // private methods            
            var myPrivateMethod = function () { };
            // --------------------------
            // public methods
            this.myPublicFunction = function (val) {
                alert(val);
            };
            //=========================================================================
            var _initTimeLine = function (timeline) {

                var timelineComponents = {};
                //cache timeline components 
                timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
                timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
                timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
                timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
                timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
                timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
                timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
                timelineComponents['eventsContent'] = timeline.children('.events-content');
                //assign a left postion to the single events along the timeline
                setDatePosition(timelineComponents, options.eventsMinDistance);
                //assign a width to the timeline
                var timelineTotWidth = setTimelineWidth(timelineComponents, options.eventsMinDistance);
                //the timeline has been initialize - show it
                timeline.addClass('loaded');

                //detect click on the next arrow
                timelineComponents['timelineNavigation'].on('click', '.next', function (event) {
                    event.preventDefault();
                    updateSlide(timelineComponents, timelineTotWidth, 'next');
                });
                //detect click on the prev arrow
                timelineComponents['timelineNavigation'].on('click', '.prev', function (event) {
                    event.preventDefault();
                    updateSlide(timelineComponents, timelineTotWidth, 'prev');
                });
                //detect click on the a single event - show new event content
                timelineComponents['eventsWrapper'].on('click', 'a', function (event) {
                    event.preventDefault();
                    timelineComponents['timelineEvents'].removeClass('selected');
                    $(this).addClass('selected');
                    updateOlderEvents($(this));
                    updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
                    updateVisibleContent($(this), timelineComponents['eventsContent']);
                });

                //on swipe, show next/prev event content
                timelineComponents['eventsContent'].on('swipeleft', function () {
                    var mq = checkMQ();
                    (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'next');
                });
                timelineComponents['eventsContent'].on('swiperight', function () {
                    var mq = checkMQ();
                    (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'prev');
                });

                //keyboard navigation
                $(document).keyup(function (event) {
                    if (event.which == '37' && elementInViewport(timeline.get(0))) {
                        showNewContent(timelineComponents, timelineTotWidth, 'prev');
                    } else if (event.which == '39' && elementInViewport(timeline.get(0))) {
                        showNewContent(timelineComponents, timelineTotWidth, 'next');
                    }
                });
                //});
            }

            var updateSlide = function (timelineComponents, timelineTotWidth, string) {
                //retrieve translateX value of timelineComponents['eventsWrapper']
                var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
                    wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
                //translate the timeline to the left('next')/right('prev') 
                (string == 'next')
                    ? translateTimeline(timelineComponents, translateValue - wrapperWidth + options.eventsMinDistance, wrapperWidth - timelineTotWidth)
                    : translateTimeline(timelineComponents, translateValue + wrapperWidth - options.eventsMinDistance);
            }

            var showNewContent = function (timelineComponents, timelineTotWidth, string) {
                //go from one event to the next/previous one
                var visibleContent = timelineComponents['eventsContent'].find('.selected'),
                    newContent = (string == 'next') ? visibleContent.next() : visibleContent.prev();

                if (newContent.length > 0) { //if there's a next/prev event - show it
                    var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
                        newEvent = (string == 'next') ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');

                    updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
                    updateVisibleContent(newEvent, timelineComponents['eventsContent']);
                    newEvent.addClass('selected');
                    selectedDate.removeClass('selected');
                    updateOlderEvents(newEvent);
                    updateTimelinePosition(string, newEvent, timelineComponents);
                }
            }

            var updateTimelinePosition = function (string, event, timelineComponents) {
                //translate timeline to the left/right according to the position of the selected event
                var eventStyle = window.getComputedStyle(event.get(0), null),
                    eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
                    timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
                    timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
                var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

                if ((string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < -timelineTranslate)) {
                    translateTimeline(timelineComponents, -eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
                }
            }

            var translateTimeline = function (timelineComponents, value, totWidth) {
                var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
                value = (value > 0) ? 0 : value; //only negative translate value
                value = (!(typeof totWidth === 'undefined') && value < totWidth) ? totWidth : value; //do not translate more than timeline width
                setTransformValue(eventsWrapper, 'translateX', value + 'px');
                //update navigation arrows visibility
                (value == 0) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
     
                (value == totWidth) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
            }

            var updateFilling = function (selectedEvent, filling, totWidth) {
                //change .filling-line length according to the selected event
                var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
                    eventLeft = eventStyle.getPropertyValue("left"),
                    eventWidth = eventStyle.getPropertyValue("width");
                eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
                var scaleValue = eventLeft / totWidth;
                setTransformValue(filling.get(0), 'scaleX', scaleValue);
            }
            // ------------------------ NADY Changed ---------------------
            var totalItemsWidth;
            var setDatePosition = function (timelineComponents, min) {
                var distance;
                var distanceNorm;
                var objPredefinedDistance;
                var nextfixDistanceValue = options.firstPointMargin;// For First Point Margin 
                totalItemsWidth = options.firstPointMargin;
                for (i = 0; i < timelineComponents['timelineDates'].length; i++) {
                    if (options.distanceMode == 'auto') { // Auto Calculate Distance upon dates variance
                        distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]);
                        distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
                    }
                    else if (options.distanceMode == 'fixDistance') { // Define Fixed Distance
                        if (i != 0) {
                            nextfixDistanceValue += (options.fixDistanceValue);
                            distanceNorm = nextfixDistanceValue;
                        }
                        else {
                            distanceNorm = options.firstPointMargin;
                        }
                    }
                    else if (options.distanceMode == 'predefinedDistance') { //  predefined Distance inside Json Object for each object
                        objPredefinedDistance = fetchedData.dataArray[i]["nextDistance"];
                        if (i != 0) {
                            nextfixDistanceValue += (objPredefinedDistance);
                            distanceNorm = nextfixDistanceValue;
                        }
                        else {
                            distanceNorm = options.firstPointMargin;
                        }

                        totalItemsWidth += objPredefinedDistance;
                    }

                    timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm * min + 'px');
                }
            }

            var setTimelineWidth = function (timelineComponents, width) {
                var timeSpan;
                var timeSpanNorm;
                var totalWidth;
                var objPredefinedDistance;
                var nextfixDistanceValue = options.firstPointMargin;// For First Point Margin 
                if (options.distanceMode == 'auto') {
                    timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]);
                    timeSpanNorm = timeSpan / timelineComponents['eventsMinLapse'];
                    timeSpanNorm = Math.round(timeSpanNorm) + 4;
                    totalWidth = timeSpanNorm * width;
                }
                else if (options.distanceMode == 'fixDistance') { // Define Fixed Distance                        
                    var fixedDistByPixl = (options.eventsMinDistance * options.fixDistanceValue);
                    var allPointsWidth = (fixedDistByPixl * fetchedData.length); //- 60; //+ (options.firstPointMargin * options.eventsMinDistance);
                    totalWidth = allPointsWidth;
                }
                else if (options.distanceMode == 'predefinedDistance') { //  predefined Distance inside Json Object for each object                    
                    totalWidth = (totalItemsWidth * options.eventsMinDistance); // - 60;
                }

                timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
                updateOlderEvents(timelineComponents['eventsWrapper'].find('a.selected'));
                updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
                updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);

                return totalWidth;
            }
            // -----------------------------------------------------------
            var updateVisibleContent = function (event, eventsContent) {
                var eventDate = event.data('date'),
                    visibleContent = eventsContent.find('.selected'),
                    selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
                    selectedContentHeight = selectedContent.height();

                if (selectedContent.index() > visibleContent.index()) {
                    var classEnetering = 'selected enter-right',
                        classLeaving = 'leave-left';
                } else {
                    var classEnetering = 'selected enter-left',
                        classLeaving = 'leave-right';
                }

                selectedContent.attr('class', classEnetering);
                visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
                    visibleContent.removeClass('leave-right leave-left');
                    selectedContent.removeClass('enter-left enter-right');
                });
                eventsContent.css('height', selectedContentHeight + 'px');
            }

            var updateOlderEvents = function (event) {
                event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
            }

            var getTranslateValue = function (timeline) {
                var timelineStyle = window.getComputedStyle(timeline.get(0), null),
                    timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
                        timelineStyle.getPropertyValue("-moz-transform") ||
                        timelineStyle.getPropertyValue("-ms-transform") ||
                        timelineStyle.getPropertyValue("-o-transform") ||
                        timelineStyle.getPropertyValue("transform");

                if (timelineTranslate.indexOf('(') >= 0) {
                    var timelineTranslate = timelineTranslate.split('(')[1];
                    timelineTranslate = timelineTranslate.split(')')[0];
                    timelineTranslate = timelineTranslate.split(',');
                    var translateValue = timelineTranslate[4];
                } else {
                    var translateValue = 0;
                }

                return Number(translateValue);
            }

            var setTransformValue = function (element, property, value) {
                element.style["-webkit-transform"] = property + "(" + value + ")";
                element.style["-moz-transform"] = property + "(" + value + ")";
                element.style["-ms-transform"] = property + "(" + value + ")";
                element.style["-o-transform"] = property + "(" + value + ")";
                element.style["transform"] = property + "(" + value + ")";
            }

            //based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
            var parseDate = function (events) {
                // debugger;
                var dateArrays = [];
                events.each(function () {
                    var singleDate = $(this),
                        dateComp = singleDate.data('date').split('T');
                    if (dateComp.length > 1) { //both DD/MM/YEAR and time are provided
                        var dayComp = dateComp[0].split('/'),
                            timeComp = dateComp[1].split(':');
                    } else if (dateComp[0].indexOf(':') >= 0) { //only time is provide
                        var dayComp = ["2000", "0", "0"],
                            timeComp = dateComp[0].split(':');
                    } else { //only DD/MM/YEAR
                        var dayComp = dateComp[0].split('/'),
                            timeComp = ["0", "0"];
                    }
                    var newDate = new Date(dayComp[2], dayComp[1] - 1, dayComp[0], timeComp[0], timeComp[1]);
                    dateArrays.push(newDate);
                });
                return dateArrays;
            }

            var daydiff = function (first, second) {
                var rsult = Math.round((second - first));
                return rsult;
            }

            var minLapse = function (dates) {
                //determine the minimum distance among events
                var dateDistances = [];
                for (i = 1; i < dates.length; i++) {
                    var distance = daydiff(dates[i - 1], dates[i]);
                    dateDistances.push(distance);
                }
                return Math.min.apply(null, dateDistances);
            }

            /*
                How to tell if a DOM element is visible in the current viewport?
                http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
            */
            var elementInViewport = function (el) {
                var top = el.offsetTop;
                var left = el.offsetLeft;
                var width = el.offsetWidth;
                var height = el.offsetHeight;

                while (el.offsetParent) {
                    el = el.offsetParent;
                    top += el.offsetTop;
                    left += el.offsetLeft;
                }

                return (
                    top < (window.pageYOffset + window.innerHeight) &&
                    left < (window.pageXOffset + window.innerWidth) &&
                    (top + height) > window.pageYOffset &&
                    (left + width) > window.pageXOffset
                );
            }

            var checkMQ = function () {
                // check if mobile or desktop device
                return window.getComputedStyle(document.querySelector('.jtline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
            }
            // ======================================================
            var _init = function (obj) {
                _fetchData(obj);
                _interactionEvents();
            }
            var fetchedData;
            var getFetchedData = function (data) {
                fetchedData = data;
            };
            var _fetchData = function (obj) {
                // var dataResult;
                if (options.callType == callTypes.ajax) {
                    $.getJSON(options.url, function (data) {
                        // console.log(data);
                    }).done(function (data) {
                        //----------------------
                        //console.log(data);
                        //jsonStructureObject = data;                        
                        // _constructDom(data);
                        // console.log("getjson");
                        // console.log(data);
                        // dataResult = data;                        
                        if (data)
                            _constructDom(data, obj);
                        else {
                            $(obj).html("Error fetching data");
                        }
                        //alert(jsonStructureObject.length);
                        //----------------------
                    }).fail(function (err) {
                        var status = err.status;
                        var statusText = err.statusText;
                        var errd = statusText + status;
                        $(obj).html(errd);
                        // alert('error');
                        //console.log(err);
                    });
                }
                if (options.callType == callTypes.jsonObject) {
                    if (options.structureObj) {
                        _constructDom(options.structureObj, obj);
                    }
                    else {
                        $(obj).html("Error fetching data");
                    }
                    //-----------------------
                    // dataResult = options.structureObj;
                    // _constructDom(options.structureObj);
                    //-----------------------
                }
                // return dataResult;
            }
            // -------
            var _constructDom = function (jsonData, mainObject) {

                var $liTimeLineCollection = '';
                var $liEventContentCollection = '';

                var dataCollection;
                if (options.map.dataRoot == '/')
                    dataCollection = jsonData;
                else
                    dataCollection = jsonData[options.map.dataRoot];

                getFetchedData(dataCollection);

                var isSelectedPoint;
                var isSelectedAttrProvided = dataCollection.find(
                        data => data[options.map.isSelected] === "true"
                    );

                if (!isSelectedAttrProvided) {
                    dataCollection[0][options.map.isSelected] = "true";
                }
                
                //------------------------------------------               
                for (var i = 0; i < dataCollection.length; i++) {

                    isSelectedPoint = dataCollection[i][options.map.isSelected];

                    point = {
                        "isSelected": isSelectedPoint,
                        "title": dataCollection[i][options.map.title],
                        "subTitle": dataCollection[i][options.map.subTitle],
                        "dateValue": dataCollection[i][options.map.dateValue],
                        "pointCnt": dataCollection[i][options.map.pointCnt],
                        "bodyCnt": dataCollection[i][options.map.bodyCnt]
                    }

                    $liTimeLineCollection += '<li><a href="#0" data-date="' + point.dateValue + '" ';
                    // if (point.isSelected) $liTimeLineCollection += 'class="selected"';
                    $liTimeLineCollection += 'class="tlnode ' + (isSelectedPoint ? 'selected' : '') + '"';

                    $liTimeLineCollection += '>';
                    $liTimeLineCollection += point.pointCnt + '</a></li>';
                    // -----------------
                    $liEventContentCollection += '<li ';
                    if (isSelectedPoint)
                        $liEventContentCollection += 'class="selected"';
                    $liEventContentCollection += ' data-date="' + point.dateValue + '">' + formatTitle(point.title, dataCollection[i]) + formatSubTitle(point.subTitle, dataCollection[i]) + formatBodyContent(point.bodyCnt, dataCollection[i]) + '</li>';

                }
                //-----------------------------------------

                //------------- HTML ----------------------
                var $container = $(mainObject);

                var $sectionStart = '<section id="jtlinesection" class="jtline">';
                var $timeline = '<div class="timeline"><div class="events-wrapper"><div class="events"><ol>' + $liTimeLineCollection + '</ol><span class="filling-line" aria-hidden="true"></span></div></div><ul class="cd-timeline-navigation"><li><a href="#0" class="prev active">Prev</a></li><li><a href="#0" class="next inactive">Next</a></li></ul></div>';
                var $eventsContent = '<div class="events-content"><ol>' + $liEventContentCollection + '</ol></div>';
                var $sectionEnd = '</section>';

                var allHtml = $sectionStart + $timeline + $eventsContent + $sectionEnd;
                $container.html(allHtml);
                // -----------------------------------------

                //------------------------------------------
                var timelineObj = $("#jtlinesection", $container)
                _initTimeLine(timelineObj);
                //------------------------------------------

                //------------------------------------------
                _interactionEvents();
                //------------------------------------------
            }
            // -------
            var formatTitle = function (title, obj) {
                var formatTitleResult = options.formatTitle(title, obj);
                if (formatTitleResult)
                    return options.formatTitle(title, obj);
                else
                    return '<h2>' + title + '</h2>';
            }

            var formatSubTitle = function (subTitle, obj) {
                var formatSubTitle = options.formatSubTitle(subTitle, obj);
                if (formatSubTitle)
                    return options.formatSubTitle(subTitle, obj);
                else
                    return '<em>' + point.subTitle + '</em>';
            }

            var formatBodyContent = function (bodyCnt, obj) {
                var formatBodyCnt = options.formatBodyContent(bodyCnt, obj);
                if (formatBodyCnt)
                    return options.formatBodyContent(bodyCnt, obj);
                else
                    return '<p>' + bodyCnt + '</p>';
            }
            var _attacheEvents = function () {

                //$(".switch, .clapper").click(function () {
                //    var room = $(this).closest(".room");
                //    room.find(".lightbulb").trigger("light:toggle");
                //});
                // --
                //$(".lightbulb").on("light:toggle", function (event) {
                //    var light = $(this);
                //    if (light.is(".on")) {
                //        light.trigger("light:off");
                //    } else {
                //        light.trigger("light:on");
                //    }
                //}).on("light:on", function (event) {
                //    $(this).removeClass("off").addClass("on");
                //}).on("light:off", function (event) {
                //    $(this).removeClass("on").addClass("off");
                //});
                //-- 
                //$(document).on("myCustomEvent", {
                //    foo: "bar"
                //}, function (event, arg1, arg2) {
                //    console.log(event.data.foo); // "bar"
                //    console.log(arg1);           // "bim"
                //    console.log(arg2);           // "baz"
                //});
                //$(document).trigger("myCustomEvent", ["bim", "baz"]);

                $(".tlnode").on("click", function (event) {
                    if (options.onPointClick !== undefined) {
                        options.onPointClick(event);
                    }
                });
            }
            var _interactionEvents = function () {
                //$(".tlnode").on("click",function () {
                //    var objbtn = $(this);
                //    alert('clicked');
                //});
            }
            // ======================================================
            // ------------------------ 
            return this.each(function () {
                // ------------------------ 
                //init();
                // var o = options;

                //var items = $("li", obj);
                //// ------------------------ 
                //$("li:even", obj).css('background-color', o.evenColor);
                //$("li:odd", obj).css('background-color', o.oddColor);
                //// ------------------------ 
                //items.mouseover(function () {
                //    $(this).animate({ paddingLeft: o.animatePadding }, 300);
                //}).mouseout(function () {
                //    $(this).animate({ paddingLeft: o.defaultPadding }, 300);

                //});
                // ------------------------
                var obj = $(this);
                // var timelineObj = ("#jtlinesection",this)
                // _initTimeLine(timelineObj); // will remove later 
                _init(obj); // FetchData -> Create Whole Object send it to -> _initTimeLine
                // ------------------------   
                _attacheEvents();
                // ------------------------ 
            });
            // ------------------------ 
        }
    });
})(jQuery);