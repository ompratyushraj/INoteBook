const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "PratyushIsAVeryIntelligentIndividual";

// ROUTE 1 : Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleat 5 characters').isLength({ min: 5 })
] , async (req, res)=> {
    let success = false;
    // If there are errors, return Bad request and the errors.
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({success, errors : errors.array() });
    }

    // Check whether the user with this email exists already
    try{
        let user = await User.findOne({email: req.body.email});

        if(user){
            return res.status(400).json({success, error: "Sorry a user with this email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user.
        user = await User.create({
            name: req.body.name,
            password: secPass,
            // password: req.body.password,
            email: req.body.email
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});
        
        // const jwtData = jwt.sign(data, JWT_SECRET);
    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
        // console.log(jwtData);
    
        // .then(user => res.json(user))
        //     .catch(err => {console.log(err)
        //         res.json({error : 'Please enter a unique value for email', message: err.message});
        //     })
        // console.log(req.body);
        // const user = User(req.body);
        // user.save();
        // res.send(req.body);
        // res.json(user);
})

// ROUTE 2: Authenticate a User using: POST "/api/auth/login", No Login required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
] , async (req, res) => {
    let success = false;

    // If there are errors, return Bad request and the errors.
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({error : "Please try to login with correct credentials e."})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false;
            return res.status(400).json({success, error: "Please try to login with correct credentials p."});
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});
    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }

})

module.exports = router


// ROUTE 3: Get loggedin user details using: POST "api/auth/getuser". Login required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
})

module.exports = router