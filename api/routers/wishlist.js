const router = require('express').Router();
const WishListController = require('../controllers/WishListController');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken');

router.get('/find/:userId', /*verifyTokenAndAuthorization*/WishListController.findUserWishList);
router.delete('/delete/:id', verifyTokenAndAuthorization, WishListController.delete);
router.patch('/update/:id', /*verifyTokenAndAuthorization*/ WishListController.update);
router.post('/create', /*verifyToken*/ WishListController.create);
router.get('/',/*verifyTokenAndAdmin*/ WishListController.findAllWishList);
module.exports = router;