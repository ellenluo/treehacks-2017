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
    function loadMoreContent(position) {
        //try to load more content only if the counter is minor than the number of total pages
        if(position < pages.length) {
            $('#loader').fadeIn('slow', function() {
                $.get(pages[position], function(data) {
                    $('#loader').fadeOut('slow', function() {
                        $('#scroll-container').append(data).fadeIn(999);
                        current=position;
                    });
                });
            });
        }
    }

    // get json data
    $.ajax({
        dataType: 'jsonp',
        url: "http://api.petfinder.com/pet.find?key=150d5bff08a3c97e69c2417d726c084d&location=94720&format=json&count=100",
        data: "",
        success: function(data) {
            var pets = [];
            $.each(data.petfinder.pets.pet, function(i, obj) {
                pets.push(obj);
            });
            updateItems(pets);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

    // generate content pages
    function generatePages(numEntries) {

    }

    // update pet items
    function updateItems(pets) {
        $('.item').each(function (i, obj) {
            var pet = pets[i];
            console.log(pet);

            var name = pet.name.$t;
            $(obj).find("h4").text(name);

            // set photo
            var photo = '';
            if (pet.media.photos != null) {
                var photos = [];

                $.each(pet.media.photos.photo, function (i, obj) {
                    if (obj['@size'] == 'x') {
                        photo = obj.$t;
                    }
                    photos.push(obj);
                });
            }
            $(obj).find(".img").css("background-image", "url(" + photo + ")");

            // set details
            var details = '';
            var breeds = pet.breeds.breed;
            if (isArray(breeds)) {
                $.each(breeds, function (i, obj) {
                    details = details + obj.$t + " ";
                });
            } else {
                details = breeds.$t;
            }
            $(obj).find("p").text(details);
        });
    }
    console.log(pages);

    // check if JSON is object or array
    function isArray(what) {
        return Object.prototype.toString.call(what) === '[object Array]';
    }

});
