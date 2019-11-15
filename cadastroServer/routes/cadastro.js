var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('cadastro', {tipo: 'Motorista', user: req.user} );
});

module.exports = router;