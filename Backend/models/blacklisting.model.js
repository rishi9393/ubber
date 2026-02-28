const mongoose = require('mongoose');

const blackListingSchema = new mongoose.Schema({
 token: {
  type: String,
  required: true,   
  unique: true
 },
 createdAt:{
    type: Date,
    default: Date.now,
    expires: 86400,
    required: true,
 }
});

module.exports = mongoose.model('BlackListing', blackListingSchema);