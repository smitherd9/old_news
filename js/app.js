$(function() {


    // You can make separate functions for each ajax call 
    // You will likely need separate functions for each form

    $('.article-search').submit(function(e) {
        e.preventDefault();
        var byDate = $('#by-date').val();
        var startDate = $('#by-date-range1').val();
        var endDate = $('#by-date-range2').val();
        var byTopic = $('#by-topic').val();
        var byKeyword = $('#by-keyword').val();
        // try to format date here so it works with the api and looks nice to user
        getNyTimesByDate(byDate);
        getGuardianByDate(byDate);


    });

    function getNyTimesByDate(byDate) {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

        //For #by-date //

        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            data: {
                'api-key': "3e086fa1430d466ba4a63a7818c323a1",
                'begin_date': byDate,
                'end_date': byDate
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showNyTimes(results);
            }
        });
    }



    // For date range // 

    function getNyTimesByDateRange(byDateRange) {
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

    function getNyTimesByTopic(byTopic) {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            data: {
                'api-key': "3e086fa1430d466ba4a63a7818c323a1",
                'news_desk': byTopic
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showNyTimes(results);
            }
        });

    }

    function getNyTimesByKeyword(byTopic) {
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


    function getGuardianByDate(byDate) {
        var url = 'http://content.guardianapis.com/search?';
        $.ajax({
            url: url,
            type: 'GET',
            format: "json",
            data: {
                'api-key': "0175eee5-4dbd-4e58-b5da-8197d8e6dcc7",
                'from-date': byDate,
                'to-date': byDate,
                'use-date': 'published'
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showGuardian(results);
            }
        });
    }

    // The Guardian API doesn't have a snippet in the response to put on the page.  Maybe try 
    // to display something from the given URL?
    function showGuardian(results) {
        var html = "";
        var guardianStories = results.response.results;
        console.log(guardianStories);
        $.each(guardianStories, function(index, currentObject) {
            // html += '<p><a href="#">' + results.response.webTitle + '</a></p>';
            console.log(currentObject);
            var result = currentObject;
            var resultHeadline = currentObject.webTitle;
            var resultURL = currentObject.webUrl;


            html += '<p><a href="' + resultURL + '">' + resultHeadline + '</a></p>' + '<span>' + result + '</span>';
        });
        $('#guardian').html(html);
    }




    $(function() {
        $("#by-date").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'yy-mm-dd',
            altFormat: "yy-mm-dd",
            yearRange: "1851:c"

        });

        $("#by-date-range1").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'yy-mm-dd',
            altFormat: "yy-mm-dd",
            yearRange: "1851:c"

        });

        $("#by-date-range2").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'yy-mm-dd',
            altFormat: "yy-mm-dd",
            yearRange: "1851:c"

        });
    });






});
