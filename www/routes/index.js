const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

    if (req.isAuthenticated()) {
        res.redirect('/usuarios');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;