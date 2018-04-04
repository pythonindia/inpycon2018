var contentTemplate = "<div class='pycon-card row text-left'>\
                        <div class='col-md-5 no-padding'>\
                          <img class='collage-img' alt='image' style='width:100%;border-radius: 15px 0px 0px 15px;'>\
                        </div><div class='col-md-7'>\
                          <img src='img/ran1.jpg' alt='img' class='pycon-ran hide-sm'>\
                          <h3 class='yearly-title'></h3>\
                          <p class='yearly-date'></p>\
                          <p class='yearly-location'></p>\
                          <b class='keynote-label'>Keynote Speakers:</b>\
                          <p class='yearly-speakers'></p>\
                          <p class='yearly-description'></p>\
                        </div>\
                        <a href='' target='_blank' class='yearly-link button button--quidel button--round-s center-block more-button'>More</a>\
                      </div>";

var contentArray = [
  {
    "image": "img/timeline/PyCon2009.jpg",
    "taskTitle": "PyCon India 2009",
    "title": "1st Year of PyCon India",
    "date": "26th and 27th September, 2009",
    "location": "Indian Institute of Science, Bangalore",
    "speakers": "",
    "description": "Pycon India 2009 is a community conference by the Python developer community. \
                    A purely volunteer effort, it is being hosted for the first time in India, and \
                    will attract some of the best Python developers in India and abroad.",
    "link": "https://in.pycon.org/2009/"
  },
  {
    "image": "img/timeline/PyCon2010.jpg",
    "taskTitle": "PyCon India 2010",
    "title": "2nd Year of PyCon India",
    "date": "25th and 26th September, 2010",
    "location": "M S Ramaiah Institute of Technology, Bangalore",
    "speakers": "&#9679; David Goodger",
    "description": "PyCon India 2010 is the primary Python conference in India. A purely \
                    volunteer effort, it is being hosted for the second time in India, \
                    and will attract some of the best Python developers in India and abroad.",
    "link": "https://in.pycon.org/2010/"
  },
  {
    "image": "img/timeline/PyCon2011.jpg",
    "taskTitle": "PyCon India 2011",
    "title": "3rd Year of PyCon India",
    "date": "16th - 18th September 2011",
    "location": "Symbiosis Vishwabhavan, S.B. Road, Pune",
    "speakers": "&#9679; Raymond Hettinger",
    "description": "PyCon India 2011 is the primary Python conference in India. A purely \
                    volunteer effort, it is being hosted for the third time in India, and \
                    will attract some of the best Python developers in India and abroad.",
    "link": "https://in.pycon.org/2011/"
  },
  {
    "image": "img/timeline/PyCon2012.jpg",
    "taskTitle": "PyCon India 2012",
    "title": "4th Year of PyCon India",
    "date": "28th - 30th September 2012 ",
    "location": "Christ University Campus, Bangalore",
    "speakers": "&#9679; David Mertz <br>&#9679; Jacob Kaplan-Moss",
    "description": "Pycon India 2009 is a community conference by the Python developer community. \
                    A purely volunteer effort, it is being hosted for the first time in India, and \
                    will attract some of the best Python developers in India and abroad.",
    "link": "https://in.pycon.org/2012/"
  },
  {
    "image": "img/timeline/PyCon2013.jpg",
    "taskTitle": "PyCon India 2013",
    "title": "5th Year of PyCon India",
    "date": "30th August - 1th September 2013",
    "location": "NIMHANS Convention Centre, Bangalore",
    "speakers": "&#9679; Kiran Jonnalagadda <br>&#9679; Kenneth Reitz",
    "description": "PyCon India, the premier conference in India on using and developing the Python \
                    programming language is conducted annually by the Python developer community and \
                    it attracts the best Python programmers from across the country and abroad.",
    "link": "https://in.pycon.org/2013/"
  },
  {
    "image": "img/timeline/PyCon2014.jpg",
    "taskTitle": "PyCon India 2014",
    "title": "6th Year of PyCon India",
    "date": "26th - 28th September 2014",
    "location": "NIMHANS Convention Centre, Bangalore",
    "speakers": "&#9679; Kushal Das <br>&#9679; Michael Foord",
    "description": "PyCon India, the premier conference in India on using and \
                    developing the Python programming language is conducted annually \
                    by the Python developer community. It attracts the best Python \
                    programmers from across the country and abroad.",
    "link": "https://in.pycon.org/2014/"
  },
  {
    "image": "img/timeline/PyCon2015.jpg",
    "taskTitle": "PyCon India 2015",
    "title": "7th Year of PyCon India",
    "date": "3rd - 5th October 2015",
    "location": "NIMHANS Convention Centre, Bangalore",
    "speakers": "&#9679; Ajith Kumar <br>&#9679; Nicholas H.Tollervey",
    "description": "PyCon India, the premier conference in India on using \
                    and developing the Python programming language is conducted \
                    annually by the Python developer community. It attracts the \
                    best Python programmers from across the country and abroad.",
    "link": "https://in.pycon.org/2015/"
  },
  {
    "image": "img/timeline/PyCon2016.jpg",
    "taskTitle": "PyCon India 2016",
    "title": "8th Year of PyCon India",
    "date": "23rd - 25th September 2016",
    "location": "JNU Convention Centre, New Delhi",
    "speakers": "&#9679; Baishampayan Ghose <br>&#9679; Van L <br>&#9679; Andreas Mueller",
    "description": "PyCon India, the premier conference in India on using and \
                    developing the Python programming language is conducted \
                    annually by the Python developer community. It attracts \
                    the best Python programmers from across the country and abroad.",
    "link": "https://in.pycon.org/2016/"
  },
  {
    "image": "img/timeline/PyCon2017.jpg",
    "taskTitle": "PyCon India 2017",
    "title": "9th Year of PyCon India",
    "date": "2nd - 5th November, 2017",
    "location": "Shaheed Sukhdev College Of Business Studies, New Delhi",
    "speakers": "&#9679; Noufal Ibrahim <br>&#9679; Elizabeth Ferrao <br>&#9679; Peter Wang",
    "description": "PyCon India, the premier conference in India on using and \
                    developing the Python programming language is conducted \
                    annually by the Python developer community. It attracts the \
                    best Python programmers from across the country and abroad.",
    "link": "https://in.pycon.org/2017/"
  },
  {
    "image": "img/card-image.png",
    "taskTitle": "PyCon India 2018",
    "title": "10th Year of PyCon India",
    "date": "5th - 9th October 2018",
    "location": "Hyderabad International Convention Centre, Hyderabad",
    "speakers": "",
    "description": "PyCon India, the premier conference in India on using and \
                    developing the Python programming language is conducted \
                    annually by the Python developer community. It attracts the \
                    best Python programmers from across the country and abroad.",
    "link": "https://in.pycon.org/2018/"
  }
];