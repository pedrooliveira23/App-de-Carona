var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var session = require('express-session');

var indexRouter = require('./routes/index');
var cadastroRouter = require('./routes/cadastro');
var facebookAuth = require('./configuration/FacebookAuth');
var googleAuth = require('./configuration/GoogleAuth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cadastro', cadastroRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Passport session setup.
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// Autenticador do Facebook
passport.use(new FacebookStrategy({
        clientID: facebookAuth.facebook_api_key,
        clientSecret: facebookAuth.facebook_api_secret,
        callbackURL: facebookAuth.callback_url,
        profileFields: ['id', 'displayName', 'link', 'photos', 'emails']
    },
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            //Check whether the User exists or not using profile.id
            return done(null, profile);
        });
    }
));

// Autenticador do Google
passport.use(new GoogleStrategy({
        clientID: googleAuth.google_api_id,
        clientSecret: googleAuth.google_api_secret,
        callbackURL: googleAuth.callback_url
    },
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

module.exports = app;
