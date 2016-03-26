var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var codesessionSchema = new Schema({
  dateCreated: {type: Date, default: Date.now()},
  dateUpdated: {type: Date, default: Date.now()},
  name: {type: String},
  language: {type: String},
  typedData: {type: String}
})

var Codesession = mongoose.model('Codesession', codesessionSchema);
module.exports = Codesession;
