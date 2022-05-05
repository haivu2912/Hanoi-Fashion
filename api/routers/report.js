const router = require('express').Router();
const ReportController = require('../controllers/ReportController');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken');

router.get('/find/:userId', /*verifyTokenAndAuthorization,*/ ReportController.findUserReport);
router.delete('/delete/:id', verifyTokenAndAdmin, ReportController.delete);
router.patch('/update/:id', /*verifyTokenAndAdmin,*/ ReportController.update);
router.post('/create', /*verifyToken*/ ReportController.create);
//router.get('/sale', verifyTokenAndAdmin, ReportController.saleStats);
router.get('/',verifyTokenAndAdmin, ReportController.findAllReport);
module.exports = router;