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
    

    $('.form-inline').submit(function(e) {
        e.preventDefault();

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
        var byDate2 = $('#by-topic-date-nyTimes2').datepicker("getDate");        
        var mDate = moment(byDate);
        var mDate2 = moment(byDate2);       
        var nyTimesDate = mDate.format('YYYYMMDD');
        var nyTimesDate2 = mDate2.format('YYYYMMDD');
        console.log(nyTimesDate);
        
        getNyTimesByTopic(byTopic, nyTimesDate);

    });


    $('#btn-by-topic-guardian').click(function() {
        var byTopic = $('#by-topic-guardian').val();
        var byTopicDate = $('#by-topic-date-guardian').datepicker("getDate");
        var byTopicDate2 = $('#by-topic-date-guardian2').datepicker("getDate");
        var mDate = moment(byTopicDate);
        var mDate2 = moment(byTopicDate2);
        var guardianDate = mDate.format('YYYY-MM-DD');
        var guardianDate2 = mDate2.format('YYYY-MM-DD');
        getGuardianByTopic(byTopic, guardianDate, guardianDate2);
        console.log(byTopic);
    });




    ////////          Functions for New York Times        //////////



    /// By Date ///


    function getNyTimesByDate(nyTimesDate) {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";      

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: {
                'api-key': 'pEWnL3El6LeL32268WYm1bRAzqBpeIEo',
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
                'api-key': "pEWnL3El6LeL32268WYm1bRAzqBpeIEo",
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
    

    function getNyTimesByTopic(byTopic, nyTimesDate, nyTimesDate2) {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            data: {
                'api-key': "pEWnL3El6LeL32268WYm1bRAzqBpeIEo",
                'q': byTopic,                 
                'begin_date': nyTimesDate,
                'end_date': nyTimesDate2
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showNyTimes(results);
            }
        });

    }


    

    

    function showNyTimes(results) {
        $('#ny-times').html('');
        var html = "";
        var docs = results.response.docs;
        console.log(docs);
        $.each(docs, function(index, currentObject) { //index is just location of object in the array, value is the current object
            console.log(currentObject);
            var result = currentObject.snippet; // headline.print_headline;
            var resultHeadline = currentObject.headline.main; // byline.original;
            var resultURL = currentObject.web_url;
            var body = currentObject.lead_paragraph;

            var element = $('<div>');
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
            readMore.addClass('btn btn-default readMore');
            readMore.text('Read More...');

            var bodyText = $('<div>');
            bodyText.addClass('bodyText');
            bodyText.text(body); 


            element.append(snippet);
            element.append(readMore);
            element.append(bodyText);

            
            $('#ny-times').append(element);          
                      
            $('#ny-times').fadeIn(1000);

            
        });
        
    }



    ////////        Functions for The Guardian       ////////



    /// By Date /// 

    function getGuardianByDate(guardianDate) {
        var url = 'https://content.guardianapis.com/search?';
        $.ajax({
            url: url,
            type: 'GET',
            format: "json",
            data: {
                'api-key': "67dea408-7513-440e-9e68-5d07c95c0abf",
                'from-date': guardianDate,
                'to-date': guardianDate,
                'use-date': 'published',
                'show-fields': 'trailText,headline,byline',
                'show-elements': 'image',
                'show-blocks': 'body',
                'shouldHideAdverts': true 
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
        var url = 'https://content.guardianapis.com/search?';
        $.ajax({
            url: url,
            type: 'GET',
            format: "json",            
            data: {
                'api-key': "67dea408-7513-440e-9e68-5d07c95c0abf",
                'orderBy': 'oldest',
                'from-date': guardianDate1,
                'to-date': guardianDate2,
                'use-date': 'published',
                'show-fields': 'trailText,headline,byline',
                'show-blocks': 'body',
                'shouldHideAdverts': true 
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showGuardian(results);
            }
        });
    }


    function getGuardianByTopic(byTopic, guardianDate, guardianDate2) {
        var url = 'https://content.guardianapis.com/search?';
        $.ajax({
            url: url,
            type: 'GET',
            format: "json",
            data: {
                'api-key': "67dea408-7513-440e-9e68-5d07c95c0abf",
                'q': byTopic,
                'from-date': guardianDate,
                'to-date': guardianDate2,
                'show-fields': 'trailText,headline,byline',
                'shouldHideAdverts': true 

            },
            success: function(data) {
                console.log(data);
                var results = data;
                showGuardian(results);
            }
        });
    }



   





    function showGuardian(results) {
        $('#guardian').html('');
        var html = "";
        var guardianStories = results.response.results;
        console.log(guardianStories);
        $.each(guardianStories, function(index, currentObject) {
            
            console.log(currentObject);
            var result = currentObject.fields.trailText;
            var resultHeadline = currentObject.fields.headline //.webTitle;
            var resultURL = currentObject.webUrl;
            if (currentObject.hasOwnProperty('blocks')) {
                var body = currentObject.blocks.body['0'].bodyTextSummary;
            }

            else {
                var body = result;
            }
            

            var element = $('<div>');
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
            readMore.addClass('btn btn-default readMore');
            readMore.text('Read More...');

            var bodyText = $('<div>');
            bodyText.addClass('bodyText');
            bodyText.text(body); 


            element.append(snippet);
            element.append(readMore);
            element.append(bodyText);

            $('#guardian').append(element);           
        
            $('#guardian').fadeIn(1000);               

           
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

        $("#by-topic-date-nyTimes2").datepicker({
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

        $("#by-topic-date-guardian2").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'mm-dd-yy',
            yearRange: "1999:c"

        });



    });

});
