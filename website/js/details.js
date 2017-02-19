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

    function populateData(pet) {
        // set photo
        /*var photo = '';
        if (pet.media.photos != null) {
            var photos = [];

            $.each(pet.media.photos.photo, function (i, obj) {
                if (obj['@size'] == 'x') {
                    photo = obj.$t;
                }
                photos.push(obj);
            });
        }
        $(obj).find(".img").css("background-image", "url(" + photo + ")");*/

        // find breeds
        console.log(pet);

        var breeds = [];
        var JsonBreeds = pet.breeds.breed;
        if (isArray(JsonBreeds)) {
            $.each(JsonBreeds, function (i, obj) {
                breeds.push(obj.$t);
            });
        } else {
            breeds = [JsonBreeds.$t];
        }

        $('.overlay').find('h1').text(pet.name.$t);
        $('#animal').text("Animal: " + pet.animal.$t);
        $('#breed').text("Breed(s): " + breeds.join(", "));
        $('#age').text("Age: " + pet.age.$t);
        $('#size').text("Size: " + pet.size.$t);
        $('#sex').text("Sex: " + pet.sex.$t);
        $('#sex').text("Sex: " + pet.sex.$t);
    }

    // check if JSON is object or array
    function isArray(what) {
        return Object.prototype.toString.call(what) === '[object Array]';
    }

    loadPet();

});