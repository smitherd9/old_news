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
        $.each(results, function(index, value) {
        	var result1 = results.response.docs['0'].snippet;
        	var result1Headline = results.response.docs['0'].headline.main;
        	var result2 = results.response.docs['1'].snippet;                         // headline.print_headline;
        	var result2Headline = results.response.docs['1'].headline.main;                            // byline.original;
        	var result3 = results.response.docs['2'].snippet;
        	var result3Headline = results.response.docs['2'].headline.main;
            html += '<p><a href="results.web_url">' + result1Headline  + '</a></p>' + '<span>' + result1 + '</span>';
            html += '<p><a href="#">' + result2Headline + '</a></p>' + '<span>' + result2 + '</span>';
            html += '<p><a href="#">' + result3Headline  + '</a></p>' + '<span>' + result3 + '</span>';
            console.log(results.response.docs['0'], results.response.docs['1']);
        });
        $('#ny-times').html(html);
    }
    // $('#ny-times').append(results);


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
