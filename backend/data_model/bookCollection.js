const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookCollectionSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    collectionName : { 
        type:String,
        required:true
    },
    description :{
        type:String
    },
    author:{
        type:String
    },
    addedDate:{
        type:Date
    }
})

const bookCollection =  mongoose.model('bookcollection',bookCollectionSchema);

module.exports = bookCollection;

