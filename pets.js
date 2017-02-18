var http = require('http');
var crypto = require('crypto');


//http://api.petfinder.com/subsystem.method
//http://api.petfinder.com/pet.get?key=12345&id=24601
var KEY = '150d5bff08a3c97e69c2417d726c084d';
var SECRET = 'ac3571b3c3673df983ae68777024537f';

var name = SECRET+"key="+KEY;

var SIG = crypto.createHash('md5').update(name).digest("hex");
console.log(name);
console.log(SIG);

var options = {
    host: 'http://api.petfinder.com',
    path: '/auth.getToken?key=' + KEY + '&sig=' + SIG
    // path: '/pet.getRandom?key=' + KEY
    // path: '/shelter.getPets?key=' + KEY + '&id=NJ94'
};

callback = function(response) {
  var str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback).end();
console.log(options);
