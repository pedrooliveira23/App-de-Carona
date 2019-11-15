var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Carona', user: req.user});
});

router.get('/account', ensureAuthenticated, function (req, res) {
    res.render('index', {user: req.user, title: 'Carona'});
});

router.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile','email']}));


router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {successRedirect: 'http://localhost:3001/', failureRedirect: '/'}),
    function (req, res) {
        res.redirect('/', {userId : req.user.id});
    });

router.get('/auth/google/callback',
    passport.authenticate('google', {successRedirect: 'http://localhost:3001/', failureRedirect: '/'}),
    function (req, res) {
        res.redirect('/');
    });

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}

module.exports = router;
