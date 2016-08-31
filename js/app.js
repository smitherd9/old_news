$(function() {




    $('.article-search').submit(function(e) {
        e.preventDefault();
        var searchTerm = $('#by-date').val();
        getNyTimes(searchTerm);
        getGuardian(searchTerm);


    });

    function getNyTimes(searchTerm) {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            data: {
                'api-key': "3e086fa1430d466ba4a63a7818c323a1",
                'begin_date': searchTerm
            },
            success: function(data) {
                console.log(data);
                var results = data;
                showNyTimes(results);
            }
        });
        // }).done(function(result) {
        //     console.log(result);
        // }).fail(function(err) {
        //     throw err;
        // });

    }



    function showNyTimes(results) {
        var html = "";
        $.each(results, function(index, value) {
            html += '<p><a href="#">' + results.response.docs['0'].headline.print_headline + '</a></p>' + '<span>' + results.response.docs['0'].byline.original + '</span>';
            console.log(results.response.docs['0']);
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
                'from-date': searchTerm
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
            console.log(results.response.results.webTitle);
        });
        $('#guardian').html(html);
    }




// $(function() {
//     $("#by-date").datepicker({
//         changeMonth: true,
//         changeYear: true,
//         formatDate: 'yy-mm-dd',
//         altFormat: "yy-mm-dd",
//         yearRange: "1851:c+10"

//     });
// });






});
