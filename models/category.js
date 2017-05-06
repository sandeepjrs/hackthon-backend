var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var SubCategory = require('./subcategory');
var Company = require('./company')

var CategorySchema = new Schema({
    category_name : String,
    subCategories : [{
        type: Schema.Types.ObjectId,
        ref: SubCategory
    }],
    company_id : { type: Schema.Types.ObjectId, ref  : Company}
 });

 module.exports = mongoose.model('Category', CategorySchema)