const express = require('express')
const app = express() // by calling express() we're creating instance of express. We can create as many as we want and run each app at different port. 
const port = 3000 // which port the backend server will run on.
app.use(express.json());


// we're using app.get(), this is going to be GET request at /.
// notice second argument to get(). first arg is the path i.e / and second arg is a arrow function or normal function, which is taking two arguments.
// req (request object) and res (response object).
// using req object - we can access all the data that's sent from the client, browser or any device accessing this server.
// for ex. req.params will access URL Parameters, req.query will access query strings, req.body will access any POST data sent from client.
// using req object you can know the clients public IP address, host and many details of the client device

// using res object - this object is to respond to the client.
// res.send({ name: 'luna' }). this will send JSON object to the client, you can send any type of data here.
// res.status(404) - for ex. this will send 404 error code. based on some condition you will send status codes. https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
// res.json({ name: 'luna' }), this will send JSON type, including object, array, string, Boolean, number, or null
app.get('/', (req, res) => {
  res.send('Hello World!') // we're just responding with 'Hello World!', whenever client makes GET request at /
})


// to create POST endpoint we use app.post()
app.post('/', (req, res) => {
  res.send('This is post request!') // we're responding with 'This is post request!' whenever client makes POST request at /
})

// notice one thing we're using the same path for creating GET and POST endpoints, you can do DELETE, PUT, and any other http request type for the same endpoint/path.


// GET requests for get all the chocolates
app.get('/chocolates', (req, res) => {
  let chocolates = ['Cadbury', 'Amul', 'Ferrero', 'Hershey', 'Nestle']; // this is just local data, in real application we will query database and store in a variable

  res.send(chocolates) // just send the array to client
})

// say you want only chocolate at some array index. here :chocoID is called URL parameter because itll be there in the URL.
// when client requesting they've to make GET request like "/chocolates/2" in client side.
// in backend we will use req.params.chocoID to access number 2.
// we use query strings, URL params to send data from client to server using GET type **IMPORTANT**

app.get('/chocolates/:chocoID', (req, res) => {
  let chocoID = req.params.chocoID; // accessing URL param.
  let chocolates = ['Cadbury', 'Amul', 'Ferrero', 'Hershey', 'Nestle']; // this is just local data, in real application we will query database and store in a variable

  res.send(chocolates[chocoID]) // just send the choco name at the index to client
})

// notice here ive created /chocolates and /chocolates/:chocoID two different endpoints with GET type. these two are different.
// /chocolates will go to first 
// /chocolates/1 will go to second.
// we don't create extra endpoint to access query strings. you can just use req.query. with any http type can access query strings. **IMPORTANT** 

// for example, if client makes GET request to /chocolate like /chocolate?name=sun
// notice name=sun is query string. which we can access like req.query.name in /chocolate endpoint. 

// now you know we can send data from client to server via query strings or URL parameter. but there's a limit we can't send huge data from client like JSON object or say upload image etc via GET
// this is where POST comes into picture.

// say if a user makes POST request to /getSum and sends a request body JSON object like { numbers: [1, 2, 3, 4, 5] }
app.post('/getSum', (req, res) => {
  let numbers = req.body.numbers; // we can access it this way.
  let sum = numbers.reduce((a, i) => a + i, 0); // calculating sum
  res.json(sum) // responding with sum.
})


// we call app.listen then pass the port number. itll start the server.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})