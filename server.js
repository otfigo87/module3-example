require("dotenv").config(); //call and config dotenv package
const express = require("express");
const methodOverride = require('method-override')

const mongoose = require("mongoose");

const app = express();
const port = 3000;
//Data
// const fruits = require("./models/fruits");
const Fruit = require("./models/Fruit");

//! Configuration
app.set("view engine", "jsx");
app.engine("jsx", require("jsx-view-engine").createEngine());

//!Middleware
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});
//parses the data from the request
app.use(express.urlencoded({ extended: false }));
// override post using a query value to use DELETE method
app.use(methodOverride('_method'))
//!Routes
//!Index route: (list)
app.get("/fruits", (req, res) => {
  // res.send(fruits);
  // res.render("fruits/Index", { fruits: fruits });
  Fruit.find({}, (error, allFruits) => {
    res.render('fruits/Index', {fruits: allFruits});
  })
});

//!Post method route (accept data from the form)
app.post("/fruits", (req, res) => {
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true; //do some data correction
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false; //do some data correction
  }
  // fruits.push(req.body);
  Fruit.create(req.body, (error, createdFruit) => {
    // res.send(createdFruit);
    res.redirect("/fruits"); //send the user back to /fruits

  })
});

//!New route: (to return a form to create new fruit)
app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

//! Return edit form
app.get('/fruits/:id/edit', (req, res) => {
  Fruit.findById(req.params.id, (err, foundFruit) => {
    if(!err){
      res.render('fruits/Edit', {fruit: foundFruit});
    } else {
      res.send({msg: err.message})
    }
  })
})
//! Update the fruit => PUT
app.put('/fruits/:id', (req, res) => {
  if(req.body.readyToEat === 'on'){
    req.body.readyToEat = true
  }else {
    req.body.readyToEat = false
  }
  Fruit.findByIdAndUpdate(req.body.id, req.body, {new: true})
  .then(updatedFruit => {
    res.redirect(`/fruits/${req.params.id}`)
  })
  .catch(error => console.log(error))
})
//!Show route : (single item)
app.get("/fruits/:id", (req, res) => {
  // console.log(req.params);
  // res.send(fruits[req.params.index])
  // res.render("fruits/Show", { fruit: fruits[req.params.index] }); //second param inside render must be an object to pass it to the template
  Fruit.findById(req.params.id, (error, foundFruit) => {
    res.render('fruits/Show', {fruit: foundFruit})
  })
});

//!Delete
app.delete('/fruits/:id', (req, res) => {
  Fruit.findByIdAndRemove(req.params.id)
  .then(deleted => {
    res.redirect('/fruits')})
  .catch(error => console.log(error))
})

//!if none of the routes matches the request
app.get("*", (req, res) => {
  // res.redirect('/fruits')
  res.render("NotFound");
});

app.listen(port, (req, res) => {
  console.log(`Server listening on ${port}`);
  mongoose.set('strictQuery', true); // get rid of the warning
  // connect to mongoDB
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  mongoose.connection.once('open', () => console.log("connected to MongoDB"))
});
