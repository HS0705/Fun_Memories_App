"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const userRoute = express.Router();
const userCollection = require('./data_model/user');
const bookCollectionRoute = express.Router();
const bookCollection = require('./data_model/bookCollection');
const bookSeriesRoute = express.Router();
const bookSeries = require('./data_model/bookSeries');
const toyCollectionRoute = express.Router();
const toyCollection = require('./data_model/toyCollection');
const toySeriesRoute = express.Router();
const toySeries = require('./data_model/toySeries');

const app = express();
const port = 5000



//Password Encryption- Using bcrypt hashing algorithm , JSON Web Token (JWT) Authentication
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY =  process.env.SECRET_KEY;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({limit:'50mb'}))
app.use(cors());

app.use('/userCollection',userRoute);
app.use('/bookCollection', bookCollectionRoute);
app.use('/bookSeries',bookSeriesRoute);
app.use('/toyCollection', toyCollectionRoute);
app.use('/toySeries',toySeriesRoute);

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

// User Landing Page
    userRoute.get('/landing',(req,res) => {
        let token = req.headers['authorization']
        let decoded = jwt.verify(token,SECRET_KEY) 
        var queries= [
            userCollection.find({_id:decoded.id}),
            bookCollection.find({userId:decoded.id}),
            toyCollection.find({userId:decoded.id})
        ];
        Promise.all(queries)
        .then(results => {
            if (!results[0]) {
              console.log("Error in User not found");
              return; 
            } else if (!results[1]) {
              console.log("No book collection found");
              return; 
            }else if (!results[2]){
                console.log("No toy collection found");
              return; 
            }
            let userData = results[0];
            let booksData = results[1];
            let toysData= results[2];
            res.json({ 
                user : userData,
                books: booksData,
                toys: toysData
             });
        })
        .catch(err =>{
            res.send("Error" + err)
        })   
                
    })
//Book Collection
    //Add Book Collection
    bookCollectionRoute.post('/addCollection',(req, res)=> {
        bookCollection.findOne({_id:req.body.userId})
        .then((user) =>{
            bookCollection.findOne({title:req.body.title.toLowerCase()})
            .then((result) => {
                if(!result) {
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
                        res.status(200).json({'BookCollection': newCollection});
                    })
                    .catch(error => {
                        res.send({Error:' cannot add the book collection to the database'});
                    });
                
            }
            else{
                res.status(401).json('Collection already exist! Please add books to the existing collection')
            }
            })
        .catch(err =>{
            res.send("Error" + err)
            })   
        })
        .catch(err =>{
            res.send("Error" + err)
            }) 
    })

    //get specific book collection 
    bookCollectionRoute.get('/series/:id',(req, res)=> {
        bookSeries.find({collectionId:req.params.id})
        .then((books) =>{
            res.status(200).json({'Books': books}); 
        })
        .catch(err =>{
            res.send("Error" + err)
        })   
    })
    
    //add book to the specific book collection
    bookSeriesRoute.post('/addBook',(req, res)=> {
        bookCollection.findOne({_id:req.body.collectionId})
        .then((collection)=>{
            let newBook = {
                collectionId:req.body.collectionId,
                collectionName:req.body.collectionName,
                category:req.body.category,
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
                res.status(200).json({'Book': newBook});
            })
            .catch(error => {
                res.status(400).json('Error, cannot add the book to the collection');
            });
        })
        .catch(err =>{
            res.send("Error" + err)
        })        
    }) 
    //Get specific book
    bookSeriesRoute.get('/book/:id',(req, res)=> {
        bookSeries.findOne({_id:req.params.id},(err,book) =>{
            if(!book){
                res.status(400).json('Error, cannot find the book ');
            }
            else{
                res.status(200).json({'Book': book});
            }
        })
    })
    
    //Update Specific book
    bookSeriesRoute.post('/updateBook/:id',(req,res) => {
    bookSeries.findOne({_id:req.params.id}, (err ,book) =>{
        if(!book){
            res.json("Book not found")
        }
        else{
             bookSeries.updateOne({_id:req.params.id},
                { $set:{
                    collectionName:req.body.collectionName,
                    category:req.body.category,
                    title: req.body.title.toLowerCase(),
                    giftBy:req.body.giftBy.toLowerCase(),
                    startedReading:req.body.startedReading,
                    finishedReading:req.body.finishedReading,
                    comments:req.body.comments,
                    image:req.body.image,
                }
                })
                .then((book)=>{
                    res.status(200).json("Successfully Updated the book");
                })
                .catch((err)=>{
                    res.send(err)
                })
                
            }
        })                                        
    })  

    //Delete specific book
    bookSeriesRoute.post('/deleteBook/:id',(req,res) => {
        bookSeries.deleteOne({_id:req.params.id}, (err ,result) =>{
            if(!result){
                res.send("Book not found")
            }
            else{
                    res.json("Successfully deleted the book");
                }
            })                                        
        })  

