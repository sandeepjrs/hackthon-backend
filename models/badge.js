var mongoose = require('mongoose')
var Schema = mongoose.Schema;



var badgeSchema = new Schema({
    name : {type : String, required : true},
    image_link : {type : String, required : true},   

 });



 module.exports = mongoose.model('badge', badgeSchema)