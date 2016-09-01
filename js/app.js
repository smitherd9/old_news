$(function() {




    $('.article-search').submit(function(e) {
        e.preventDefault();
        var searchTerm = $('#by-date').val();

        getNyTimes(searchTerm);
        getGuardian(searchTerm);


    });

    function getNyTimes(searchTerm) {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

        //For #by-date //

        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            data: {
                'api-key': "3e086fa1430d466ba4a63a7818c323a1",
                'begin_date': searchTerm,
                'end_date': searchTerm
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showNyTimes(results);
            }
        });

        // For date range // 

        // $.ajax({
        //     url: url,
        //     type: 'GET',
        //     dataType: "json",
        //     data: {
        //         'api-key': "3e086fa1430d466ba4a63a7818c323a1",
        //         'begin_date': searchTerm
        //     },
        //     success: function(data) {
        //         console.log(data);
        //         var results = data;
        //         showNyTimes(results);
        //     }
        // });
        // }).done(function(result) {
        //     console.log(result);
        // }).fail(function(err) {
        //     throw err;
        // });

    }


// TODO    show article snippet with read more... underneath so user can click to see entire article.

    function showNyTimes(results) {
        var html = "";
        var docs = results.response.docs;
        console.log(docs);
        $.each(docs, function(index, currentObject) {
            console.log(currentObject);
            var result = currentObject.snippet;
            var resultHeadline = currentObject.headline.main;
            var resultURL = currentObject.web_url;

            html += '<p><a href="' + resultURL + '">' + resultHeadline  + '</a></p>' + '<span>' + result + '</span>';
        });
        $('#ny-times').html(html);
    }


    function getGuardian(searchTerm) {
    	var url = 'http://content.guardianapis.com/search?';
    	$.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            data: {
                'api-key': "0175eee5-4dbd-4e58-b5da-8197d8e6dcc7",
                'from-date': searchTerm,
                'to-date': searchTerm,
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
        $.each(results, function(index, value) {
            html += '<p><a href="#">' + results.response.webTitle + '</a></p>';
            console.log(results.response.webTitle);
        });
        $('#guardian').html(html);
    }




$(function() {
    $("#by-date").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yymmdd',
        altFormat: "yy-mm-dd",
        yearRange: "1851:c+10"

    });
});






});
