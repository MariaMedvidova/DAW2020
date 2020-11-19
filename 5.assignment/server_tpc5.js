var http = require('http')
var axios = require('axios')

http.createServer(function (request, response) {
    console.log(request.method + ' ' + request.url)
    var url = request.url; //this will be /student/id
    var id = url.split("/")[2]; // this will be id
    console.log(id)

    if (request.method == 'GET') {
        if (request.url == '/') {
            response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8;'})
            response.write('<body style="background-color:lightgray;">');
            response.write('<h1 style="text-align:center;">Music school </h1>')
            response.write('<h3 style="text-align:center;"><a href="/alunos">List of Students </a> </h3>')
            response.write('<h3 style="text-align:center;"><a href="/cursos">List of Courses </a> </h3>')
            response.write('<h3 style="text-align:center;"><a href="/instrumentos">List of Instruments </a> </h3>')
            response.write('</body>');
            response.end()
        } else if (request.url == '/alunos') {
            axios.get('http://localhost:3000/alunos')
                .then(resp => {
                    alunos = resp.data;
                    response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8;'})
                    response.write('<body style="background-color:lightgray;">');
                    response.write('<address>[<a href="/">Back </a>]</adress>')
                    response.write('<h2>Music school: List of Students</h2>')
                    response.write('<ul>')
                    alunos.forEach(a => {
                        response.write('<li><a href="/alunos/' + a.id + '">' + a.id + ' - ' + a.nome + '</a></li>')
                    });
                    response.write('</ul>')
                    response.write('</body>');
                    response.end()
                })
                .catch(function (error) {
                    console.log('Error in obtaining the list of students: ' + error);
                })
        } else if(typeof id !== "undefined"){
            axios.get('http://localhost:3000/alunos/'+id)
                .then(resp => {
                    alunos = resp.data;
                    response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8;'})
                    response.write('<body style="background-color:lightgray;">');
                    response.write('<address>[<a href="/alunos">Back </a>]</adress>')
                    response.write('<h2>Music school: Student</h2>')
                    response.write('<ul>')
                    response.write('<li>Student ID: ' + alunos.id + '</li>');
                    response.write('<li>Name: ' + alunos.nome + '</li>');
                    response.write('<li>Date of born: ' + alunos.dataNasc + '</li>');
                    response.write('<li>Course: ' + alunos.curso + '</li>');
                    response.write('<li>Year: ' + alunos.anoCurso + '</li>');
                    response.write('<li>Instrument: ' + alunos.instrumento + '</li>');
                    response.write('</ul>')
                    response.write('</body>');
                    response.end()
                })
                .catch(function (error) {
                    console.log('Error in obtaining the list of students: ' + error);
                })
        }

        else if (request.url == '/cursos') {
            axios.get('http://localhost:3000/cursos')
                .then(resp => {
                    alunos = resp.data;
                    response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8;'})
                    response.write('<body style="background-color:lightgray;">');
                    response.write('<address>[<a href="/">Back </a>]</adress>')
                    response.write('<h2>Music school: List of Courses</h2>')
                    response.write('<ul>')
                    alunos.forEach(a => {
                        response.write('<li>' + a.id + ' - ' + a.designacao + '</li>')
                    });
                    response.write('</ul>')
                    response.write('</body>');
                    response.end()
                })
                .catch(function (error) {
                    console.log('Error in obtaining the list of students: ' + error);
                })
        }else if (request.url == '/instrumentos') {
            axios.get('http://localhost:3000/instrumentos')
                .then(resp => {
                    alunos = resp.data;
                    response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8;'})
                    response.write('<body style="background-color:lightgray;">');
                    response.write('<address>[<a href="/">Back </a>]</adress>')
                    response.write('<h2>Music school: List of Instruments</h2>')
                    response.write('<ul>')
                    alunos.forEach(a => {
                        response.write('<li>' + a.id + '</li>')

                    });
                    response.write('</ul>')
                    response.write('</body>');
                    response.end()
                })
                .catch(function (error) {
                    console.log('Error in obtaining the list of students: ' + error);
                })
        } else {
            response.writeHead (200, {'Content-Type': 'text/html'})
            response.write ("<p> Request not supported:" + request.method + "" + request.url + "</p>")
            response.end ()
        }
    } else {
        response.writeHead (200, {'Content-Type': 'text/html'})
        response.write ("<p> Request not supported:" + request.method + "" + request.url + "</p>")
        response.end ()
    }
}).listen(4000)

console.log('Server listening on port 4000 ...')

