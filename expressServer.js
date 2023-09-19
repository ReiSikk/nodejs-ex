const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Listen for GET requests
app.get('/destinations/:destinationId', (req, res) => {
    //it knows what the id is because of the :id on the line above
    console.log(req.params.destinationId);
    res.status(200).send("You requested a destination with the id of " + req.params.destinationId);
})
app.get('/destinations/', (req, res) => {
    res.status(200).send("You requested a destination");
    })

//Listen for POST requests
app.post('/destinations/', (req, res) => {
    console.log(req.body);
    res.status(201).send("Created a destination");
  })

//Listen for PUT requests
app.put('/destinations/:destinationId', (req, res) => {
    console.log(req.params.destinationId);
    res.status(200).send("Updated a destination");
  })

  //Listen for DELETE requests
  app.delete('/destinations/:destinationId', (req, res) => {
    res.status(204).end();
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

