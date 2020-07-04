"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
// const multer =require('multer');
const userRoute = express.Router();
const userCollection = require('./data_model/user');
const bookCollectionRoute = express.Router();
const bookCollection = require('./data_model/bookCollection');
const bookSeriesRoute = express.Router();
const bookSeries = require('./data_model/bookSeries');
const app = express();
const port = 5000



//Password Encryption- Using bcrypt hashing algorithm , JSON Web Token (JWT) Authentication
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY =  process.env.SECRET_KEY;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({limit:'50mb'}))
app.use(cors());
// app.use('/uploads',express.static('uploads'));

app.use('/userCollection',userRoute);
app.use('/bookCollection', bookCollectionRoute);
app.use('/bookSeries',bookSeriesRoute);

//Establishing MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/funmemoriesdb', {  useNewUrlParser: true });
const dbConnection = mongoose.connection;
dbConnection.once('open', () => {
    console.log("Mongodb started!")
});

userRoute.post('/register', ( req,res ) =>{
    userCollection.findOne({
        email:req.body.email
    }).then ((user) => {
        if (!user) {
            const userInfo = {
                userName : req.body.userName,
                password : req.body.password,
                nickName : req.body.nickName,
                email:  req.body.email,
                createdAt: new Date()
            }
            bcrypt.hash(req.body.password, 10, (err,hash)=>{
                if (err) throw err;
                userInfo.password = hash;
                userCollection.create(userInfo)
                .then( user =>{
                     res.status(200).json({ status:"User Registration complete!!",user})
                 })
                .catch((err)=>{
                    res.status(err).send("Error:" + err)
                })
            })
        } else {
            res.status(400).json({error:' Email already exist! Please register with different email'})
        }
    })
})

// User Login Process
    userRoute.post('/login', (req,res) =>{
        userCollection.findOne({
            userName:req.body.userName
        })
        .then((user) => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload={
                        id:user._id,
                        userName:user.userName,
                        nickName:user.nickName
                    }
                    jwt.sign(payload, SECRET_KEY, {
                        expiresIn: 86400 
                      },(err,token)=>{
                          res.json(token)
                      })
                }else{
                     res.status(400).json({status: "Password Incorrect"})
                }
            }
        })
    });
    userRoute.get('/landing',(req,res) => {
        let token = req.headers['authorization']
        let decoded = jwt.verify(token,SECRET_KEY) 
        userCollection.findOne({_id:decoded.id})
        .then((user) =>{
                bookCollection.find({userId:decoded.id})
                .then(collections=>{
                    res.json({user:user,collections:collections})
                })
                .catch(err=>{
                    res.send("Error" + err)
                })                                                      
        })
        .catch(err =>{
            res.send("Error" + err)
        })   
    })
    bookCollectionRoute.post('/addCollection',(req, res)=> {
        bookCollection.findOne({_id:req.body.userId})
        .then((collection) =>{
            if(!collection){
                let newCollection = {
                    userId:req.body.userId,
                    title:req.body.title.toLowerCase(),
                    description:req.body.description.toLowerCase(),
                    author:req.body.author.toLowerCase(),
                    category:req.body.category.toLowerCase(),
                    image:req.body.image,
                    comments:req.body.comments.toLowerCase(),
                    addedDate: new Date()
                    }
                bookCollection.create(newCollection)
                .then(newCollection => {
                    console.log("Success")
                    res.status(200).json({'Collection': newCollection});
                })
                .catch(error => {
                    console.log("Failure")
                    res.status(400).send('Error, cannot add the collection to the database');
                });
            }
            else{
                res.status(400).json({error:' Collection already exist! Please add books to the existing collection'})
            }
        })
    .catch(err =>{
        console.log(err)
        res.send("Error" + err)
    })   
})
bookCollectionRoute.get('/series/:id',(req, res)=> {
    bookSeries.find({collectionId:req.params.id})
    .then((books) =>{
        res.status(200).json({'Books': books}); 
    })
    .catch(err =>{
        res.send("Error" + err)
    })   
})
    
    
bookSeriesRoute.post('/addBook',(req, res)=> {
    bookCollection.findOne({_id:req.body.collectionId})
    .then((collection)=>{
        let newBook = {
            collectionId:req.body.collectionId,
            title:req.body.title.toLowerCase(),
            giftBy:req.body.giftBy.toLowerCase(),
            startedReading:req.body.startedReading,
            finishedReading:req.body.finishedReading,
            comments:req.body.comments,
            image:req.body.image,
            addedDate: new Date()
        };
        bookSeries.create(newBook)
        .then(newBook => {
            console.log(newBook)
            res.status(200).json({'Book': newBook});
        })
        .catch(error => {
            console.log(error)
            res.status(400).send('Error, cannot add the book to the collection');
        });
    })
    .catch(err =>{
        res.send("Error" + err)
    })        
}) 
bookSeriesRoute.get('/book/:id',(req, res)=> {
    bookSeries.findOne({_id:req.params.id},(err,book) =>{
        if(!book){
            res.status(400).send('Error, cannot find the book ');
        }
        else{
            res.status(200).json({'Book': book});
        }
    })
})
      
bookSeriesRoute.post('/updateBook/:id',(req,res) => {
    bookSeries.findOne({_id:req.params.id}, (err ,book) =>{
        if(!book){
            res.send("Book not found"+err)
        }
        else{
             bookSeries.updateOne({_id:req.params.id},
                { $set:{
                    title: req.body.title.toLowerCase(),
                    giftBy:req.body.giftBy.toLowerCase(),
                    startedReading:req.body.startedReading,
                    finishedReading:req.body.finishedReading,
                    comments:req.body.comments,
                    image:req.body.image,
                }
                })
                .then((book)=>{
                    console.log(book)
                    res.status(200).json("Successfully Updated the book");
                })
                .catch((err)=>{
                    console.log(err)
                })
                
            }
        })                                        
    })  

bookSeriesRoute.post('/deleteBook/:id',(req,res) => {
    console.log(req.params.id)
    bookSeries.deleteOne({_id:req.params.id}, (err ,result) =>{
        if(!result){
            console.log(err)
            res.send("Book not found"+ err)
        }
        else{
                console.log(result)
                res.json({"Successfully deleted the book":result});
            }
        })                                        
    })  



app.get('/', (req,res)=>{
    res.send("Hello from server")
});
app.get('/register', (req,res)=>{
    res.send("Hello from server, Register Now")
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
});