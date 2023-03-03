const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://0.0.0.0:27017/contactDance', {useNewUrlParser:true});
const port = 80;


// Defining mongoose Schema

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});

var Contact = mongoose.model('Contact',contactSchema);

// Express specific stuff
app.use('/static',express.static('static')); // for serving static file
app.use(express.urlencoded());

// Pug specific stuff
app.set('view engine', 'pug');  // use template engine as pug
app.set('views',path.join(__dirname,'views'));  // set the view directory

// ENDPOINTS
app.get('/',(req,res) => {
    const params = {};
    res.status(200).render('home.pug',params);
});

app.get('/contact',(req,res) => {
    const params = {};
    res.status(200).render('contact.pug',params);
});

app.post('/contact',(req,res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("Your data has been saved to the database")
    }).catch(() =>{
        res.status(400).send("Data was not saved to the database")
    });

    // res.status(200).render('contact.pug',params);
});


// Start the server
app.listen(port, ()=> {
    console.log(`Your port is successfuly started at ${port}`);
});