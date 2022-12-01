const express = require('express');
const router = express.Router();
const db = require('../config/database');  // outside routes hen under config
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const session = require('express-session');
const Op = Sequelize.Op;
const Product = require('../models/Product');
const Appointment = require('../models/Appointment');

Product.hasOne(Appointment);
Appointment.belongsTo(Product);

router.get('/lab_home', (req, res) => {

    console.log(req.session);
    if (req.session.loggedin) {

        res.render('lab_home', {
            name: req.session.name,
            email: req.session.email,
            id: req.session.userid,
            role: req.session.role
        });
    } else {
        res.redirect('/auth/login');
    }
});

router.get('/view', (req, res) => {

    console.log(req.session);
    if (req.session.loggedin) {
        Product.findAll({
            where: { lab_approved: "No" },
            include: [{
                model: Appointment,

                where: { lab_id: req.session.userid }
            }]
        })
            .then(product => {
                // console.log(product);
                const context = {
                    contextProducts: product.map(plist => {
                        return {
                            id: plist.id,
                            product_name: plist.product_name,
                            product_company: plist.product_company,
                            product_details: plist.product_details,
                            product_price: plist.product_price,
                            userId: plist.userId,
                            assigned: plist.assigned
                            //mfr_id: plist.mfr_id,
                            //lab_id:plist.lab_id,
                            //productId:plist.productId

                        }

                    })
                }
                res.render('lab_view', {
                    name: req.session.name,
                    email: req.session.email,
                     role:req.session.role,
                    product: context.contextProducts
                })
            })
            .catch(err => console.log(err));
    }


});


router.get('/approve/:id', (req, res) => {

    if (req.session.loggedin) {

        Product.findOne({
            where: {
                id: req.params.id,
                assigned: "Yes",
                lab_approved: "No"
            }
        })
            .then(product => {
                let lab_approved = "Yes";
                Product.update(
                    {
                        lab_approved: lab_approved
                    }, {
                    where: {
                        id: req.params.id

                    }
                })
                    .then(s => {
                        res.redirect('/laboratory/view');
                    })

            })

    }
});



router.get('/reject/:id', (req, res) => {

    if (req.session.loggedin) {

        Product.findOne({
            where: {
                id: req.params.id,
                assigned: "Yes",
                lab_approved: "No"
            }
        })
            .then(product => {
                let lab_approved = "Reject";
                Product.update(
                    {
                        lab_approved: lab_approved
                    }, {
                    where: {
                        id: req.params.id

                    }
                })
                    .then(s => {
                        res.redirect('/laboratory/view');
                    })


            })

    }
});


module.exports = router;