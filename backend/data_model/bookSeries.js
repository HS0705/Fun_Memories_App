const mongoose = require('mongoose');
const Schema = mongoose.Schema;;

let bookSeriesSchema =new Schema({
    collectionId:{
        type:String,
        required:true
    },
    collectionName:{
        type:String,
        required:true
    },
    category:{
        type:String
    },
    title:{
        type:String,
        required:true
    },
    giftBy:{
        type:String
    },
    startedReading:{
        type:Date
    },
    finishedReading:{
        type:Date
    },
    comments:{
        type:String
    },
    image:{
        type:String
    },
    addedDate:{
        type:Date
    }
})

const bookSeries =  mongoose.model('bookseries',bookSeriesSchema);

module.exports =  bookSeries;