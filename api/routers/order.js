const router = require('express').Router();
const OrderController = require('../controllers/OrderController');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken');

router.get('/findUserOrder/:userId', /*verifyTokenAndAuthorization,*/ OrderController.findUserOrder);
router.get('/find/:id', /*verifyTokenAndAuthorization,*/ OrderController.findOrder);
router.delete('/delete/:id', verifyTokenAndAdmin, OrderController.delete);
router.patch('/update/:id', /*verifyTokenAndAdmin,*/ OrderController.update);
router.post('/create', /*verifyToken*/ OrderController.create);
router.get('/income', verifyTokenAndAdmin, OrderController.incomeStats);
router.get('/monthStat', verifyTokenAndAdmin, OrderController.monthStats);
router.get('/sale', verifyTokenAndAdmin, OrderController.saleStats);
router.get('/',verifyTokenAndAdmin, OrderController.findAllOrder);
module.exports = router;