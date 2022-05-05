const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken');

router.get('/find/:id', ProductController.findProduct);
router.get('/search', ProductController.findProductByName);
router.patch('/update/:id', /*verifyTokenAndAdmin,*/ ProductController.update);
router.delete('/delete/:id', verifyTokenAndAdmin, ProductController.delete);
router.post('/create', verifyTokenAndAdmin, ProductController.create);
router.patch('/updateProduct', ProductController.updateProduct);
router.get('/', ProductController.findAllProduct);
module.exports = router;