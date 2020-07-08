const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookCollectionSchema = new Schema({
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
    author:{
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

const bookCollection =  mongoose.model('bookcollection',bookCollectionSchema);

module.exports = bookCollection;

