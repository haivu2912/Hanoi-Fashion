const router = require('express').Router();
const StripeController = require('../controllers/StripeController');

router.post('/payment', StripeController.payment)
module.exports = router;