const mongoose = require('mongoose');
const Schema = mongoose.Schema;;

let toySeriesSchema =new Schema({
    collectionId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    giftBy:{
        type:String
    },
    date:{
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

const toySeries =  mongoose.model('toyseries',toySeriesSchema);

module.exports =  toySeries;