var express = require('express');
var router = express.Router();
var usersModel = require('../../models/usersModel'); //no necesito traer la base de datos porque la llamo en usersModel.js

router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

router.post('/', async (req, res, next) => {
    try {
        // console.log(req.body);
        var user = req.body.usuario;
        // console.log(req.body.usuario)
        var password = req.body.password;
        // console.log(req.body.password)

        var data = await usersModel.getUserByUsernameAndPassword(user, password);

        if (data != undefined) {
            req.session.user_id = data.user_id;
            req.session.name = data.user_name;
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

module.exports = router;