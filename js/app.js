$(function() {


    // You can make separate functions for each ajax call 
    // You will likely need separate functions for each form

    $('#ny-times').hide();
    $('#guardian').hide();

    $('.article-search').submit(function(e) {
        e.preventDefault();


    });


    // Function for Animate.Css // 

    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });




    /////      Get data by date      /////


    $('#btn-by-date-nyTimes').click(function() {
        // Each API has different date format requirements so it is necessary to 
        // reformat the date without changing what the user sees before 
        // the ajax call is made (before the date is sent to the API)

        // datepicker grabs date input on form and creates an object  
        // using 'getDate' on the input instead of .val()
        var byDate = $('#by-date-nyTimes').datepicker("getDate");
        // mDate creates a moment from moment.js for byDate object
        var mDate = moment(byDate);
        // nyTimesDate changes format for mDate object to a yymmdd string
        var nyTimesDate = mDate.format('YYYYMMDD');

        console.log(nyTimesDate);

        getNyTimesByDate(nyTimesDate);

    });


    $('#btn-by-date-guardian').click(function() {
        // Each API has different date format requirements so it is necessary to 
        // reformat the date without changing what the user sees before 
        // the ajax call is made (before the date is sent to the API)

        // datepicker grabs date input on form and creates an object  
        // using 'getDate' on the input instead of .val()
        var byDate = $('#by-date-guardian').datepicker("getDate");
        // mDate creates a moment from moment.js for byDate object
        var mDate = moment(byDate);
        // nyTimesDate changes format for mDate object to a yymmdd string

        var guardianDate = mDate.format('YYYY-MM-DD');

        console.log(guardianDate);

        getGuardianByDate(guardianDate);
    });



    /////      Get data by date range      /////


    $('#btn-by-date-range-nyTimes').click(function() {
        var date1 = $('#by-date-range1-nyTimes').datepicker("getDate");
        var date2 = $('#by-date-range2-nyTimes').datepicker("getDate");
        var mDate1 = moment(date1);
        var mDate2 = moment(date2);
        var nyTimesDate1 = mDate1.format('YYYYMMDD');
        var nyTimesDate2 = mDate2.format('YYYYMMDD');
        getNyTimesByDateRange(nyTimesDate1, nyTimesDate2);
    });


    $('#btn-by-date-range-guardian').click(function() {
        var date1 = $('#by-date-range1-guardian').datepicker("getDate");
        var date2 = $('#by-date-range2-guardian').datepicker("getDate");
        var mDate1 = moment(date1);
        var mDate2 = moment(date2);
        var guardianDate1 = mDate1.format('YYYY-MM-DD');
        var guardianDate2 = mDate2.format('YYYY-MM-DD');
        getGuardianByDateRange(guardianDate1, guardianDate2);
    });




    /////      Get data by topic      /////


    $('#btn-by-topic-nyTimes').click(function() {
        var byTopic = $('#by-topic-nyTimes').val();
        getNyTimesByTopic(byTopic);

    });


    $('#btn-by-topic-guardian').click(function() {
        var byTopic = $('#by-topic-guardian').val();
        var byTopicDate = $('#by-topic-date-guardian').datepicker("getDate");
        var mDate = moment(byTopicDate);
        var guardianDate = mDate.format('YYYY-MM-DD');
        getGuardianByTopic(byTopic, guardianDate);
    });







    // /////      Get data by keyword      /////


    // $('#btn-by-keyword-nyTimes').click(function() {
    //     var byKeyword = $('#by-keyword-nyTimes').val();
    //     getNyTimesByKeyword(byKeyword);

    // });


    // $('#btn-by-keyword-guardian').click(function() {
    //     var byKeyword = $('#by-keyword-guardian').val();
    //     getGuardianByKeyword(byKeyword);
    // });









    ////////          Functions for New York Times        //////////



    /// By Date ///


    function getNyTimesByDate(nyTimesDate) {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

        //For #by-date //

        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            data: {
                'api-key': "3e086fa1430d466ba4a63a7818c323a1",
                'begin_date': nyTimesDate,
                'end_date': nyTimesDate
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showNyTimes(results);
            }
        });
    }






    /// By date range /// 

    function getNyTimesByDateRange(nyTimesDate1, nyTimesDate2) {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            data: {
                'api-key': "3e086fa1430d466ba4a63a7818c323a1",
                'begin_date': nyTimesDate1,
                'end_date': nyTimesDate2
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showNyTimes(results);
            }
        });
    }








    /// By Topic /// 


    function getNyTimesByTopic(byTopic) {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            data: {
                'api-key': "3e086fa1430d466ba4a63a7818c323a1",
                'news_desk': byTopic /// Not returning correct news desk section
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showNyTimes(results);
            }
        });

    }








    // /// By Keyword /// 


    // function getNyTimesByKeyword(byKeyword) {
    //     var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    //     $.ajax({
    //         url: url,
    //         type: 'GET',
    //         dataType: "json",
    //         data: {
    //             'api-key': "3e086fa1430d466ba4a63a7818c323a1",
    //             'news_desk': byKeyword
    //         },
    //         success: function(data) {
    //             console.log(data);
    //             var results = data;
    //             showNyTimes(results);
    //         }
    //     });

    // }

    // TODO    show article snippet with read more... underneath so user can click to see entire article.

    function showNyTimes(results) {
        var html = "";
        var docs = results.response.docs;
        console.log(docs);
        $.each(docs, function(index, currentObject) { //index is just location of object in the array, value is the current object
            console.log(currentObject);
            var result = currentObject.snippet; // headline.print_headline;
            var resultHeadline = currentObject.headline.main; // byline.original;
            var resultURL = currentObject.web_url;

            var element = $("<p>");
            element.addClass('article');

            var headline = $('<a>');
            headline.attr('href', resultURL);
            headline.addClass('headline');
            headline.text(resultHeadline);

            element.append(headline);

            var snippet = $('<p>');
            snippet.addClass('snippet');
            snippet.text(result);

            element.append(snippet);

            $('#ny-times').append(element);
            $('#ny-times').fadeIn(1000);


            // html += '<p><a href="' + resultURL + '">' + resultHeadline + '</a></p>' + '<span>' + result + '</span>' + '<a href="#">' + 'Read more...' + "</a>";
        });
        
    }


    $('#ny-times').on('click', '.readMore', function() {
        //get arcticle and display article 
        //api call 
    });





    ////////        Functions for The Guardian       ////////






    /// By Date /// 

    function getGuardianByDate(guardianDate) {
        var url = 'http://content.guardianapis.com/search?';
        $.ajax({
            url: url,
            type: 'GET',
            format: "json",
            data: {
                'api-key': "0175eee5-4dbd-4e58-b5da-8197d8e6dcc7",
                'from-date': guardianDate,
                'to-date': guardianDate,
                'use-date': 'published',
                'show-fields': 'trailText,headline,byline',
                'show-elements': 'image'
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showGuardian(results);
            }
        });
    }






    /// By Date Range /// 


    function getGuardianByDateRange(guardianDate1, guardianDate2) {
        var url = 'http://content.guardianapis.com/search?';
        $.ajax({
            url: url,
            type: 'GET',
            format: "json",
            // orderBy: "oldest",
            data: {
                'api-key': "0175eee5-4dbd-4e58-b5da-8197d8e6dcc7",
                // 'orderBy': 'oldest',
                'from-date': guardianDate1,
                'to-date': guardianDate2,
                'use-date': 'published',
                'show-fields': 'trailText,headline,byline',
                'show-blocks': 'body'
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showGuardian(results);
            }
        });
    }


    function getGuardianByTopic(byTopic, guardianDate) {
        var url = 'http://content.guardianapis.com/sections';
        $.ajax({
            url: url,
            type: 'GET',
            format: "json",
            data: {
                'api-key': "0175eee5-4dbd-4e58-b5da-8197d8e6dcc7",
                'q': byTopic,
                'from-date': guardianDate,
                'to-date': guardianDate,
                'show-fields': 'trailText,headline,byline'

            },
            success: function(data) {
                console.log(data);
                var results = data;
                showGuardian(results);
            }
        });
    }



    // function getGuardianByKeyword(byKeyword) {
    //     var url = 'http://content.guardianapis.com/tags';
    //     $.ajax({
    //         url: url,
    //         type: 'GET',
    //         format: "json",
    //         data: {
    //             'api-key': "0175eee5-4dbd-4e58-b5da-8197d8e6dcc7",
    //             'q': byKeyword,
    //             'show-fields': 'trailText,headline,byline',

    //             'use-date': 'published'
    //         },
    //         success: function(data) {
    //             console.log(data);
    //             var results = data;
    //             showGuardian(results);
    //         }
    //     });
    // }





    function showGuardian(results) {
        var html = "";
        var guardianStories = results.response.results;
        console.log(guardianStories);
        $.each(guardianStories, function(index, currentObject) {
            // html += '<p><a href="#">' + results.response.webTitle + '</a></p>';
            console.log(currentObject);
            var result = currentObject.fields.trailText;
            var resultHeadline = currentObject.fields.headline //.webTitle;
            var resultURL = currentObject.webUrl;

            var element = $("<p>");
            element.addClass('article');

            var headline = $('<a>');
            headline.attr('href', resultURL);
            headline.addClass('headline');
            headline.text(resultHeadline);

            element.append(headline);

            var snippet = $('<p>');
            snippet.addClass('snippet');
            snippet.text(result);

            var readMore = $('<a>');
            // readMore.attr('href', resultURL);
            readMore.addClass('readMore');
            readMore.text('Read More...');

            element.append(snippet);
            element.append(readMore);

            $('#guardian').append(element);
            // if ($('#ny-times').show()) == true {
            //     $('#ny-times').hide();
            // }
            $('#ny-times').fadeOut(500);            
            $('#guardian').fadeIn(1000);


            // html += '<p><a href="' + resultURL + '">' + resultHeadline + '</a></p>' + '<span>' + result + '</span>';
        });
        // $('#guardian').html(html);
    }


 $('#guardian').on('click', '.readMore', function() {
        getGuardianArticle();
        foldOut();    

    });

 function foldOUt(){
    var paperfold = $('.hidden').paperfold();
    $('.paperfold-toggle').click(paperfold.toggle);
 }


 function getGuardianArticle() {
        var url = 'http://content.guardianapis.com/search?';
        $.ajax({
            url: url,
            type: 'GET',
            format: "json",
            data: {
                'api-key': "0175eee5-4dbd-4e58-b5da-8197d8e6dcc7",
                'show-blocks': 'body'                
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showGuardian(results);
            }
        });
    }



    /////  jQuery Datepicker UI     /////


    $(function() {
        $("#by-date-nyTimes").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'mm-dd-yy',
            yearRange: "1851:c"

        });

        $("#by-date-guardian").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'mm-dd-yy',
            yearRange: "1999:c"

        });

        $("#by-date-range1-nyTimes").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'mm-dd-yy',
            yearRange: "1851:c"

        });

        $("#by-date-range2-nyTimes").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'mm-dd-yy',
            yearRange: "1851:c"

        });

        $("#by-topic-date-nyTimes").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'mm-dd-yy',
            yearRange: "1851:c"

        });

        $("#by-date-range1-guardian").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'mm-dd-yy',
            yearRange: "1999:c"

        });

        $("#by-date-range2-guardian").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'mm-dd-yy',
            yearRange: "1999:c"

        });

        $("#by-topic-date-guardian").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'mm-dd-yy',
            yearRange: "1999:c"

        });
    });






});
