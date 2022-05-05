const router = require('express').Router();
const CartController = require('../controllers/CartController');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken');

router.get('/find/:userId', /*verifyTokenAndAuthorization*/CartController.findUserCart);
router.delete('/delete/:id', verifyTokenAndAuthorization, CartController.delete);
router.patch('/update/:id', /*verifyTokenAndAuthorization*/ CartController.update);
router.post('/create', /*verifyToken*/ CartController.create);
router.get('/',/*verifyTokenAndAdmin*/ CartController.findAllCart);
module.exports = router;