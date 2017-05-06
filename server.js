var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	= require('passport');
var config      = require('./config/database'); // get db config file
// var User        = require('./models/user'); // get the mongoose model
var port        = process.env.PORT || 4000;
var jwt         = require('jwt-simple');
// var save_menu   = require('./models/category')
// var Menu        = require('./models/menu')
// var Category    = require('./models/category')



 
// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// log to console
app.use(morgan('dev'));

//connect to the database
mongoose.connect(config.database);

// Use the passport package in our application
app.use(passport.initialize());


// pass passport for configuration
require('./config/passport')(passport);

var apiRoutes = express.Router();
require("./routes/api")(apiRoutes)


apiRoutes.post("/signup", function(req, res){
  if(!req.body.name || !req.body.password){
    return res.json({sucess: "false", msg : "please provide the name and password"});
  }

  var newuser = new User({
    name : req.body.name,
    password : req.body.password
  });

  newuser.save(function(err){
    if(err){
      return res.json({sucess: "false", msg : "user name already exists"})
    }else{
      return res.json({sucess: "true", msg : "created a new user"})
    }

  });

});

// apiRoutes.get('/menu', function(req, res){

//     Menu.find(function(err, menu_docs){
//       if(err) res.json({status : false , msg : "could not retrive the data"})
//       // var data = {"data" : menu_docs}
//       // return res.json(data)
//       return res.json(menu_docs)

//     })
// });
// apiRoutes.post('/menu', function(req, res){
//   console.log("I will do this");

// console.log(req.body)
//   // save_menu.save_me();
//   // return res.json({success: "true", msg : "saved to the database"})
//   return res.json(req.body.sandeep.don)
  


// });

// apiRoutes.get('/menu', function(req, res){
//   console.log("trying to get the menu")

//   // console.log(save_menu.findOne({name : "burger"}))
//   // save_menu.find(function(err, cat){
//   //   if (err) return console.error(err);
//   // console.log(cat)
//   //  res.json(cat)
//   // });

//   // save_menu.findOne().populate("under_menu").exec(function(err, cat){
//   //   if (err) return handleError(err);
//   //     console.log(cat);
//   //     return res.json(cat)
//   // });


//     // Menu.saveMenu("sandeeps-menu-chek");
//     // return res.json({mess : "the menu has been saved"});

//     Menu.find({name : "branch01 menu"}, function(err, docs){
//       var menuId ;


//       if (err){
//         console.log(err);
//         res.json({msg : "ERROR"})

//       }

//       console.log(docs)
      
//       if (docs.length == 0){
//         return res.json({msg: "empty docs"})
//       }
//       // res.json(docs[0])
//       menuId = docs[0]._id
//       Category.insertCategory("newBurgers", menuId, function cb(err){
//         if (err) res.json({status : false, msg : "error in inserting the value"})

        
//       } )
//       return res.json({status : true, msg : "successfully pushed"});




//     }).limit(1);

//     // Category.insertCategory("newBurgers", "fakeMenu", function cb(){} )
//     // return res.json({mess : "new cat is inserted"});

//   // return res.json(save_menu.findOne({name : "burger"}));
// });

apiRoutes.post("/login", function(req, res){
  if(!req.body.name){
    return res.json({success: "false", msg : "Please provide the user to authenticate"})
  }
  User.findOne({name: req.body.name}, function(err, user){
    console.log(req.body.name)
    if(err){
      throw err;
    }
    if(!user){
       return res.json({success: "false", msg : "user is not in the db"})

    }
    else{

      user.comparePasswords(req.body.password, function(err, isMatch){

        if(isMatch && !err){
          var token = jwt.encode(user, config.secret);
          res.json({success: true, token: 'JWT ' + token});
        }
         else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
          
        }
      } );
    }
  })

});

// apiRoutes.get("/memberinfo", passport.authenticate("jwt", {session : false}), function(req, res){
//   var token = getToken(req.headers.authorization);
//   console.log(token);

//   if(token){
//     var decode = jwt.decode(token, config.secret);
//     User.findOne({name : decode.name}, function(err, user){
//       if (err) throw err;

//       if (!user){
//         return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
//       }
//       else{
//         return res.json({success : true, msg: "welcome to user  "+ user.name })
//       }
//     })

    

//   }
//   else{
//     return res.status(403).send({success : false, msg : "no token provided"})
//   }
  
// });

getToken = function(raw_auth){
  return raw_auth.split(" ")[1]
}


apiRoutes.get('/members', function (req, res) {
  res.send('Hello World!'+ req.headers.authorization.split(" ")[1])
})

// connect the api routes under /api/
app.use('/api', apiRoutes);
 

 
// demo Route (GET http://localhost:8080)
app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});
 
// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);


// // middleware that modify the response body
// var doesModifyBody = function(request, response, next) {
//   response.setHeader("Content-Type", "text/html");
//   response.write("<p>Hello World</p>");
//   response.end();
//   // doesn't call next()
// };

// // app.use(doesNotModifyBody);
// app.use(doesModifyBody);