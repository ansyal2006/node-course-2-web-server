const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Middlewares in express
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to file.');
    }
  });
  next();
});

app.use((req,res,next) =>{
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
  return  new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

app.get('/', (req,res) => {
  res.render('home.hbs',{
    pageTitle : 'Home Page',
    welcomeMsg : 'Welcome to the Home Page.'
  });
});

app.get('/bad',(req,res) =>{
   res.send({
     errorMessage : 'This is a bad request.',
     likes : ['BAD','REQUESTS']
   });
 });

app.get('/about',(req,res) =>{
  // res.send('About Page');
  res.render('about.hbs',{
    pageTitle : 'About Page'
  });
});

app.listen(3000, () => {
  console.log('The server is up on port 3000.');
});
