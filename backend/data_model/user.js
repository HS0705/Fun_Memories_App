const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userName:{
        type:String, 
        required: true,
        index: { unique: true }
    },
    password:{
        type:String, 
        required: true
    },
    nickName: {
        type:String, 
        required: true

    },
    email: {
        type:String, 
        required: true
    },
    createdAt:{
        type:Date
    }
})

const userCollection =  mongoose.model('usercollection',userSchema);

module.exports = userCollection;

