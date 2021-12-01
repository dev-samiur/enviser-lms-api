const User= require('../models/User');
require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login= async (req,res) => {

    try {
        
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ error: "Invalid login details" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.json({ error: "Invalid login details" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

        res.json({success: token});

    }catch (err) {

        res.json({ error: err });

    }    
}