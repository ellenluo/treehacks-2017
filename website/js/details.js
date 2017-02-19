jQuery(document).ready(function () {

    function loadPet() {
        var id = localStorage.getItem("current_pet_id");
        $.ajax({
            dataType: 'jsonp',
            url: "http://api.petfinder.com/pet.get?format=json&key=150d5bff08a3c97e69c2417d726c084d&id=" + id,
            data: "",
            success: function (data) {
                var pet = data.petfinder.pet;
                populateData(pet);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }

    // populate pet data
    function populateData(pet) {
        console.log(pet);

        // populate photo carousel
        var photos = [];
        if (pet.media.photos != null) {
            $.each(pet.media.photos.photo, function (i, obj) {
                if (obj['@size'] == 'x') {
                    photos.push(obj);
                }
            });
        }
        populateCarousel(photos);

        // find breeds
        var breeds = [];
        var JsonBreeds = pet.breeds.breed;
        if (isArray(JsonBreeds)) {
            $.each(JsonBreeds, function (i, obj) {
                breeds.push(obj.$t);
            });
        } else {
            breeds = [JsonBreeds.$t];
        }

        // populate pet details
        $('.overlay').find('h1').text(pet.name.$t);
        $('#animal').text(pet.animal.$t);
        $('#breed').text(breeds.join(", "));
        $('#age').text(pet.age.$t);
        $('#size').text(pet.size.$t);
        $('#sex').text(pet.sex.$t);
        $('#desc').text(pet.description.$t);

        // populate shelter info
        var shelterId = pet.shelterId.$t;
        loadShelter(shelterId);

    }

    // load shelter data
    function loadShelter(shelterId) {
        $.ajax({
            dataType: 'jsonp',
            url: "http://api.petfinder.com/shelter.get?format=json&key=150d5bff08a3c97e69c2417d726c084d&id=" + shelterId,
            data: "",
            success: function (data) {
                var shelter = data.petfinder.shelter;
                populateShelter(shelter);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }

    // populate shelter data
    function populateShelter(shelter) {
        var location = shelter.city.$t + ", " + shelter.state.$t + ", " + shelter.country.$t + ", " + shelter.zip.$t;

        console.log(shelter);
        $('#shelter-name').text(shelter.name.$t);
        $('#shelter-location').text(location);
        $('#shelter-phone').text(shelter.phone.$t);
        $('#shelter-email').text(shelter.email.$t);
    }

    // populate photo carousel
    function populateCarousel(photos) {
        $.each(photos, function (i, obj) {
            $('<div class="item"><img src="' + obj.$t + '"><div class="carousel-caption"></div></img></div>').appendTo('.carousel-inner');
            $('<li data-target="#image-slide" data-slide-to="' + i + '"></li>').appendTo('.carousel-indicators');
        });

        $('.item').first().addClass('active');
        $('.carousel-indicators > li').first().addClass('active');
        $('#image-slide').carousel();
    }

    // check if JSON is object or array
    function isArray(what) {
        return Object.prototype.toString.call(what) === '[object Array]';
    }

    loadPet();

});