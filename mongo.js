const http = require('http')
const { MongoClient, ServerApiVersion } = require("mongodb");
const hostname = "127.0.0.1";
const port = 4000;

let uri = 'mongodb://127.0.0.1:27017/'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
}
);


async function insert(name, shape, style) {

  const myDB = client.db("myDB");
  const myColl = myDB.collection("pizzaMenu");
  
  const doc = { 
    name: name,
    shape: shape,
    style: style
  };
  const result = await myColl.insertOne(doc);
console.log(
`A document was inserted with the _id: ${result.insertedId}`,
);
return result.insertedId;
}



async function run(data) {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();

      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

      await insert(data.name, data.shape, data.style);

    } catch (error) {
      //handle the error
      console.error(error);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  const server = http.createServer((req, res) => { 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');


    if(req.method === 'POST') {
      let body = '';

      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end',  () => {
        const parsedBody = JSON.parse(body);
         run(parsedBody).then(function(id) {
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ pizza: id}));
        });
      });
    } 
      res.end("Node server stuff");
  });

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`)
});

run().catch(console.dir);

