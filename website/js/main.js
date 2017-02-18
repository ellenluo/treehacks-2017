jQuery(document).ready(function() {
    //location.href = 'index.html#start';
    var pages = new Array();
    var current = 0;
    var loaded = new Array();

    //get all the pages link inside the #pages div and fill an array
    $('#pages a').each(function(index) {
        pages[index] = $(this).attr('href');
        loaded[$(this).attr('href')] = 0;
    });

    //on scroll gets when bottom of the page is reached and calls the function do load more content
    $(window).scroll(function(e){
        if($(window).scrollTop() + $(window).height() >= $(document).height() - 300) {
            console.log("bottom of the page reached!");

            loaded[pages[current+1]] = loaded[pages[current+1]] + 1;

            if(loaded[pages[current+1]] <= 1)
                loadMoreContent(current+1);
        }
    });

    //loads the next page and append it to the content with a fadeIn effect.
    //Before loading the content it shows and hides the loaden Overlay DIV
    function loadMoreContent(position) {
        //try to load more content only if the counter is minor than the number of total pages
        if(position < pages.length) {
            $('#loader').fadeIn('slow', function() {
                $.get(pages[position], function(data) {
                    $('#loader').fadeOut('slow', function() {
                        $('#scroll-container').append(data).fadeIn(100);
                        current=position;
                    });
                });
            });
        }
    }
});
