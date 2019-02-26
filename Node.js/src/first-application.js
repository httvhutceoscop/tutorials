var http = require("http");

http.createServer(function (request, response){
    // Send the HTTP header
    // HTTP status: 200 : OK
    // Context-Type: text/plain

    response.writeHead(200, {'Context-Type' : 'text/plain'});

    // Send the response body as "Hello World"
    response.end('Hello World\n');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');