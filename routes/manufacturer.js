const express = require('express');
const router = express.Router();
const db = require('../config/database');  // outside routes hen under config
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const session = require('express-session');
const Op = Sequelize.Op;
const Product = require('../models/Product');
const { route } = require('./pages');
const D_Order = require('../models/D_Order');
const { where } = require('sequelize');
User.hasMany(Product);
Product.belongsTo(User);

router.get('/m_home', (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {

        res.render('m_home', {
            name: req.session.name,
            email: req.session.email,
            id: req.session.userid,
            role: req.session.role
        });
    } else {
        res.redirect('/auth/login');
    }
});

router.get('/add', (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {

        res.render('add', {
            name: req.session.name,
            email: req.session.email,
            role: req.session.role

        });
    } else {
        res.redirect('/auth/login');
    }
});


router.post('/add', (req, res) => {

    if (req.session.loggedin) {

        //const email= req.session.email;
        let { product_name, product_company, product_details, product_price } = req.body;

        let errors = [];
        //Validation
        if (!product_name || !product_company || !product_details || !product_price) {
            errors.push({ text: 'Please fill All The Information of Product' });
        }
        if (errors.length > 0) {
            //error
            res.render('add', {
                errors,
                product_name,
                product_company,
                product_details,
                product_price



            });
        }

        else {
            User.findOne({ where: { email: req.session.email } })
                .then(user => {
                    Product.create({

                        product_name,
                        product_company,
                        product_details,
                        product_price,
                        //userId
                        userId: user.id,
                        assigned: "No"
                    })
                        .then(product => {

                            console.log(product);
                            req.flash('success_msg', 'Medicine Added Succesfully');
                            res.redirect('/manufacturer/add');
                        })
                        .catch(err => console.log(err));

                })


        }
    }

});

router.get('/view', (req, res) => {
    if (req.session.loggedin) {
        User.findOne({ where: { email: req.session.email } })
            .then(user => {
                Product.findAll({ where: { userId: user.id } })
                    .then(product => {
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
                                }

                            })
                        }
                        res.render('product_view', {
                            name: req.session.name,
                            email: req.session.email,
                            role: req.session.role,
                            product: context.contextProducts
                        })
                        //console.log(product)


                    })
                    .catch(err => console.log(err));
            })

            .catch(err => console.log(err));
    }


})

router.get('/editproduct/:id', (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {

        Product.findAll({ where: { id: req.params.id } })
            .then(product => {
                const context = {
                    contextProducts: product.map(plist => {
                        return {
                            id: plist.id,
                            product_name: plist.product_name,
                            product_company: plist.product_company,
                            product_details: plist.product_details,
                            product_price: plist.product_price,
                            userId: plist.userId
                        }

                    })
                }

                res.render('edit_product', {
                    name: req.session.name,
                    email: req.session.email,
                    role: req.session.role,
                    product: context.contextProducts

                })
            })
            .catch(err => console.log(err));

    } else {
        res.redirect('/auth/login');
    }
});

router.post('/editproduct/:id', (req, res,) => {
    console.log(req.session);
    if (req.session.loggedin) {
        User.findOne({ where: { email: req.session.email } })
            .then(user => {
                Product.findOne({
                    where: {
                        userId: user.id,
                        id: req.params.id

                    }

                })
                    .then(product => {

                        let { product_name, product_company, product_details, product_price } = req.body;
                        Product.update(
                            {
                                product_name,
                                product_company,
                                product_details,
                                product_price
                            }, {
                            where: {
                                userId: user.id,
                                id: req.params.id

                            }
                        })
                            .then(productlist => {

                                Product.findAll({
                                    where: {
                                        id: req.params.id
                                    }
                                })
                                    .then(product => {

                                        const context = {
                                            contextProducts: product.map(plist => {
                                                return {
                                                    id: plist.id,
                                                    product_name: plist.product_name,
                                                    product_company: plist.product_company,
                                                    product_details: plist.product_details,
                                                    product_price: plist.product_price,
                                                    userId: plist.userId
                                                }

                                            })
                                        }
                                        res.render('edit_product', {
                                            name: req.session.name,
                                            email: req.session.email,
                                            role: req.session.role,
                                            product: context.contextProducts,
                                            alert: `${product_name} has been updated`
                                        })

                                    })
                                //console.log(productlist);
                                //res.redirect('/manufacturer/view');



                            })
                            .catch(err => console.log(err));
                    })

            })

    }
});



