const express = require('express');
const hbs = require('hbs');

var app = express();
hbs.registerPartials(__dirname+'/views/partials') //register partials folders
app.set('view engine' , 'hbs'); //set the view engine to hbs
app.use(express.static(__dirname+'/public'))  //give access to this folder , localhost:3000 = __dirname+'/public' // static middleware which servers up a directory
app.use((req,res,next)=>{    //MIDDLEWARE WHICH logs the request 
    var todayDate = new Date().toString;
    console.log(` ${todayDate} : ${req.method} : ${req.url}`);
next();
})

app.listen(3000 , ()=>{
    console.log('Server started at : ');
});

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