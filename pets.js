var http = require('http');
var https = require('https');
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
        console.log(JSON.parse(str));
        jsonObj = JSON.parse(str);
        if(jsonObj.hasOwnProperty('petfinder')) {
            console.log(jsonObj.petfinder.petIds);
            pedID = jsonObj.petfinder.petIds.id;
            console.log(petID);
        }
    });
}
// var url = 'http://api.petfinder.com/pet.find?key=150d5bff08a3c97e69c2417d726c084d&location=94720&format=json';
// var url = 'http://api.petfinder.com/pet.get?key=150d5bff08a3c97e69c2417d726c084d&id=3934198';
// var url = 'http://api.petfinder.com/breed.list?key=150d5bff08a3c97e69c2417d726c084d&animal=barnyard';
var url = 'http://api.petfinder.com/pet.getRandom?key=150d5bff08a3c97e69c2417d726c084d&location=94720&format=json';
var petID = "";
http.request(url, callback).end();


var url = 'https://5sqk10icy4.execute-api.us-west-2.amazonaws.com/dev/pets/35107430'
https.request(url, callback).end();
