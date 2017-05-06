var mongoose = require('mongoose')
var Schema = mongoose.Schema;



var userSchema = new Schema({
    name : {type : String, required : true},
    password : {type : String, required : true},
    age : {type : Number, required : true},
    gender : {type : Number, required : true},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required : true
    },
    mobile : {type:Number},
    weight : {type : Number, required : true}
    // parameter : []

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