var $ = require('jquery');
var jqueryUi = require('jquery-ui');
var getAjax = require('./ajax');
var bootstrap = require('bootstrap');



$(function() {




    // Function for Animate.Css // 

    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });


    // You can make separate functions for each ajax call 
    // You will likely need separate functions for each form

    $('#ny-times').hide();
    $('#guardian').hide();
    

    $('.article-search').submit(function(e) {
        e.preventDefault();


    });


    $('#about-screen').click(function(){        
        $('.overlay').show();
        $('.overlay').animateCss('slideInDown');
    });

    $('#close-button').click(function(){
        $('.overlay').fadeOut(600);
        // $('.overlay').animateCss('slideOutUp');
        // setTimeout(function() {
        //             $('.overlay').hide();
        //         }, 600);
        
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
        var byDate = $('#by-topic-date-nyTimes').datepicker("getDate");        
        var mDate = moment(byDate);       
        var nyTimesDate = mDate.format('YYYYMMDD');
        console.log(nyTimesDate);
        
        getNyTimesByTopic(byTopic, nyTimesDate);

    });


    $('#btn-by-topic-guardian').click(function() {
        var byTopic = $('#by-topic-guardian').val();
        var byTopicDate = $('#by-topic-date-guardian').datepicker("getDate");
        var mDate = moment(byTopicDate);
        var guardianDate = mDate.format('YYYY-MM-DD');
        getGuardianByTopic(byTopic, guardianDate);
    });




    ////////          Functions for New York Times        //////////



    // /// By Date ///


    // function getNyTimesByDate(nyTimesDate) {
    //     var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    //     //For #by-date //

    //     $.ajax({
    //         url: url,
    //         type: 'GET',
    //         dataType: "json",
    //         data: {
    //             'api-key': "3e086fa1430d466ba4a63a7818c323a1",
    //             'begin_date': nyTimesDate,
    //             'end_date': nyTimesDate
    //         },
    //         success: function(data) {
    //             console.log(data);
    //             var results = data;
    //             showNyTimes(results);
    //         }
    //     });
    // }






    // /// By date range /// 

    // function getNyTimesByDateRange(nyTimesDate1, nyTimesDate2) {
    //     var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    //     $.ajax({
    //         url: url,
    //         type: 'GET',
    //         dataType: "json",
    //         data: {
    //             'api-key': "3e086fa1430d466ba4a63a7818c323a1",
    //             'begin_date': nyTimesDate1,
    //             'end_date': nyTimesDate2
    //         },
    //         success: function(data) {
    //             console.log(data);
    //             var results = data;
    //             showNyTimes(results);
    //         }
    //     });
    // }








    // /// By Topic /// 


    // function getNyTimesByTopic(byTopic, nyTimesDate) {
    //     var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    //     $.ajax({
    //         url: url,
    //         type: 'GET',
    //         dataType: "json",
    //         data: {
    //             'api-key': "3e086fa1430d466ba4a63a7818c323a1",
    //             'q': byTopic,                 
    //             'begin_date': nyTimesDate,
    //             'end_date': nyTimesDate
    //         },
    //         success: function(data) {
    //             console.log(data);
    //             var results = data;
    //             showNyTimes(results);
    //         }
    //     });

    // }


    

    

    function showNyTimes(results) {
        var html = "";
        var docs = results.response.docs;
        console.log(docs);
        $.each(docs, function(index, currentObject) { //index is just location of object in the array, value is the current object
            console.log(currentObject);
            var result = currentObject.snippet; // headline.print_headline;
            var resultHeadline = currentObject.headline.main; // byline.original;
            var resultURL = currentObject.web_url;
            var body = currentObject.lead_paragraph;

            var element = $("<div>");
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
            readMore.attr('href', resultURL);
            readMore.attr('target', '_blank');
            readMore.addClass('readMore');
            readMore.text('Read More...');

            var bodyText = $('<div>');
            bodyText.addClass('bodyText');
            bodyText.text(body); 


            element.append(snippet);
            element.append(readMore);
            element.append(bodyText);

            $('#ny-times').append(element);
            
            $('#guardian').fadeOut(500);
            $('#ny-times').show();            
            $('#ny-times').animateCss('fadeInUp');

            // $(element).scrollTop(100);

            // if (element.height() > 100) {
            //     alert("It's more than 100");
                // $(document).scrollTop(100);
            // }    


            // $(document).scrollTop($(document).height(100));

            // if height of div with articles inside --- add css class with vh 100 (viewport height)


            // $(element).animate({scrollTop: -1}, 'slow');

            

            
        });
        
    }


    // $('#ny-times').on('click', '.readMore', function() {
    //     $(this).siblings('.bodyText').toggle();
    //     //get article and display article 
    //     //api call 
    // });





    ////////        Functions for The Guardian       ////////






    // /// By Date /// 

    // function getGuardianByDate(guardianDate) {
    //     var url = 'http://content.guardianapis.com/search?';
    //     $.ajax({
    //         url: url,
    //         type: 'GET',
    //         format: "json",
    //         data: {
    //             'api-key': "0175eee5-4dbd-4e58-b5da-8197d8e6dcc7",
    //             'from-date': guardianDate,
    //             'to-date': guardianDate,
    //             'use-date': 'published',
    //             'show-fields': 'trailText,headline,byline',
    //             'show-elements': 'image',
    //             'show-blocks': 'body',
    //             'shouldHideAdverts': true 
    //         },
    //         success: function(data) {
    //             console.log(data);
    //             var results = data;
    //             showGuardian(results);
    //         }
    //     });
    // }






    // /// By Date Range /// 


    // function getGuardianByDateRange(guardianDate1, guardianDate2) {
    //     var url = 'http://content.guardianapis.com/search?';
    //     $.ajax({
    //         url: url,
    //         type: 'GET',
    //         format: "json",
    //         // orderBy: "oldest",
    //         data: {
    //             'api-key': "0175eee5-4dbd-4e58-b5da-8197d8e6dcc7",
    //             // 'orderBy': 'oldest',
    //             'from-date': guardianDate1,
    //             'to-date': guardianDate2,
    //             'use-date': 'published',
    //             'show-fields': 'trailText,headline,byline',
    //             'show-blocks': 'body',
    //             'shouldHideAdverts': true 
    //         },
    //         success: function(data) {
    //             console.log(data);
    //             var results = data;
    //             showGuardian(results);
    //         }
    //     });
    // }


    // function getGuardianByTopic(byTopic, guardianDate) {
    //     var url = 'http://content.guardianapis.com/search?';
    //     $.ajax({
    //         url: url,
    //         type: 'GET',
    //         format: "json",
    //         data: {
    //             'api-key': "0175eee5-4dbd-4e58-b5da-8197d8e6dcc7",
    //             'q': byTopic,
    //             'from-date': guardianDate,
    //             'to-date': guardianDate,
    //             'show-fields': 'trailText,headline,byline',
    //             'shouldHideAdverts': true 

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
            var body = currentObject.blocks.body['0'].bodyTextSummary;

            var element = $("<div>");
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
            // readMore.attr('href', bodyText);
            readMore.addClass('readMore');
            readMore.text('Read More...');

            var bodyText = $('<div>');
            bodyText.addClass('bodyText');
            bodyText.text(body); 


            element.append(snippet);
            element.append(readMore);
            element.append(bodyText);

            $('#guardian').append(element);
            
            $('#ny-times').fadeOut(500);            
            $('#guardian').fadeIn(1000);

                

           
        });
        
    }


$('#guardian').on('click', '.readMore', function() {
        $(this).siblings('.bodyText').toggle();
    });



 // function foldOUt(){
 //    var paperfold = $('.hidden').paperfold();
 //    $('.paperfold-toggle').click(paperfold.toggle);
 // }



 // function getGuardianArticle(resultURL) {
 //        var url = resultURL;
 //        $.ajax({
 //            url: url,
 //            type: 'GET',
 //            format: "json",
 //            data: {
 //                'api-key': "0175eee5-4dbd-4e58-b5da-8197d8e6dcc7",
 //                'show-blocks': 'body',
 //                'shouldHideAdverts': true                
 //            },
 //            success: function(data) {
 //                console.log(data);
 //                var results = data;
 //                showGuardian(results);
 //            }
 //        });
 //    }


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
