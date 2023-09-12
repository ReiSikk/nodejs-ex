const http = require('http')

const hostname = "127.0.0.1";
const port = 4000;

let uri = 'mongodb://localhost:27017'

const server = http.createServer((req, res) => { 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Node server stuff");
});

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`)
});