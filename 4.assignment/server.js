var http = require('http');
var fs = require('fs')
var url = require('url')

//create server
http.createServer(function (request, response) {
    var url = request.url.split('/')
    var page = url[url.length - 1];
    switch (page) {
        case "index.html" :
            fs.readFile('site/index.html', function (error, data) {
                if (error) {
                    response.writeHead(200, {'Content-Type': 'text/html'})
                    response.write("File " + page + " does not exist.");
                    response.end()
                } else {
                    response.writeHead(200, {'Content-Type': 'text/html'})
                    response.write(data)
                    response.end()
                }
            })
            break;

        case "style.css" :
            fs.readFile('site/style.css', function (error, data) {

                    if (error) {
                        response.writeHead(200, {'Content-Type': 'text/css'})
                        response.write("File " + page + " does not exist.");
                        response.end()
                    } else {
                        response.writeHead(200, {'Content-Type': 'text/css'})
                        response.write(data)
                        response.end()
                    }
                }
            )
            break;
        default :
            fs.readFile('site/' + page, function (error, data) {

                if (error) {
                    response.writeHead(200, {'Content-Type': 'text/html'})
                    response.write("File " + page + " does not exist.");
                    response.end()
                } else {
                    response.writeHead(200, {'Content-Type': 'text/html'})
                    response.write(data)
                    response.end()
                }
            })
    }
}).listen(7777)

console.log('Server listening on port 7777 ...')