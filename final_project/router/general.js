
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
  //  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  // res.send(JSON.stringify(books,null,4));
  // implementing promise
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      res.send(JSON.stringify(books,null,4));
    },6000)})

    myPromise.then((successMessage) => {
        res.send(successMessage)
      })
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
 // return res.send(books[isbn])
 // promise for getting book by isbn number
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      res.send(books[isbn]);
    },6000)})

    myPromise1.then((successMessage) => {
        res.send(successMessage)
      })
  // return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
  let valuepairs = Object.values(books);
/*
    for(let i = 0; i < valuepairs.length; i++){
        
        if(valuepairs[i]["author"] === author){
            res.send(valuepairs[i]);
        }
    }
    */
// promise for getting books by author 

    let myPromise2 = new Promise((resolve,reject) => {
        setTimeout(() => {
            for(let i = 0; i < valuepairs.length; i++){
        
                if(valuepairs[i]["author"] === author){
                    res.send(valuepairs[i]);
                }
            }
        },1000)})
    
        myPromise2.then((successMessage) => {
            res.send(successMessage)
          })
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;
  let valuepairs = Object.values(books);
/*
    for(let i = 0; i < valuepairs.length; i++){
        
        if(valuepairs[i]["title"] === title){
            res.send(valuepairs[i]);
        }
    }
    */
    // promise for getting books using titles 
    let myPromise3 = new Promise((resolve,reject) => {
        setTimeout(() => {
            for(let i = 0; i < valuepairs.length; i++){
        
                if(valuepairs[i]["title"] === title){
                    res.send(valuepairs[i]);
                }
            }
        },1000)})
    
        myPromise3.then((successMessage) => {
            res.send(successMessage)
          })
  // return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let review = req.params.isbn;
  res.send(books[review])
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
public_users.put("/auth/review/:isbn", function (req, res) {
    const isbn = req.params.isbn;
    let book = books[isbn]
    if (book) { //Check is friend exists
        let review = req.body.reviews;
        //Add similarly for firstName
        //Add similarly for lastName

        //if DOB the DOB has been changed, update the DOB 
        if(review) {
            book["reviews"] = review
        }
        //Add similarly for firstName
        //Add similarly for lastName
        books[isbn]=books;
        res.send(`Book with the isbn  ${isbn} has updated it review.`);
    }
    else{
        res.send("Unable to find book!");
    }
  });

  public_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    if (isbn){
        delete books[isbn]
    }
    res.send(`Book with the isbn  ${isbn}  is deleted.`);
  });


module.exports.general = public_users;
