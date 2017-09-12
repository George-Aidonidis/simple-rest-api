'use strict';

const Mongoose = require('../db').Mongoose;

const contactSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

module.exports = Mongoose.model('Contact', contactSchema, 'contact');