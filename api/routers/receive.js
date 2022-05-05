const router = require('express').Router();
const ReceiveController = require('../controllers/ReceiveController');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken');

router.get('/find/:id', verifyTokenAndAuthorization, ReceiveController.findReceive);
router.delete('/delete/:id', verifyTokenAndAdmin, ReceiveController.delete);
router.patch('/update/:id', verifyTokenAndAdmin, ReceiveController.update);
router.post('/create', /*verifyToken*/ ReceiveController.create);
router.get('/income', verifyTokenAndAdmin, ReceiveController.incomeStats);
router.get('/', ReceiveController.findAllReceive);
module.exports = router;