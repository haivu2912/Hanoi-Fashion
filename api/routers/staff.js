const router = require('express').Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken');
const StaffController = require('../controllers/StaffController');

router.get('/find/:id', /*verifyTokenAndAdmin,*/ StaffController.findStaff);
router.get('/find', /*verifyTokenAndAdmin,*/ StaffController.findAllStaff);
router.post('/create', /*verifyToken*/ StaffController.create);
router.patch('/update/:id'/*, verifyTokenAndAuthorization*/, StaffController.update);
router.delete('/delete/:id', /*verifyTokenAndAuthorization,*/ StaffController.delete);
module.exports = router;