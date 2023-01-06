var express = require('express');
var router = express.Router();

//listar novedades
router.get('/', function (req, res, next) {
    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.name
    });
});

module.exports = router;
