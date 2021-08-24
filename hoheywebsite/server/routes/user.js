const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const config = require('../config');

module.exports = (upload) => {
    const url = config.mongoURI;
    const connect = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });

    userRouter.route('/user')
    .post(upload.single('user'), (req, res, next) => {
        console.log(req.body);
        User.findOne({ MMaccount: req.body.MMaccount})
            .then((user) => {
                console.log(user);
                if (user) {
                    return res.status(200).json({
                        success: false,
                        message: 'Account already registered',
                    });
                } else {
                    let newUser = new User({
                        OnlineMai: 0,
                        MMaccount: req.body.MMaccount,
                    });

                    newUser.save()
                        .then((user) => {
                            return res.status(200).json({
                                success: true,
                                user,
                                message: 'User with address: ' + req.body.MMaccount + 'added',
                            });
                        })
                        .catch(err => res.status(500).json(err));
                }
            });
    });
    return userRouter;
};