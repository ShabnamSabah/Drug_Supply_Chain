const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();


app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//Connect Flash
app.use(flash());

// Global Variables
app.use((req, res, next) => {

  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Database
const db = require('./config/database');

//Test Database

db.authenticate()
  .then(() => console.log('Database Connected'))
  .catch(err => console.log('Error ' + err))



//app.get('/', (req, res) =>{

//res.send('Hello World Express!!'); 

//});

/*db.sync({ force:false})
   .then((result) => {
       console.log(result);
   })
   .catch((err) => {
       console.log(err);
   })*/

app.engine('handlebars', exphbs({ 
  defaultLayout: 'main2',
   helpers:{
    'calculation': function(v1, v2,options){
      if(v1 === v2){
        return options.fn(this);
      }
      else{
        return options.inverse(this);
      }
    }

   }

})); 

//set app engine
app.set('view engine', 'handlebars');

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/manufacturer', require('./routes/manufacturer'));
app.use('/distributor', require('./routes/distributor'));
app.use('/retailer', require('./routes/retailer'));
app.use('/admin', require('./routes/admin'));
app.use('/patient', require('./routes/patient'));
app.use('/laboratory', require('./routes/laboratory'));


app.use(express.static(path.join(__dirname, 'public')));



const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`listening on port ${port}..`));