const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3021
var app = express();
hbs.registerPartials(__dirname+'/views/partials') //register partials folders
app.set('view engine' , 'hbs'); //set the view engine to hbs
app.use((req,res,next)=>{    //MIDDLEWARE WHICH logs the request 
    var now = new Date();
    var message = `${now} : ${req.method} : ${req.url}`;
    fs.appendFileSync('server.log' , message+'\n' , (err)=>{
        if(err){
            console.log(`Error while appending file sync ${err}`)
        }
    });
next();
})

// app.use((req,res,next)=>{
//     res.render('maintainence.hbs');    //add only when site is in maitaninace mode to stop the site from hitting anything furthur maintaineance middleware 
// })

app.use(express.static(__dirname+'/public'))  //give access to this folder , localhost:3000 = __dirname+'/public' // static middleware which servers up a directory
//static middleware should be after other middleware 


hbs.registerHelper('getcurrentYear' , ()=>{
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt' , (text)=>{
    return text.toUpperCase();
})
app.get('/' , (req,res)=>{
    return res.render('help.hbs' , {
        pageTitle : 'HelpPage',
        welcomeMsg: 'Welcome to my website :)',
    })
})
app.get('/about' , (req,res) =>{
res.render('about.hbs' , {
    name : 'Lavanya',
})
});

app.get('/aboutJsonResponse' , (req,res)=>{
    res.send({
        name : "JsonTest",
        likes : ["hello", "bye"]
    });
})

app.listen(port , ()=>{
    console.log(`Server started at : ${port}`);
});