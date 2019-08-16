const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
    res.render("index");
})

//esto es para que desde el index.js del path sea considerado todo el enruteo
module.exports = router;