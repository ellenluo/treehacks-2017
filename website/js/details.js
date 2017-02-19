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

        // set photo
        var photos = [];
        if (pet.media.photos != null) {
            $.each(pet.media.photos.photo, function (i, obj) {
                if (obj['@size'] == 'x') {
                    photos.push(obj);
                }
            });
        }

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
        $('#animal').text("Animal: " + pet.animal.$t);
        $('#breed').text("Breed(s): " + breeds.join(", "));
        $('#age').text("Age: " + pet.age.$t);
        $('#size').text("Size: " + pet.size.$t);
        $('#sex').text("Sex: " + pet.sex.$t);

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
                var shelter= data.petfinder.shelter;
                populateShelter(shelter);
                console.log(shelter);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }

    // populate shelter data
    function populateShelter(shelter) {
        console.log("done");
        $('#shelter-name').text("Name: " + shelter.name.$t);
        $('#shelter-phone').text("Phone: " + shelter.phone.$t);
        $('#shelter-email').text("Email: " + shelter.email.$t);
    }

    // populate photo carousel
    /*function populateCarousel(photos) {
        for(var i=0 ; i< m.length ; i++) {
            $('<div class="item"><img src="'+m[i]+'"><div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
            $('<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators')

        }
        $('.item').first().addClass('active');
        $('.carousel-indicators > li').first().addClass('active');
        $('#carousel-example-generic').carousel();
    }*/

    // check if JSON is object or array
    function isArray(what) {
        return Object.prototype.toString.call(what) === '[object Array]';
    }

    loadPet();

});