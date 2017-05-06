var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Item = require('./item');
var Category = require('./category')


var subCategorySchema = new Schema({
    sub_category_name : String,
    items : [{
        type: Schema.Types.ObjectId,
        ref: Item
    }],
     category_id : { type: Schema.Types.ObjectId, ref  : Category}
 });

 module.exports = mongoose.model('SubCategory', subCategorySchema)