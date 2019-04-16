const mongoose = require('mongoose');
const db = require('../../config/db');

console.log(mongoose);

// var CatSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     }
// })
// var Cat = mongoose.model('Cat', CatSchema);
// var cat = new Cat();
// cat.save(function(err) {
//     assert.equal(err.errors['name'].meassage, 'Path `name` is required.');

//     error = cat.validateSync();
//     assert.equal(err.errors['name'].meassage, 'Path `name` is required.');
// });

// ================================================================================

// var TankSchema = new mongoose.Schema({
//     size: String
// });

// var Tank = mongoose.model('Tank', TankSchema);
// var small = new Tank({size: 'small'});

// small.save(function(err) {
//     if (err) return handleError(err);
//     // saved!
// });

// Tank.create({size: 'small2'}, function(err, small){
//     if (err) return handleError(err);
//     console.log(small);
// });

// or, for inserting large batches of documents
// Tank.insertMany([{ size: 'small1' },{ size: 'small3' },{ size: 'small4' }], function(err, smalls) {
//     if (err) return handleError(err);
//     console.log(smalls);
// });

// ================================================================================

var animalSchema = new mongoose.Schema({
    name: String,
    type: String,
    tags: { type: [String], index: true } // field level
});

animalSchema.index({ name: 1, type: -1 });

animalSchema.methods.findSimilarTypes = function(cb) {
    return this.model('Animal').find({ type: this.type }, cb);
}

animalSchema.statics.findByName = function(name, cb) {
    return this.find({ name: new RegExp(name, 'i') }, cb);
}

animalSchema.query.byName = function(name) {
    return this.where({ name: new RegExp(name, 'i') });
}

var Animal = mongoose.model('Animal', animalSchema);
var dog = new Animal({ type: 'cat' });

dog.findSimilarTypes(function(err, dogs) {
    // console.log(dogs); //woof
});

Animal.findByName('milu', function(err, animals) {
    // console.log(animals);
});

Animal.find().byName('milu').exec(function(err, animals) {
    // console.log(animals);
});

Animal.findOne().byName('Kitty').exec(function(err, animal) {
    // console.log(animal);
});

// ================================================================================

var personSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    }
});

personSchema.virtual('fullName').get(function() {
    return this.name.first + ' ' + this.name.last;
}).set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
});

var Person = mongoose.model('Person', personSchema);
var axl = new Person({
    name: { first: 'Axl', last: 'Rose' }
});

axl.fullName = 'mafia ozawas';

// console.log(axl.name.first + ' ' + axl.name.last); // Axl Rose
// console.log(axl.fullName);
