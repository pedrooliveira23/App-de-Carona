var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('cadastro', {tipo: 'Motorista', user: req.user} );
});

module.exports = router;