router.get('/delete/:id', (req, res) => {
    if (req.session.loggedin) {
        User.findOne({ where: { email: req.session.email } })
            .then(user => {
                Product.findOne({
                    where: {
                        userId: user.id,
                        id: req.params.id

                    }

                })
                    .then(product => {
                        Product.destroy({
                            where: {
                                userId: user.id,
                                id: req.params.id

                            }
                        })
                            .then(productlist => {
                                res.redirect('/manufacturer/view');

                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            })
    }

});


router.get('/app_reject', (req, res) => {
    if (req.session.loggedin) {
        Product.findAll({
            where: {
                userId: req.session.userid,
                approved: { [Op.notLike]: '%No' }
            }
        })
            .then(product => {
                const context = {
                    contextProducts: product.map(plist => {
                        return {
                            id: plist.id,
                            product_name: plist.product_name,
                            product_company: plist.product_company,
                            product_details: plist.product_details,
                            product_price: plist.product_price,
                            lab_assigned: plist.lab_assigned,
                            lab_approved: plist.lab_approved,
                            approved: plist.approved,
                            userId: plist.userId
                        }

                    })
                }

                res.render('view_app_reject', {
                    name: req.session.name,
                    email: req.session.email,
                    role: req.session.role,
                    product: context.contextProducts

                })
            })
            .catch(err => console.log(err));


    }


});

router.get('/sell_list', (req, res) => {
    if (req.session.loggedin) {
        Product.findAll({
            where: {
                userId: req.session.userid,
                approved: "Yes"
            }
        })

            .then(product => {
                const context = {
                    contextProducts: product.map(plist => {
                        return {
                            id: plist.id,
                            product_name: plist.product_name,
                            product_company: plist.product_company,
                            product_details: plist.product_details,
                            product_price: plist.product_price,
                            lab_assigned: plist.lab_assigned,
                            lab_approved: plist.lab_approved,
                            approved: plist.approved,
                            userId: plist.userId
                        }

                    })
                }

                res.render('selling_list', {
                    name: req.session.name,
                    email: req.session.email,
                    role: req.session.role,
                    product: context.contextProducts

                })
            })
            .catch(err => console.log(err));

    }

});

router.get('/order_received', (req, res) => {
    console.log(req.session.loggedin);
    if (req.session.loggedin) {
        User.findOne({where:{email: req.session.email}})
        .then(user=>{
          D_Order.findAll({
            order: [['id', 'ASC']],
             where:{
                 m_confirm:"No",
                 //supplier_id: user.id
                 
             },
              include:[{
                    model: Product,
                    required:true,
                    include:[{
                        model:User,
                        where:{
                            id: user.id
                        },
                        required:true
                    }]
                },{
                    model:User,
                    required:true
                } ]
                
               
            })
            .then(order=>{
               // console.log(order);
                console.log(JSON.stringify(order, null, 2));
              
              const context = {
                contextOrders: order.map(plist => {
                    return {
                        id: plist.id,
                        quantity: plist.quantity,
                        phone_number:plist.phone_number,
                        address:plist.address,
                        m_confirm: plist.m_confirm,
                        userId: plist.userId,
                        productId:plist.productId,
                      
                        //id: plist.product.id,
                        product_name: plist.product.product_name,
                        product_company: plist.product.product_company,
                        product_details: plist.product.product_details,
                        product_price: plist.product.product_price,
                        lab_assigned: plist.product.lab_assigned,
                        lab_approved: plist.product.lab_approved,
                        approved: plist.product.approved,
                        userId: plist.product.userId,

                       // id: plist.product.user.id,
                         //name:plist.product.user.name,
                        //email:plist.product.user.email,
                        //password:plist.product.user.password,
                        //usertype:plist.product.user.usertype,
                        
                        //id: plist.user.id
                        name:plist.user.name,
                        email:plist.user.email,
                        password:plist.user.password,
                        usertype:plist.user.usertype
                    }

                })
            }
            res.render('received_order',{
                name: req.session.name,
                email: req.session.email,
                role: req.session.role,
                order: context.contextOrders,
                

                
            })

            })
               
        })  
    }
    else {
        res.redirect('/auth/login');
    }

});

router.get('/order_confirm/:id', (req,res)=>{

    if(req.session.loggedin){
       D_Order.findOne({
           where:{
               id: req.params.id,
               m_confirm: "No"
           }
        })
        .then(order=>{
            let m_confirm= "Yes";
            D_Order.update(
                {
                    m_confirm: m_confirm
                }, {
                where: {
                    id: req.params.id
    
                }
            })
            .then(s=>{
                res.redirect('/manufacturer/order_received');
            })
           
        })
    }
     else {
            res.redirect('/auth/login');
        }
    
    });

    router.get('/order_reject/:id', (req,res)=>{

        if(req.session.loggedin){
           D_Order.findOne({
               where:{
                   id: req.params.id,
                   m_confirm: "No"
               }
            })
            .then(order=>{
                let m_confirm= "Reject";
                D_Order.update(
                    {
                        m_confirm: m_confirm
                    }, {
                    where: {
                        id: req.params.id
        
                    }
                })
                .then(s=>{
                    res.redirect('/manufacturer/order_received');
                })
               
            })
        }
         else {
                res.redirect('/auth/login');
            }
        
        })




module.exports = router;