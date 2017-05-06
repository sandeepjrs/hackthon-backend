var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Category = require('./category');

var CompanySchema = new Schema({
    comapny_name : String,
    categories : [{
        type: Schema.Types.ObjectId,
        ref: Category
    }]
 });

 CompanySchema.statics.id_ext = function id_ext(id, cb){

    console.log("entering to company");
    this.findById({_id : id}, function(err, docs){
        console.log(docs);
        console.log(err);
        // this.find({_id : id}, function(err, docs){})
    });

}

 module.exports = mongoose.model('Menu', CompanySchema)