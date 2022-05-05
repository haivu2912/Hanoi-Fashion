const router = require('express').Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken');
const UserController = require('../controllers/UserController');

router.get('/find/:id', verifyTokenAndAdmin, UserController.findUser);
router.patch('/update/:id'/*, verifyTokenAndAuthorization*/, UserController.update);
router.delete('/delete/:id', verifyTokenAndAuthorization, UserController.delete);
router.get('/find', verifyTokenAndAdmin, UserController.findAllUser);
router.get('/stats', verifyTokenAndAdmin, UserController.showUserStats)
module.exports = router;