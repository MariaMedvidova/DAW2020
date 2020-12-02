var http = require('http')
var url = require('url')
var fs = require('fs')
var pug = require('pug')
var jsonfile = require('jsonfile')
var {parse} = require('querystring')
var myBD = "toDoLists.json"

var myServer = http.createServer((request, response) => {
    var parseUrl = url.parse(request.url, true)
    var action = parseUrl.pathname.split("/")[1]; // this will be delete or update
    var id = parseUrl.pathname.split("/")[2]; // this will be id
    console.log(request.method + ' ' + parseUrl.pathname)

    if (request.method == 'GET') {
        if (parseUrl.pathname == '/') {
            showIndex(response)
        } else if (parseUrl.pathname == '/w3.css') {
            response.writeHead(200, {'Content-Type': 'text/css'})
            fs.readFile('w3.css', (error, data) => {
                if (error) response.write("<p>Error: " + error + "</p>")
                else response.write(data)
                response.end()
            })
        } else if (parseUrl.pathname == '/helpAction.js') {
            response.writeHead(200, {'Content-Type': 'text/css'})
            fs.readFile('helpAction.js', (error, data) => {
                if (error) response.write("<p>Error: " + error + "</p>")
                else response.write(data)
                response.end()
            })
        } else if(action == 'delete') {
            jsonfile.readFile(myBD, (error, tasks) => {
                if (!error) {
                    tasks = tasks.filter((task) =>
                    { return task.id.toString() !== id.toString() });

                    jsonfile.writeFile(myBD, tasks, error => {
                        if (error)
                            console.log(error)
                        else
                            console.log('Task successfully deleted ...')
                        showIndex(response)
                    })
                }
            })
        } else if(action == 'update') {
            jsonfile.readFile(myBD, (error, tasks) => {
                if (!error) {
                    for (var i = 0; i < tasks.length; i++){
                        var task = tasks[i]; // one object
                        if (task.id == id){
                            task.done = true;
                        }
                    }
                    jsonfile.writeFile(myBD, tasks, error => {
                        if (error)
                            console.log(error)
                        else
                            console.log('Task successfully updated ...')
                        showIndex(response)
                    })
                }
            })

        }
        else {   // GET request not supported
            showError(response, request.method + ' com \'' + parseUrl.pathname + "\'")
        }

    } else if (request.method == 'POST') {
        // To insert a new task
        if (parseUrl.pathname == '/task') {
            loadInfo(request, result => {
                jsonfile.readFile(myBD, (error, task) => {
                    if (!error) {

                        //create ID of new task
                        result.id= Object.keys(task).length + 1;
                        result.done= false;
                        task.push(result)

                        jsonfile.writeFile(myBD, task, error => {
                            if (error)
                                console.log(error)
                            else
                                console.log('Task successfully saved ...')
                            showIndex(response)
                        })
                    }
                })
            })
        }
        else {     // PUT request not supported
            showError(response, request.method + ' com \'' + parseUrl.pathname + "\'")
        }
    } else {
        showError(response, request.method)
    }
})
myServer.listen(7779)
console.log('Server listening on port 7779 ...')

// Function responsible for presenting an error
function showError(response, error) {
    response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    response.write("<p>" + error.method + " not supported in this service. Error: </p>" + error)
    response.end()
}

// Function that displays the index
function showIndex(response) {
    jsonfile.readFile(myBD, (error, task) => {
        // if you are unable to load the database
        if (error) {
            console.log("File json does not exist! To be created ..")
            jsonFile.writeFile(myBD, [])
        }

        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
        response.write(pug.renderFile('index.pug', {list: task}))
        response.end()
    })
}

function loadInfo(request, callback) {
    if (request.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', () => {
            callback(parse(body))
        })
    }
}