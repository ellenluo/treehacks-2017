var http = require('http');
var crypto = require('crypto');
var parseString = require('xml2js').parseString;

//http://api.petfinder.com/subsystem.method
//http://api.petfinder.com/pet.get?key=12345&id=24601
var KEY = '150d5bff08a3c97e69c2417d726c084d';
var SECRET = 'ac3571b3c3673df983ae68777024537f';

var name = SECRET+"key="+KEY;

var SIG = crypto.createHash('md5').update(name).digest("hex");
// console.log(name);
// console.log(SIG);
// var url = 'http://api.petfinder.com/pet.get?format=json&key=150d5bff08a3c97e69c2417d726c084d&id=3934198'


var options = {
    host: 'http://api.petfinder.com',
    path: '/pet.get?key=150d5bff08a3c97e69c2417d726c084d&id=3934198'
    // path: '/auth.getToken?key=' + KEY + '&sig=' + SIG
    // path: '/pet.getRandom?key=' + KEY
    // path: '/shelter.getPets?key=' + KEY + '&id=NJ94'
};

callback = function(response) {
    var str = '';

    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on('end', function () {
        // parseString(str, function (err, result) {
        //     console.log(result);
        //     console.log(result.petfinder.pets[0].pet[0].description);
        //     // console.log(result.petfinder.breeds);
        //     // var pet = result.petfinder.pet;
        //     // console.log(pet);
        //     // console.log(pet[0]['id']);
        // });
        console.log(JSON.parse(str));

    });
}
var url = 'http://api.petfinder.com/pet.find?key=150d5bff08a3c97e69c2417d726c084d&location=94720&format=json';
// var url = 'http://api.petfinder.com/pet.get?key=150d5bff08a3c97e69c2417d726c084d&id=3934198';
// var url = 'http://api.petfinder.com/breed.list?key=150d5bff08a3c97e69c2417d726c084d&animal=barnyard';
http.request(url, callback).end();
