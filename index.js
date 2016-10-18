
const express = require('express')  
const app = express()  
const port = 3474
const path = require('path') 
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));
app.use(express.static('node_modules'));
app.engine('.hbs', exphbs({  
  defaultLayout: 'index',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views')
}))
app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, 'views')) 




app.get('/', (req, res) => {  
  	res.render("home",{});
}); 
app.get('/signup', (req, res) => {  
  	res.render("signup",{});
}); 
app.get('/login', (req, res) => {  
  	res.render("login",{});
}); 
app.get('/forgot', (req, res) => {  
  	res.render("forgot",{});
});
app.get('/mainpage', (req, res) => {  
  	res.render("mainpage",{});
});

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
}) 

var mongo=require('mongodb');
var mongoClient=mongo.MongoClient;
var url="mongodb://admin:admin@ds047365.mlab.com:47365/mydb";
mongoClient.connect(url,function(err,db){
  console.log("database initialised correctly");
  var uc=db.collection('data');
  


app.post('/userlogin', function(req, res){    
    var uname = req.body.uname;
    var pass= req.body.pass;
 	uc.find({name:uname,password:pass}).toArray(function(error,op){
 		if(op.length>0){
 			res.redirect('/mainpage');
 		}
 	})
})
app.post('/usersignup',function(req,res){
	var uname = req.body.uname;
    var pass= req.body.pass;
    uc.find({name:uname}).toArray(function(error,op){
 		if(op.length==0){
 		uc.insert({name:uname,password:pass});
 		res.redirect('/login');
 		}
 		else{
 			res.redirect('/signup');
 		}
 	})

})


});  