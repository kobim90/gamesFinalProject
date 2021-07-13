var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getAllGamesRouter = require("./routes/games")
const getGenresRouter = require("./routes/genresAndPlatforms")
const getLoginRouter = require("./routes/login")
const getRegisterRouter = require("./routes/register")
var app = express();


app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/games', getAllGamesRouter);
app.use("/genres", getGenresRouter);
app.use("/login", getLoginRouter);
app.use("/register", getRegisterRouter);

module.exports = app;
