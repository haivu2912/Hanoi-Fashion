const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken');

router.get('/find/:id', /*verifyTokenAndAuthorization*/CategoryController.findCategory);
router.delete('/delete/:id', /*verifyTokenAndAuthorization,*/ CategoryController.delete);
router.patch('/update/:id', /*verifyTokenAndAuthorization*/ CategoryController.update);
router.post('/create', /*verifyToken*/ CategoryController.create);
router.get('/',/*verifyTokenAndAdmin*/ CategoryController.findAllCategory);
module.exports = router;