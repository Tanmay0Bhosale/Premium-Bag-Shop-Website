const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongooseConnection');
require("dotenv").config();
const expressSession = require('express-session');
const flash = require('connect-flash');

const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouters');
const indexRouter = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine' , 'ejs');

app.use(expressSession({
    resave : false,
    saveUninitialized : true,
    secret : process.env.EXPRESS_SESSION_SECRET
}));

app.use(flash());

app.use('/owners' , ownersRouter );
app.use('/users' ,usersRouter );
app.use('/products' , productsRouter );
app.use('/' , indexRouter);

app.listen(3000);