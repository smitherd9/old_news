$(function() {


    // You can make separate functions for each ajax call 
    // You will likely need separate functions for each form



    $('.article-search').submit(function(e) {
        e.preventDefault();    


    });




    /////      Get data by date      /////


    $('#btn-by-date').click(function() {
        // Each API has different date format requirements so it is necessary to 
        // reformat the date without changing what the user sees before 
        // the ajax call is made (before the date is sent to the API)

        // datepicker grabs date input on form and creates an object  
        // using 'getDate' on the input instead of .val()
        var byDate = $('#by-date').datepicker("getDate");
        // mDate creates a moment from moment.js for byDate object
        var mDate = moment(byDate);
        // nyTimesDate changes format for mDate object to a yymmdd string
        var nyTimesDate = mDate.format('YYYYMMDD');
        var guardianDate = mDate.format('YYYY-MM-DD');
        console.log(nyTimesDate);
        console.log(guardianDate);
        getNyTimesByDate(nyTimesDate);
        getGuardianByDate(guardianDate);
    });






    /////      Get data by date range      /////


    $('#btn-by-date-range').click(function() {
        var startDate = $('#by-date-range1').val();
        var endDate = $('#by-date-range2').val();
        getNyTimesByDateRange(startDate, endDate);
        getGuardianByDateRange(startDate, endDate);
    });







    /////      Get data by topic      /////


    $('#btn-by-topic').click(function() {
        var byTopic = $('#by-topic').val();
        getNyTimesByTopic(byTopic);
        getGuardianByTopic(byTopic);
    });







    /////      Get data by keyword      /////


    $('#btn-by-keyword').click(function() {
        var byKeyword = $('#by-keyword').val();
        getNyTimesByKeyword(byKeyword);
        getGuardianByKeyword(byKeyword);
    });









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

    function getNyTimesByDateRange(startDate, endDate) {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            data: {
                'api-key': "3e086fa1430d466ba4a63a7818c323a1",
                'begin_date': startDate,
                'end_date': endDate
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
                'news_desk': byTopic                       /// Not returning correct news desk section
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showNyTimes(results);
            }
        });

    }








    /// By Keyword /// 


    function getNyTimesByKeyword(byKeyword) {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            data: {
                'api-key': "3e086fa1430d466ba4a63a7818c323a1",
                'news_desk': byKeyword
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showNyTimes(results);
            }
        });

    }

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

            html += '<p><a href="' + resultURL + '">' + resultHeadline + '</a></p>' + '<span>' + result + '</span>';
        });
        $('#ny-times').html(html);
    }








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
                'show-fields': 'trailText,headline,byline'
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showGuardian(results);
            }
        });
    }






    /// By Date Range /// 


    function getGuardianByDateRange(startDate, endDate) {
        var url = 'http://content.guardianapis.com/search?';
        $.ajax({
            url: url,
            type: 'GET',
            format: "json",
            data: {
                'api-key': "0175eee5-4dbd-4e58-b5da-8197d8e6dcc7",
                'from-date': startDate,
                'to-date': endDate,
                'use-date': 'published',
                'show-fields': 'trailText,headline,byline'
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showGuardian(results);
            }
        });
    }


    function getGuardianByTopic(byTopic) {
        var url = 'http://content.guardianapis.com/sections';
        $.ajax({
            url: url,
            type: 'GET',
            format: "json",
            data: {
                'api-key': "0175eee5-4dbd-4e58-b5da-8197d8e6dcc7",
                'q': byTopic,
                'show-fields': 'trailText,headline,byline'

            },
            success: function(data) {
                console.log(data);
                var results = data;
                showGuardian(results);
            }
        });
    }



     function getGuardianByKeyword(byKeyword) {
        var url = 'http://content.guardianapis.com/tags';
        $.ajax({
            url: url,
            type: 'GET',
            format: "json",
            data: {
                'api-key': "0175eee5-4dbd-4e58-b5da-8197d8e6dcc7",
                'q': byKeyword,
                'show-fields': 'trailText,headline,byline',
                
                'use-date': 'published'
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showGuardian(results);
            }
        });
    }

    



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


            html += '<p><a href="' + resultURL + '">' + resultHeadline + '</a></p>' + '<span>' + result + '</span>';
        });
        $('#guardian').html(html);
    }






/////  jQuery Datepicker UI     /////


    $(function() {
        $("#by-date").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'mm-dd-yy',
            yearRange: "1851:c"

        });

        $("#by-date-range1").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'mm-dd-yy',
            yearRange: "1851:c"

        });

        $("#by-date-range2").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'mm-dd-yy',
            yearRange: "1851:c"

        });
    });






});
