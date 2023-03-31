const express = require('express');
const app = express()
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')

mongoose.connect('mongodb://localhost/shortUrls',{                     // connecting to localhost database
    useNewUrlParser: true, useUnifiedTopology: true                    // or else shows a warning
})
app.use(express.urlencoded({extended: false}))                         // since we are using a URL this must be added

app.set('view engine','ejs')                                           // to use view engine, ejs file

app.get('/',async (req,res)=>{                                         // we are sending the shorturl that we are making to frontend
    const shorturls = await ShortUrl.find()
    res.render('index',{shorturls: shorturls})
})

app.post('/shortUrls',async (req,res)=>{
    await ShortUrl.create({ full: req.body.fullUrl})                   // we are creating that URL according to the schema

    res.redirect('/')
}) 

app.get('/:shortUrl',async (req,res)=>{
   const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl})  // we have to check if the shortened url is the same with one we have given
   if(shortUrl==null) return res.sendStatus(404)

   shortUrl.clicks++
   shortUrl.save()                                                         // save the details 

   res.redirect(shortUrl.full)                                             // we have to redirect back to the original URL
})

app.listen(process.env.PORT || 3000)