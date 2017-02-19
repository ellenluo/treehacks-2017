jQuery(document).ready(function () {
    //location.href = 'index.html#start';
    var pages = [];
    var current = 0;
    var loaded = [];
    var pets = [];

    var animal = '';
    var zip = 94720;
    var age = '';
    var gender = '';

    //get all the pages link inside the #pages div and fill an array
    $('#pages a').each(function (index) {
        pages[index] = $(this).attr('href');
        loaded[$(this).attr('href')] = 0;
    });

    //on scroll gets when bottom of the page is reached and calls the function do load more content
    $(window).scroll(function (e) {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 300) {
            console.log("bottom of the page reached!");
            loaded[pages[current + 1]] = loaded[pages[current + 1]] + 1;

            if (loaded[pages[current + 1]] <= 1)
                loadMoreContent(current + 1);
        }
    });

    //loads the next page and append it to the content with a fadeIn effect.
    function loadMoreContent(position) {
        if (position < pages.length) {
            $('#loader').fadeIn('slow', function () {
                $.get(pages[position], function (data) {
                    $('#loader').fadeOut('slow', function () {
                        $('#scroll-container').append(data).fadeIn(999);
                        updateItems();
                        current = position;
                    });
                });
            });
        }
    }

    // filter location button
    $("#filter-zip-btn").click(function () {
        zip = $("#filter-zip").val();
        getUrl();
    });


    // filter all
    $("#all_animals").click(function () {
        $(this).parent().parent().find('button').text('').html('All <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        animal = '';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // filter barnyard
    $("#barnyard").click(function () {
        $(this).parent().parent().find('button').text('').html('Barnyard <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        animal = 'barnyard';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // filter bird
    $("#bird").click(function () {
        $(this).parent().parent().find('button').text('').html('Bird <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        animal = 'bird';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // filter cat
    $("#cat").click(function () {
        $(this).parent().parent().find('button').text('').html('Cat <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        animal = 'cat';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // filter dog
    $("#dog").click(function () {
        $(this).parent().parent().find('button').text('').html('Dog <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        animal = 'dog';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // filter horse
    $("#horse").click(function () {
        $(this).parent().parent().find('button').text('').html('Horse <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        animal = 'horse';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // filter pig
    $("#pig").click(function () {
        $(this).parent().parent().find('button').text('').html('Pig <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        animal = 'pig';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // filter reptile
    $("#reptile").click(function () {
        $(this).parent().parent().find('button').text('').html('Reptile <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        animal = 'reptile';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // filter small furry
    $("#small_furry").click(function () {
        $(this).parent().parent().find('button').text('').html('Small Furry <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        animal = 'smallfurry';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // filter all
    $("#all_ages").click(function () {
        $(this).parent().parent().find('button').text('').html('All <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        age = '';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // filter baby
    $("#baby").click(function () {
        $(this).parent().parent().find('button').text('').html('Baby <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        age = 'baby';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // filter young
    $("#young").click(function () {
        $(this).parent().parent().find('button').text('').html('Young <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        age = 'young';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // filter adult
    $("#adult").click(function () {
        $(this).parent().parent().find('button').text('').html('Adult <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        age = 'adult';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // filter baby
    $("#senior").click(function () {
        $(this).parent().parent().find('button').text('').html('Senior <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        age = 'senior';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // filter all
    $("#all_genders").click(function () {
        $(this).parent().parent().find('button').text('').html('All <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        gender = '';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // filter male
    $("#male").click(function () {
        $(this).parent().parent().find('button').text('').html('Male <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        gender = 'M';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // filter female
    $("#female").click(function () {
        $(this).parent().parent().find('button').text('').html('Female <span class="caret"></span>');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        gender = 'F';
        getUrl();
    }).on("mouseover", function () {
        $(this).css('cursor', 'pointer');
    });

    // gets API call url
    function getUrl() {
        var url = "http://api.petfinder.com/pet.find?key=150d5bff08a3c97e69c2417d726c084d&format=json&count=100&location=" + zip;
        if (animal != '') {
            url += '&animal=' + animal;
        }
        if (age != '') {
            url += '&age=' + age;
        }
        if (gender != '') {
            url += '&sex=' + gender;
        }
        fetchData(url);
    }

    // get pets json data
    function fetchData(url) {
        $.ajax({
            dataType: 'jsonp',
            url: url,
            data: "",
            success: function (data) {
                pets = [];
                $.each(data.petfinder.pets.pet, function (i, obj) {
                    pets.push(obj);
                });
                updateItems();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }

    // update pet items
    function updateItems() {
        $('.item').each(function (i, obj) {
            var pet = pets[i];
            console.log(pet);

            var name = pet.name.$t;
            $(obj).find("a").text(name);

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
            var details = [];
            var breeds = pet.breeds.breed;
            if (isArray(breeds)) {
                $.each(breeds, function (i, obj) {
                    details.push(obj.$t);
                });
            } else {
                details = [breeds.$t];
            }
            $(obj).find("p").text(details.join(", "));
            $(obj).find(".pet-id").text(pet.id.$t);
        });
    }

    // check if JSON is object or array
    function isArray(what) {
        return Object.prototype.toString.call(what) === '[object Array]';
    }

    // mouseover/click events for pets
    $(".item a").on("mouseover", function () {
        $('.item a').css('cursor', 'pointer');
    }).click(function () {
        saveData($(this));
        window.location.href = "details.html"
    });

    // store json
    function saveData(selector) {
        var id = selector.parent().find('.pet-id').text();
        console.log(id);
        localStorage.setItem("current_pet_id", id);
    }

    getUrl();

});
