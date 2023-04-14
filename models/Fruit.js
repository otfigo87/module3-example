const mongoose = require('mongoose');

//Schema
const fruitSchema = mongoose.Schema({
    name: {type: String, required: true},
    color: {type: String, required: true},
    readyToEat: Boolean
})

//Mongoose Model that have methods we are going to use
const Fruit = mongoose.model('Fruit', fruitSchema)

module.exports = Fruit;