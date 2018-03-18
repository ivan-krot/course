var http = require('http');
//my module
var view = require('./modules/view');
var logger = require('./modules/log_writer');

// HTML template file
var page = 'index.html';
// LOG file
var log_file = 'log_file.txt';

var server = http.createServer(function (request, response) {
    //read code and build webpage from file in 'page' variable
    var index_code = view(page);

    logger(request,log_file);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    //creating HTML page
    response.write(index_code);
    response.end();
});

server.listen(3000);//port for "listen"