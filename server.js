const express = require('express')
const app = express()
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const session = require('express-session')
require('dotenv').config()
const db = mongoose.connection
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

mongoose.connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }, () => {
  console.log('The connection with mongod is established',mongodbURI)
})
db.on('error', err => console.log(err.message + ' is mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'))
//
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

///controllers/////////
const guitarController = require('./controllers/guitar.js')
app.use('/guitars',guitarController)
//
const userController = require('./controllers/users_controller.js')
app.use( '/users',userController)
//
const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions',sessionsController)



app.get('/', (req, res) => {
  res.redirect('/guitars')
})
/////////// Listener /////////////////
app.listen(PORT, () => {
  console.log('Yes sir!!');
  console.log(PORT);
})
