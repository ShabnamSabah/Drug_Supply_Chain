const express = require('express');
const router = express.Router();
const db = require('../config/database');  // outside routes hen under config
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const session = require('express-session');
const Op = Sequelize.Op;


router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));



router.post('/register', (req, res) => {

    let { name, email, password, confirmPassword, usertype } = req.body;
    //const hash = await bcrypt.hash(password,10);
    let errors = [];
    //Validation
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ text: 'Please fill in all the fields' });
    }

    if (password !== confirmPassword) {
        errors.push({ text: 'Password donot match' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Password should be atleast 4 characters!' });
    }
    if (errors.length > 0) {
        //error
        res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword,
            usertype



        });
    }
    else {
        User.findOne({ where: { email: email } })
            .then(user => {
                if (user) {
                    //User Exists
                    errors.push({ text: 'Email Exists' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        confirmPassword



                    });
                }
                else {
                    const newUser = new User({
                        name,
                        email,
                        password,
                        usertype
                    });
                    //Hash Password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //set password to hash
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You Are Registered Succesfully');
                                    res.redirect('/auth/login');
                                    //res.render('login', { message: 'Registered Successfully' })
                                })
                                .catch(err => console.log(err));

                        }))
                }
            });


    }


})


router.post('/login', (req, res) => {


    if (!req.body.email || !req.body.password) {
        req.flash('error_msg', 'Please Give Email And Password');
        res.redirect('/auth/login');
        //res.render('login', {message: 'Please give email and password'})
    }
    else {

        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (!user) {
                    //const validPass = bcrypt.compare(req.body.password,user.password)
                    //res.render('login',{message: 'The Email is not registerd'})
                    req.flash('error_msg', 'The Email Is Not registerd');
                    res.redirect('/auth/login');
                }
                else {
                    if (user.usertype == 'Manufacturer') {
                        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                req.session.loggedin = true;
                                req.session.name = user.name;
                                req.session.email = user.email;
                                req.session.userid = user.id;
                                req.session.role = user.usertype;
                                res.redirect('/manufacturer/m_home');

                            }
                            else {
                                //res.render('login',{message:'Incorrect Password'});
                                //res.redirect('/login');
                                req.flash('error_msg', 'Incorrect Password');
                                res.redirect('/auth/login');
                            }

                        });
                    }

                    else if (user.usertype == 'Distributor') {
                        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                req.session.loggedin = true;
                                req.session.name = user.name;
                                req.session.email = user.email;
                                req.session.userid = user.id;
                                req.session.role = user.usertype;
                                res.redirect('/distributor/d_home');
                            }
                            else {
                                req.flash('error_msg', 'Incorrect Password');
                                res.redirect('/auth/login');
                            }

                        });
                    }
                    else if (user.usertype == 'Retailer') {
                        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                req.session.loggedin = true;
                                req.session.name = user.name;
                                req.session.email = user.email;
                                req.session.userid = user.id;
                                req.session.role = user.usertype;
                                res.redirect('/retailer/r_home');

                            }
                            else {
                                res.render('login', { message: 'Incorrect Password' });
                            }

                        });
                    }
                    else if (user.usertype == 'Administrator') {
                        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                req.session.loggedin = true;
                                req.session.name = user.name;
                                req.session.email = user.email;
                                req.session.userid = user.id;
                                req.session.role = user.usertype;
                                res.redirect('/admin/ad_home');
                            }
                            else {
                                req.flash('error_msg', 'Incorrect Password');
                                res.redirect('/auth/login');
                            }

                        });
                    }
                    else if (user.usertype == 'Laboratory') {
                        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                req.session.loggedin = true;
                                req.session.name = user.name;
                                req.session.email = user.email;
                                req.session.userid = user.id;
                                req.session.role = user.usertype;
                                res.redirect('/laboratory/lab_home');
                            }
                            else {
                                req.flash('error_msg', 'Incorrect Password');
                                res.redirect('/auth/login');
                            }

                        });
                    }
                    else {
                        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                req.session.loggedin = true;
                                req.session.name = user.name;
                                req.session.email = user.email;
                                req.session.role = user.usertype;
                                res.redirect('/patient/p_home');
                            }
                            else {
                                req.flash('error_msg', 'Incorrect Password');
                                res.redirect('/auth/login');
                            }

                        });
                    }

                }
                //const isMatch = bcrypt.compareSync(password, user.password);


            })
            .catch(err => console.log(err));


    }

})

router.get('/logout', (req, res) => {
    if (req.session.loggedin) {
        res.header('Cache-Control', 'no-cache');
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/');

        });
    }

})


module.exports = router;