$(function() {




	$('.article-search').submit(function(e) {
        e.preventDefault();
        var searchTerm = $('#by-date').val();
        getRequest(searchTerm);


    });

    function getRequest(searchTerm) {


        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
            'api-key': "3e086fa1430d466ba4a63a7818c323a1",
            'begin_date': searchTerm,
            'end_date': ""
        });
        $.ajax({
            url: url,
            method: 'GET',
        }).done(function(result) {
            console.log(result);
        }).fail(function(err) {
            throw err;
        });

    }



    function showResults() {
    	$('#ny-times')
    }



});
