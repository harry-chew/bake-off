const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    userId : {
        type : String,
        required : true
    },
    cakeName : {
        type : String,
        required : true
    },
    cakeId : {
        type : String,
        required : true
    },
    taste : {
        type : Number,
        required : true
    },
    look : {
        type : Number,
        required : true
    },
    feel : {
        type : Number,
        required : true
    }
}, { timestamps : true });

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;