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
const { assert } = require('joi');




router.get('/ad_home', (req, res) => {

    console.log(req.session);
    if (req.session.loggedin) {

        res.render('ad_home', { name: req.session.name, email: req.session.email,role:req.session.role });
    } else {
        res.redirect('/auth/login');
    }
});

router.get('/view', (req, res) => {
    if (req.session.loggedin) {

        Product.findAll({ where: { assigned: "No" } })
            .then(product => {
                const context = {
                    contextProducts: product.map(plist => {
                        return {
                            id: plist.id,
                            product_name: plist.product_name,
                            product_company:plist.product_company,
                            product_details: plist.product_details,
                            product_price: plist.product_price,
                            userId: plist.userId,
                            assigned: plist.assigned

                        }

                    })
                }

                res.render('admin_view', {
                    name: req.session.name,
                    email: req.session.email,
                    role:req.session.role,
                    product: context.contextProducts
                })
                //console.log(product)
            })
            .catch(err => console.log(err));
    }
});




router.get('/selectlab/:id', (req, res) => {

    if (req.session.loggedin) {
        User.findAll({
            attributes: ["id"],
            where: { usertype: 'laboratory' }
        })
        .then(user => {
                const context = { contextList: user.map(plist =>plist.get("id"))}
                //console.log(context.contextProducts);
                const list = context.contextList;
                //console.log(list); 

                const randomlab = list[Math.floor(Math.random() * list.length)];
                console.log(randomlab);
                Product.findOne({ where: { id: req.params.id } })
                .then(product => {
                    const laboratory = randomlab;
                    Appointment.create({

                            mfr_id: product.userId,
                            lab_id: laboratory,
                            productId: product.id
                    })
                    .then(appoint => {

                      //console.log(appoint);
                     let assigned = "Yes";
                    Product.update(
                        {

                        assigned: assigned
                        }, {
                            where: {
                                id: req.params.id

                            }
                    })
                    .then(s=>{
                        res.redirect('/admin/view');
                    })
                    
                    })


                })
                .catch(err => console.log(err));
            })
        


    }

});

router.get('/views_appfrm_lab', (req, res) => {
    if (req.session.loggedin) {

        Product.findAll({
            where:{
              lab_approved:{  [Op.notLike]: '%No'},
              approved:{ [Op.like]: '%No'}
            }
        })
         .then(product => {
                const context = {
                    contextProducts: product.map(plist => {
                        return {
                            id: plist.id,
                            product_name: plist.product_name,
                            product_company:plist.product_company,
                            product_details: plist.product_details,
                            product_price: plist.product_price,
                            assigned: plist.assigned,
                            lab_approved: plist.lab_approved,
                            userId: plist.userId,
                            approved: plist.approved
                        }

                    })
                }

                res.render('for_approval_view', {
                    name: req.session.name,
                    email: req.session.email,
                    role:req.session.role,
                    product: context.contextProducts


                })


                //console.log(product)


            })
            .catch(err => console.log(err));



    }

})


router.get('/approve/:id', (req, res) => {

    if (req.session.loggedin) {

        Product.findOne({
            where: {
                id: req.params.id,
                assigned: "Yes",
                lab_approved: "Yes"
            }
        })
            .then(product => {
                let approved = "Yes";
                Product.update(
                    {
                        approved: approved
                    }, {
                    where: {
                        id: req.params.id

                    }
                })
                .then(s=>{
                    res.redirect('/admin/views_appfrm_lab');
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
                lab_approved: "Reject"
            }
        })
            .then(product => {
                let approved = "Reject";
                Product.update(
                    {
                        approved: approved
                    }, {
                    where: {
                        id: req.params.id

                    }
                })
                .then(s=>{
                    res.redirect('/admin/views_appfrm_lab');
                })
               

            })

    }
});

module.exports = router;