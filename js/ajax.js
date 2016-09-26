var $ = require('jquery');

module.exports = getNyTimesByDate;
module.exports = getNyTimesByDateRange;
module.exports = getNyTimesByTopic;
module.exports = getGuardianByDate;
module.exports = getGuardianByDateRange;
module.exports = getGuardianByTopic;
module.exports = getGuardianArticle;








/// The New York Times By Date ///


    var getNyTimesByDate = function(nyTimesDate) {                                  // var getNyTimesByDate (nyTimesDate) =>
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

    var getNyTimesByDateRange = function(nyTimesDate1, nyTimesDate2) {
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


    var getNyTimesByTopic = function(byTopic, nyTimesDate) {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            data: {
                'api-key': "3e086fa1430d466ba4a63a7818c323a1",
                'q': byTopic,                 
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



    /// By Date /// 

    var getGuardianByDate = function(guardianDate) {
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






    /// The Guardian By Date Range /// 


    var getGuardianByDateRange = function(guardianDate1, guardianDate2) {
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


    var getGuardianByTopic = function(byTopic, guardianDate) {
        var url = 'http://content.guardianapis.com/search?';
        $.ajax({
            url: url,
            type: 'GET',
            format: "json",
            data: {
                'api-key': "0175eee5-4dbd-4e58-b5da-8197d8e6dcc7",
                'q': byTopic,
                'from-date': guardianDate,
                'to-date': guardianDate,
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

// Get full Guardian aricles for readmore // 

    var getGuardianArticle = function(resultURL) {
        var url = resultURL;
        $.ajax({
            url: url,
            type: 'GET',
            format: "json",
            data: {
                'api-key': "0175eee5-4dbd-4e58-b5da-8197d8e6dcc7",
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