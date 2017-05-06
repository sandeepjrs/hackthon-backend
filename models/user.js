var mongoose = require('mongoose')
var Schema = mongoose.Schema;



var userSchema = new Schema({
    username : {type : String, required : true, unique : true},
    name : {type : String, required : true},
    password : {type : String, required : true},
    age : {type : Number},
    dob : {type : Date},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    },
    mobile : {type:Number},
    weight : {type : Number}

 });

 userSchema.statics.id_ext = function id_ext(id, cb){

    console.log("entering to user");
    this.findById({_id : id}, function(err, docs){
        console.log(docs);
        console.log(err);
        // this.find({_id : id}, function(err, docs){})
    });

}

 module.exports = mongoose.model('user', userSchema)