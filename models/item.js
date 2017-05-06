var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var SubCategory = require('./subcategory')

var itemSchema = new Schema({
    item : String,
    price : Number,
    currency : String,    
    subCategory_id : { type: Schema.Types.ObjectId, ref  : SubCategory}
});

module.exports = mongoose.model('Item', itemSchema)