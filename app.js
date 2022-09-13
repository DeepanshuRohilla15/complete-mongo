const express = require('express')
const db = require('./db')
const { connectToDb, getDb } = require('./db')

// init app & middleware
const app = express()

// db connection
connectToDb((err) => {
   if(!err) {
      app.listen(3000, () => {
         console.log('app listening on port 3000')
      })     
      db = getDb() 
   }
})

// routes
app.get('/books', (req,res) => {
    let books = []
      
    db.collection('books')
    .find()
    .sort({ author: 1 })
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch(() => {
      res.status(500).json({error: 'Could not fetch the documents'})
    })

      res.json({messg: "welcome to the api"})
})