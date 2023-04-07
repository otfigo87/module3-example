const express = require('express');
const app = express();
const port = 3000;
//Data
const fruits = require('./models/fruits');

//! Configuration
app.set('view engine', 'jsx');
app.engine('jsx', require('jsx-view-engine').createEngine());

//!Middleware
app.use((req, res, next) => {
  console.log('I run for all routes')
  next()
})
//parses the data from the request
app.use(express.urlencoded({ extended: false }))
//!Routes
//Index route: (list)
app.get('/fruits', (req, res) => {
    // res.send(fruits);
    res.render("Index", {fruits: fruits});
})

//Post method route (accept data from the form)
app.post("/fruits", (req, res) => {
  if (req.body.readyToEat === "on") {//if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true; //do some data correction
  } else { //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false; //do some data correction
  }
  fruits.push(req.body);
  console.log(fruits);
  res.redirect('/fruits'); //send the user back to /fruits
});

//New route: (to return a form to create new fruit)
app.get('/fruits/new', (req, res) => {
  res.render("New")
})
//Show route : (single item)
app.get('/fruits/:index', (req,res) => {
    console.log(req.params)
    // res.send(fruits[req.params.index])
    res.render('Show', {fruit: fruits[req.params.index]}) //second param inside render must be an object to pass it to the template
})

//if none of the routes matches the request
app.get('*', (req, res) => {
  // res.redirect('/fruits')
  res.render('NotFound')
})




app.listen(port, (req, res) => {
    console.log(`Server listening on ${port}`);
})