const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Sauce', sauceSchema);