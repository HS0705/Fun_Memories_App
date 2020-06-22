const mongoose = require('mongoose');
const Schema = mongoose.Schema;;

let bookSeriesSchema =new Schema({
    collectionId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    addedDate:{
        type:Date
    }
})

const bookSeries =  mongoose.model('bookseries',bookSeriesSchema);

module.exports =  bookSeries;