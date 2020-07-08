const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let toyCollectionSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    title : { 
        type:String,
        required:true
    },
    description :{
        type:String
    },
    brand:{
        type:String
    },
    category:{
        type:String
    },
    image:{
        type: String
    },
    comments:{
        type:String
    },
    addedDate:{
        type:Date
    },
    modifiedDate:{
        type:Date
    }
})

const toyCollection =  mongoose.model('toycollection',toyCollectionSchema);

module.exports = toyCollection;

