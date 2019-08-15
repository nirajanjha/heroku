
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');


var app = express();


var bodyParser = require('body-parser');

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data
app.use(bodyParser.json())


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db', { useNewUrlParser: true });

// contact us schema
var userschema = mongoose.Schema({
   name:String,
   email:String,
   message:String,

});
var User = mongoose.model("User", userschema);

// contactus page 

app.post('/contact',function(req, res){
   var userinfo = req.body;
   console.log(userinfo.name)
   console.log(userinfo.email)
   console.log(userinfo.message)

   if(!userinfo.name || !userinfo.email || !userinfo.message){
      res.render('new-user', {
         message: "Sorry, you provided worng info", type: "error"});
   }
      else{
         var newuser = new User({
            name : userinfo.name,
            email : userinfo.email,
            message : userinfo.message,


      });
      

      newuser.save(function(err, User){
         if(err)
            res.render('contact');
         else
         res.render('user-contact', {
           message: "New message added", type: "success", user: userinfo});
      });

   }
});





var personSchema = mongoose.Schema({
  email: String,
  password: String,
  
});
var Person = mongoose.model("Person", personSchema);



// signup section start

app.post('/signup', function(req, res){
  var personInfo = req.body; //Get the parsed information
  
  if(!personInfo.email || !personInfo.password){
     res.render('new-user', {
        message: "Sorry, you provided worng info", type: "error"});
  } else {
     var newPerson = new Person({
        email: personInfo.email,
        password: personInfo.password,
       
     });
   
     newPerson.save(function(err, Person){
        if(err)
           res.render('contact');
        else
        res.render('new-user', {
          message: "New person added", type: "success", person: personInfo});
     });
  }
});



//login section start



app.post('/login',  function(req, res){
  
  if(!req.body.email || !req.body.password){
     res.render('error');
  } else {
        var detail = Person.find({email : req.body.email});
         console.log(detail)
          if(detail.password === req.body.password){
             console.log("i am here")
             res.render('contact');
               }
               else{

                 res.render('error');
               }
           




        //   var niraj=Person.find();
        //   console.log(niraj);

        //   niraj(function(err, Person){
        //     if(niraj.email == req.body.email && niraj.password == req.body.password){
        //       res.render('/error');
        //     }
        //     else{
        //       res.render('contact');
        //     }
        //  });
    
            // // Person.find()(function(user){
            //   if(niraj.email == req.body.email && niraj.password == req.body.password){
            //     res.render('/error');
            //   }
            //   else{
            //     res.render('contact');
            //   }
              
            // // });
          
      
    

      
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);





module.exports = app;