//Toy Collection
    //Add Toy Collection
    toyCollectionRoute.post('/addToyCollection',(req, res)=> {
        toyCollection.findOne({_id:req.body.userId})
        .then((user) =>{
            toyCollection.findOne({title:req.body.title.toLowerCase()})
            .then((result)=>{
            if(!result){
                let newCollection = {
                    userId:req.body.userId,
                    title:req.body.title.toLowerCase(),
                    description:req.body.description.toLowerCase(),
                    brand:req.body.brand.toLowerCase(),
                    category:req.body.category.toLowerCase(),
                    image:req.body.image,
                    comments:req.body.comments.toLowerCase(),
                    addedDate: new Date()
                    }
                toyCollection.create(newCollection)
                .then(newCollection => {
                    res.status(200).json({'ToyCollection': newCollection});
                })
                .catch(error => {
                    res.status(400).json('Error, cannot add the toy collection to the database');
                });
            }
            else{
                res.status(400).json(' Collection already exist! Please add toys to the existing collection')
            }
        })
        .catch(err =>{
            res.send("Error" + err)
            })   
    })
    .catch(err =>{
        res.send("Error" + err)
        }) 
    })
    //get specific toy collection 
    toyCollectionRoute.get('/series/:id',(req, res)=> {
        console.log(req.body)
        toySeries.find({collectionId:req.params.id})
        .then((toys) =>{
            res.status(200).json({'Toys': toys}); 
        })
        .catch(err =>{
            res.send("Error" + err)
        })   
    })

    //add toy to the specific toy collection
    toySeriesRoute.post('/addToy',(req, res)=> {
        toyCollection.findOne({_id:req.body.collectionId})
        .then((collection)=>{
            let newToy = {
                collectionId:req.body.collectionId,
                collectionName:req.body.collectionName,
                category:req.body.category,
                title:req.body.title.toLowerCase(),
                giftBy:req.body.giftBy.toLowerCase(),
                date:req.body.date,
                comments:req.body.comments,
                image:req.body.image,
                addedDate: new Date()
            };
            toySeries.create(newToy)
            .then(newBook => {
                res.status(200).json({'Toy': newToy});
            })
            .catch(error => {
                res.status(400).send('Error, cannot add the toy to the  toy collection');
            });
        })
        .catch(err =>{
            res.send("Error" + err)
        })        
    }) 

    //Update Specific Toy
    toySeriesRoute.post('/updateToy/:id',(req,res) => {
        toySeries.findOne({_id:req.params.id}, (err ,toy) =>{
            if(!toy){
                res.send("Toy not found"+err)
            }
            else{
                 toySeries.updateOne({_id:req.params.id},
                    { $set:{
                        collectionName:req.body.collectionName,
                        category:req.body.category,
                        title: req.body.title.toLowerCase(),
                        giftBy:req.body.giftBy.toLowerCase(),
                        date:req.body.date,
                        comments:req.body.comments,
                        image:req.body.image,
                    }
                    })
                    .then((toy)=>{
                        res.status(200).json("Successfully Updated the Toy");
                    })
                    .catch((err)=>{
                        res.send(err)
                    })
                    
                }
            })                                        
        })  
    
        //Delete specific toy
        toySeriesRoute.post('/deleteToy/:id',(req,res) => {
            toySeries.deleteOne({_id:req.params.id}, (err ,result) =>{
                if(!result){
                    res.send("Toy not found"+ err)
                }
                else{
                        res.json({"Successfully deleted the Toy":result});
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