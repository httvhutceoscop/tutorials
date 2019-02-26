[Node.js] - Node.js Tutorials

[Contents]

# Node.js - introduction

```
Node.js = Runtime Environment + JavaScript Library
```

## Features of Node.js
- AsynchroKnous and Event Driven
- Very Fast
- Single Threaded but Highly Scalable
- No Buffering
- License − Node.js is released under the MIT license.

## Who Uses Node.js?
Ex: eBay, General Electric, GoDaddy, Microsoft, PayPal, Uber, Wikipins, Yahoo!, and Yammer ...

[Projects, Applications, and Companies Using Node](https://github.com/joyent/node/wiki/projects,-applications,-and-companies-using-node)

## Concepts

![Node.js concepts][nodejs_concepts]

[nodejs_concepts]: https://www.tutorialspoint.com/nodejs/images/nodejs_concepts.jpg "Node.js concepts"

## Where to Use Node.js?
- I/O bound Applications
- Data Streaming Applications
- Data Intensive Real-time Applications (DIRT)
- JSON APIs based Applications
- Single Page Applications

## Where Not to Use Node.js?
It is not advisable to use Node.js for CPU intensive applications.

# Node.js -  REPL Terminal

REPL - Read Eval Print Loop

- **Read** − Reads user's input, parses the input into JavaScript data-structure, and stores in memory.
- **Eval** − Takes and evaluates the data structure.
- **Print** − Prints the result.
- **Loop** − Loops the above command until the user presses ctrl-c twice.

Start REPL by typing: `node` in command windows.

## REPL Commands
- `ctrl + c` − terminate the current command.
- `ctrl + c` twice − terminate the Node REPL.
- `ctrl + d` − terminate the Node REPL.
- `Up/Down Keys` − see command history and modify previous commands.
- `tab Keys` − list of current commands.
- `.help` − list of all commands.
- `.break` − exit from multiline expression.
- `.clear` − exit from multiline expression.
- `.save` filename − save the current Node REPL session to a file.
- `.load` filename − load file content in current Node REPL session.

## Stopping REPL
As mentioned above, you will need to use `ctrl-c twice` to come out of Node.js REPL.

# Node.js - NPM (Node Package Manager)

## Update NPM

```
sudo npm install npm -g
```

## Installing Modules using NPM

```
npm install Module_Name
```

## Global vs Local Installation

Check installed modules

- Local: `npm ls`
- Global: `npm ls -g`

## Using package.json
package.json is present in the root directory of any Node application/module and is used to define the properties of a package.

## Attributes of Package.json
- `name` − name of the package
- `version` − version of the package
- `description` − description of the package
- `homepage` − homepage of the package
- `author` − author of the package
- `contributors` − name of the contributors to the package
- `dependencies` − list of dependencies. NPM automatically installs all the dependencies mentioned here in the node_module folder of the package.
- `repository` − repository type and URL of the package
- `main` − entry point of the package
- `keywords` − keywords

## Uninstalling a Module
```
npm uninstall Module_Name
```
## Updating a Module
```
npm update Module_Name
```
## Search a Module
```
npm search Module_Name
```
## Create a Module
```
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sane defaults.

See 'npm help json' for definitive documentation on these fields
and exactly what they do.

Use 'npm install <pkg> --save' afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (webmaster)
```
Provide all the required information about your module
```
$ npm adduser
Username: mcmohd
Password:
Email: (this IS public) mcmohd@gmail.com
```
Publish your module
```
npm publish
```

# Node.js - Callbacks Concept
## Blocking Code Example
```
var fs = require("fs");
var data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log("Program Ended");
```

## Non-Blocking Code Example
```
var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
   if (err) return console.error(err);
   console.log(data.toString());
});

console.log("Program Ended");
```

These two examples explain the concept of blocking and non-blocking calls.

- The first example shows that the program blocks until it reads the file and then only it proceeds to end the program.
- The second example shows that the program does not wait for file reading and proceeds to print "Program Ended" and at the same time, the program without blocking continues reading the file.

# Node.js - Event Loop
## Event-Driven Programming

![Node.js Event Loop][event_loop]

[event_loop]: https://www.tutorialspoint.com/nodejs/images/event_loop.jpg "Node.js Event Loop"

## Example

```
// Import events module
var events = require('events');

// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();

// Create an event handler as follows
var connectHandler = function connected() {
   console.log('connection succesful.');
  
   // Fire the data_received event 
   eventEmitter.emit('data_received');
}

// Bind the connection event with the handler
eventEmitter.on('connection', connectHandler);
 
// Bind the data_received event with the anonymous function
eventEmitter.on('data_received', function() {
   console.log('data received succesfully.');
});

// Fire the connection event 
eventEmitter.emit('connection');

console.log("Program Ended.");
```
## How Node Applications Work?
- callback is the last parameter in async function
- error is the first parameter in callback function

# Node.js - Event Emitter
## Example
```
var events = require('events');
var eventEmitter = new events.EventEmitter();

// listener #1
var listner1 = function listner1() {
   console.log('listner1 executed.');
}

// listener #2
var listner2 = function listner2() {
   console.log('listner2 executed.');
}

// Bind the connection event with the listner1 function
eventEmitter.addListener('connection', listner1);

// Bind the connection event with the listner2 function
eventEmitter.on('connection', listner2);

var eventListeners = require('events').EventEmitter.listenerCount
   (eventEmitter,'connection');
console.log(eventListeners + " Listner(s) listening to connection event");

// Fire the connection event 
eventEmitter.emit('connection');

// Remove the binding of listner1 function
eventEmitter.removeListener('connection', listner1);
console.log("Listner1 will not listen now.");

// Fire the connection event 
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Listner(s) listening to connection event");

console.log("Program Ended.");
```

# Node.js - Buffers
Buffer class is a global class that can be accessed in an application without importing the buffer module.

## Creating Buffers

- Method 1
```
var buf = new Buffer(10); // 10 octets
```
- Method 2
```
var buf = new Buffer([10, 20, 30, 40, 50]); // given array
```
- Method 3
Following is the syntax to create a Buffer from a given string and optionally encoding type −
```
var buf = new Buffer("Simply Easy Learning", "utf-8"); // given string and optionally encoding type
```
Though "utf8" is the default encoding, you can use any of the following encodings "ascii", "utf8", "utf16le", "ucs2", "base64" or "hex".

## Writing to Buffers
### Syntax
```
buf.write(string[, offset][, length][, encoding])
```
### Parameters
- **string** − This is the string data to be written to buffer.
- **offset** − This is the index of the buffer to start writing at. Default value is 0.
- **length** − This is the number of bytes to write. Defaults to buffer.length.
- **encoding** − Encoding to use. 'utf8' is the default encoding.

### Return Value
This method returns the number of octets written. If there is not enough space in the buffer to fit the entire string, it will write a part of the string.

## Reading from Buffers
### Syntax
```
buf.toString([encoding][, start][, end])
```
### Parameters
- **encoding** − Encoding to use. 'utf8' is the default encoding.
- **start** − Beginning index to start reading, defaults to 0.
- **end** − End index to end reading, defaults is complete buffer.

### Return Value
This method decodes and returns a string from buffer data encoded using the specified character set encoding.
## Convert Buffer to JSON
### Syntax
```
buf.toJSON()
```
### Return Value
This method returns a JSON-representation of the Buffer instance.

## Concatenate Buffers
### Syntax
```
Buffer.concat(list[, totalLength])
```
### Parameters
- **list** − Array List of Buffer objects to be concatenated.
- **totalLength** − This is the total length of the buffers when concatenated.

### Return Value
This method returns a Buffer instance.

## Compare Buffers
### Syntax
```
buf.compare(otherBuffer);
```
### Parameters
- **otherBuffer** − This is the other buffer which will be compared with buf

### Return Value
Returns a number indicating whether it comes before or after or is the same as the otherBuffer in sort order.

## Copy Buffer
### Syntax
```
buf.copy(targetBuffer[, targetStart][, sourceStart][, sourceEnd])
```
### Parameters
- **targetBuffer** − Buffer object where buffer will be copied.
- **targetStart** − Number, Optional, Default: 0
- **sourceStart** − Number, Optional, Default: 0
- **sourceEnd** − Number, Optional, Default: buffer.length

### Return Value
No return value. Copies data from a region of this buffer to a region in the target buffer even if the target memory region overlaps with the source. If undefined, the targetStart and sourceStart parameters default to 0, while sourceEnd defaults to buffer.length.

## Slice Buffer
### Syntax
```
buf.slice([start][, end])
```
### Parameters
- **start** − Number, Optional, Default: 0
- **end** − Number, Optional, Default: buffer.length

### Return Value
Returns a new buffer which references the same memory as the old one, but offset and cropped by the start (defaults to 0) and end (defaults to buffer.length) indexes. Negative indexes start from the end of the buffer.

## Buffer Length
### Syntax
```
buf.length;
```
### Return Value
Returns the size of a buffer in bytes.

# Node.js - Streams
## What are Streams?
- Are objects
- Read data from source
- Write data to a destination
- Four types:
    - **Readable** − Stream which is used for read operation.
    - **Writable** − Stream which is used for write operation.
    - **Duplex** − Stream which can be used for both read and write operation.
    - **Transform** − A type of duplex stream where the output is computed based on input.

Each type of Stream is an EventEmitter instance and throws several events at different instance of times. For example, some of the commonly used events are −

- **data** − This event is fired when there is data is available to read.
- **end** − This event is fired when there is no more data to read.
- **error** − This event is fired when there is any error receiving or writing data.
- **finish** − This event is fired when all the data has been flushed to underlying system.- **

## Reading from a Stream
```
var fs = require("fs");
var data = '';

// Create a readable stream
var readerStream = fs.createReadStream('input.txt');

// Set the encoding to be utf8. 
readerStream.setEncoding('UTF8');

// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function() {
   console.log(data);
});

readerStream.on('error', function(err) {
   console.log(err.stack);
});

console.log("Program Ended");
```
## Writing to a Stream
```
var fs = require("fs");
var data = 'Simply Easy Learning';

// Create a writable stream
var writerStream = fs.createWriteStream('output.txt');

// Write the data to stream with encoding to be utf8
writerStream.write(data,'UTF8');

// Mark the end of file
writerStream.end();

// Handle stream events --> finish, and error
writerStream.on('finish', function() {
   console.log("Write completed.");
});

writerStream.on('error', function(err) {
   console.log(err.stack);
});

console.log("Program Ended");

```
## Piping the Streams
```
var fs = require("fs");

// Create a readable stream
var readerStream = fs.createReadStream('input.txt');

// Create a writable stream
var writerStream = fs.createWriteStream('output.txt');

// Pipe the read and write operations
// read input.txt and write data to output.txt
readerStream.pipe(writerStream);

console.log("Program Ended");
```
## Chaining the Streams
```
var fs = require("fs");
var zlib = require('zlib');

// Compress the file input.txt to input.txt.gz
fs.createReadStream('input.txt')
   .pipe(zlib.createGzip())
   .pipe(fs.createWriteStream('input.txt.gz'));
  
console.log("File Compressed.");
```
Decompresse file:

```
var fs = require("fs");
var zlib = require('zlib');

// Decompress the file input.txt.gz to input.txt
fs.createReadStream('input.txt.gz')
   .pipe(zlib.createGunzip())
   .pipe(fs.createWriteStream('input.txt'));
  
console.log("File Decompressed.");

```

# Node.js - File System
Imported by syntax
```
var fs = require("fs")
```
## Synchronous vs Asynchronous
```
var fs = require("fs");

// Asynchronous read
fs.readFile('input.txt', function (err, data) {
   if (err) {
      return console.error(err);
   }
   console.log("Asynchronous read: " + data.toString());
});

// Synchronous read
var data = fs.readFileSync('input.txt');
console.log("Synchronous read: " + data.toString());

console.log("Program Ended");
```
# Node.js - Global Objects
- __filename
- __dirname
- setTimeout(cb, ms)
- clearTimeout(t)
- setInterval(cb, ms)
- Global Objects
    - [Console](https://www.tutorialspoint.com/nodejs/nodejs_console.htm)
    - [Process](https://www.tutorialspoint.com/nodejs/nodejs_process.htm)

# Node.js - Utility Modules
- [OS Module](https://www.tutorialspoint.com/nodejs/nodejs_os_module.htm)
- [Path Module](https://www.tutorialspoint.com/nodejs/nodejs_path_module.htm)
- [Net Module](https://www.tutorialspoint.com/nodejs/nodejs_net_module.htm)
- [DNS Module](https://www.tutorialspoint.com/nodejs/nodejs_dns_module.htm)
- [Domain Module](https://www.tutorialspoint.com/nodejs/nodejs_domain_module.htm)

# Node.js - Web Module
## Web Application Architecture
![Web Architecture][web_architecture]

[web_architecture]: https://www.tutorialspoint.com/nodejs/images/web_architecture.jpg "Node.js Web Architecture"

- **Client** − This layer consists of web browsers, mobile browsers or applications which can make HTTP requests to the web server.
- **Server** − This layer has the Web server which can intercept the requests made by the clients and pass them the response.
- **Business** − This layer contains the application server which is utilized by the web server to do the required processing. This layer interacts with the data layer via the database or some external programs.
- **Data** − This layer contains the databases or any other source of data.

## Creating a Web Server using Node
server.js
```
var http = require('http');
var fs = require('fs');
var url = require('url');

// Create a server
http.createServer( function (request, response) {  
   // Parse the request containing file name
   var pathname = url.parse(request.url).pathname;
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
   
   // Read the requested file content from file system
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      } else {  
         //Page found     
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});    
         
         // Write the content of the file to response body
         response.write(data.toString());       
      }
      
      // Send the response body 
      response.end();
   });   
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
```
## Creating Web client using Node
client.js
```
var http = require('http');

// Options to be used by request 
var options = {
   host: 'localhost',
   port: '8081',
   path: '/index.htm'  
};

// Callback function is used to deal with response
var callback = function(response) {
   // Continuously update stream with data
   var body = '';
   response.on('data', function(data) {
      body += data;
   });
   
   response.on('end', function() {
      // Data received completely.
      console.log(body);
   });
}
// Make a request to the server
var req = http.request(options, callback);
req.end();
```

# Node.js - Express Framework
- Node.js web application framework
- Core features
    - Allows to set up middlewares to respond to HTTP Requests.
    - Defines a routing table which is used to perform different actions based on HTTP Method and URL.
    - Allows to dynamically render HTML Pages based on passing arguments to templates.

## Installing Express
Install in local and install important modules along with express:
- **body-parser** − This is a node.js middleware for handling JSON, Raw, Text and URL encoded form data.
- **cookie-parser** − Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
- **multer** − This is a node.js middleware for handling multipart/form-data.

```
npm install express --save
npm install body-parser --save
npm install cookie-parser --save
npm install multer --save
```

## Request & Response
- **[Request Object](https://www.tutorialspoint.com/nodejs/nodejs_request_object.htm)** − The request object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
- **[Response Object](https://www.tutorialspoint.com/nodejs/nodejs_response_object.htm)** − The response object represents the HTTP response that an Express app sends when it gets an HTTP request.

# Node.js - RESTful API
- REST stands for REpresentational State Transfer
- REST is web standards based architecture and uses HTTP Protocol

## HTTP methods
- **GET** − This is used to provide a read only access to a resource.
- **PUT** − This is used to create a new resource.
- **DELETE** − This is used to remove a resource.
- **POST** − This is used to update a existing resource or create a new resource.

# Node.js - Scaling Application
**child_process** module
- **exec** − child_process.exec method runs a command in a shell/console and buffers the output.
- **spawn** − child_process.spawn launches a new process with a given command.
- **fork** − The child_process.fork method is a special case of the spawn() to create child processes.

# Node.js - Packaging
## JXcore Installation
Step 1
```
wget https://s3.amazonaws.com/nodejx/jx_rh64.zip
```
Step 2
```
unzip jx_rh64.zip
cp jx_rh64/jx /usr/bin
```
Step 3
```
export PATH=$PATH:/usr/bin
```
Step 4
```
jx --version
```

## Ref
https://www.tutorialspoint.com/nodejs/nodejs_packaging.htm