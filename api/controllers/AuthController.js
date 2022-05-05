const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

class AuthController {
    // [POST] /register
    register(req, res, next) {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()

        });

        newUser.save()
            .then(() => res.status(201).json(newUser))
            .catch(next);
    }

    // [POST] /login
    login(req, res, next) {
        User.findOne({
            username: req.body.username
        })
            .then(user => {
                const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
                const OriginPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
                if (!user || OriginPassword !== req.body.password) {
                    res.status(401).json('Tài khoản hoặc mật khẩu không hợp lệ');
                }else{
                    const {password, ...others} = user._doc;
                    const accessToken = jwt.sign({
                        id: user._id,
                        isAdmin: user.isAdmin
                    }, process.env.JWT_SEC, {
                        expiresIn: '1h'
                    });
                    res.status(200).json({...others, accessToken});
                }
            })
            .catch(next);
    }
}

module.exports = new AuthController;