    var $listItems = $('.list-group');
    var $keywords = $('#keywords');
    var $heading = $('.heading');

    $('#search').on('click', function () {
        $heading.empty();
        $listItems.empty();
        var $word = $keywords.val();
        $heading.append('<p>' + 'Here are the results for your search by key: ' + '"' + $word + '"' + '</p>');
        $.getJSON(
            'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + $word + '&callback=?',
            function (listItems) {
                for (var x in listItems.query.pages) {
                    var $url = "https://en.wikipedia.org/?curid=" + listItems.query.pages[x].pageid;
                    $listItems.append('<li class="list-group-item">' + '<a href="' + $url + '" style="text-decoration: none" target="_blank">' + '<h4 class="text-center">' + '<strong>' + listItems.query.pages[x].title + '</strong>' + '</h4>' + '<p class="text-center">' + listItems.query.pages[x].extract + '</p>' + '</a>' + '</li>');
                    console.log(listItems.query.pages[x].pageid);
                };
            });
    });

    $('#keywords').keypress(function (e) {
        if (e.which == 13) {
            $('#search').click();
        }
    });