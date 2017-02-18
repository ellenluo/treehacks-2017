var http = require('http');

//http://api.petfinder.com/subsystem.method
//http://api.petfinder.com/pet.get?key=12345&id=24601
var KEY = 'b138f50035a774aca425038b6e975119';

var options = {
    host: 'http://api.petfinder.com',
    // path: '/pet.getRandom?key=' + KEY
    path: '/shelter.getPets?key=' + KEY + '&id=NJ94'
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
