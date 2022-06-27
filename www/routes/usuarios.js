const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

// router.get('/usuarios', isLoggedIn, (req, res) => {
//     res.render('usuarios/list-all');
//   });
 

router.get('/create', (req, res) => {
    res.render('usuarios/create');
});

router.post('/create', async (req, res) => {
    backURL=req.header('Referer') || '/';
    console.log({ backURL });
    // do your thang
    
    console.log('Usuarios.Create:');
    console.log(req.body);
    console.log(req.user);
    req.check('username', 'El usuario es obligatorio').notEmpty();
    req.check('password', 'El password es obligatorio').notEmpty();
    req.check('email', 'El correo es obligatorio').notEmpty();
    const errors = req.validationErrors();
    if (errors.length > 0) {
      req.flash('message', errors[0].msg);
      res.redirect('/create');
    }

    const { username, password, email } = req.body;
    const newRow = {
        username,
        password,
        email,
    };
    await pool.query('INSERT INTO usuarios set ?', [newRow]);
    req.flash('success', 'Usuario creado sin pronblemas');
    res.redirect('/');
});

router.get('/',  async (req, res) => {
    const usuarios = await pool.query('SELECT * FROM usuarios');
    res.render('usuarios/list-all', { usuarios });
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM usuarios WHERE ID = ?', [id]);
    req.flash('success', 'Usuario eliminador sin problemas.');
    res.redirect('/usuarios');
});

router.get('/update/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const usuarios = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    console.log('Usuario.Update:', usuarios);
    res.render('usuarios/update', {usuario: usuarios[0]});
});

router.post('/update/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;

    console.log('Usuarios.update:');
    console.log(req.body);
    console.log(req.user);
    req.check('username', 'El usuario es obligatorio').notEmpty();
    req.check('password', 'El password es obligatorio').notEmpty();
    req.check('email', 'El correo es obligatorio').notEmpty();
    const errors = req.validationErrors();
    if (errors.length > 0) {
      req.flash('message', errors[0].msg);
      res.redirect('/update/' + id);
    }

    const { username, password, email } = req.body;
    const newRow = {
        username,
        password,
        email,
    };
    await pool.query('UPDATE usuarios set ? WHERE id = ?', [newRow, id]);
    req.flash('success', 'Usuario Updated Successfully');
    res.redirect('/');
});

module.exports = router;