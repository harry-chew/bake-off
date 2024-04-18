const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cakeSchema = new Schema({
    baker : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
}, { timestamps : true });

const Cake = mongoose.model("Cake", cakeSchema);

module.exports = Cake;