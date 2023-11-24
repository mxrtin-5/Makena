const express = require('express');
const router = express.Router();
const  createOrder  = require('../controllers/payment.controller.js');

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

router.post('/createOrder', createOrder)

router.get('/success', (req, res) => res.send("tetas"))

router.get('/webhook', (req, res) => res.send("tetas"))

module.exports = router