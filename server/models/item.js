/**
 * Created by work on 11/2/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: {
        type: String,
        require: true,
        index: {unique: true}
    },
    price: Number,
    quantity: Number,
    location: String
});

module.exports = mongoose.model('Item', ItemSchema);