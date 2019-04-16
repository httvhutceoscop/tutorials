const express     = require('express');
const router      = express.Router();
const jwt         = require('jsonwebtoken');
const bcrypt      = require('bcryptjs');
const bodyParser  = require('body-parser');
router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

const config      = require('../../../config/config');
const User        = require('../../model/UserModel');
const VerifyToken = require('../../middlewares/VerifyToken');

router.post('/register', function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }, function(err, user) {
        if (err) return res.status(500).send("There was a problem regsitering the user.");

        // Create a token
        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({auth: true, token: token});
    });
});

router.get('/me', VerifyToken, function(req, res){
    User.findById(decoded.id, { password: 0 }, // projection
            function(err, user){
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        res.status(200).send(user);
    });
});

router.post('/login', function(req, res){
    User.findOne({ email : req.body.email }, function(err, user){
        if (err) return res.status(500).send("Error on server.");
        if (!user) return res.status(404).send("No user found.");

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        // Create a token
        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({auth: true, token: token});
    })
});

router.get('/logout', function(req, res){
    return res.status(200).send({ auth: false, token: null });
})

module.exports = router;