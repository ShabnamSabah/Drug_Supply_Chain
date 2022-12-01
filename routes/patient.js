const express = require('express');
const router = express.Router();
const db = require('../config/database');  // outside routes hen under config
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const session = require('express-session');
const Product = require('../models/Product');
const P_Order = require('../models/P_Order');
const R_Order = require('../models/R_Order');
const Op = Sequelize.Op;

User.hasMany(P_Order),
P_Order.belongsTo(User);
Product.hasMany(P_Order);
P_Order.belongsTo(Product);
R_Order.hasMany(P_Order);
P_Order.belongsTo(R_Order);

router.get('/p_home', (req, res) => {

    console.log(req.session);
    if(req.session.loggedin){
       
        res.render('p_home',{
            name:req.session.name, 
            email:req.session.email,
            id: req.session.userid,
            role: req.session.role
        });
    } else {
        res.redirect('/auth/login');
    }
});

router.get('/view', (req,res)=>{
    if(req.session.loggedin){
       User.findAll({
           where:{
               usertype: 'Retailer'
           }
       })
       .then(user=>{
           R_Order.findAll({
               order: [['id', 'ASC']],
               where:{
                  
                   d_confirm: "Yes"
               },
               include:[{
                   model: Product,
                   required:true
               }]
           })
           .then(order=>{
            console.log(JSON.stringify(order, null, 2));
            const context = {
                contextOrders: order.map(plist => {
                    return {
                       id: plist.id,
                        quantity: plist.quantity,
                        phone_number: plist.phone_number,
                        address: plist.address,
                        m_confirm: plist.m_confirm,
                        d_confirm: plist.d_confirm,
                        r_confirm: plist.r_confirm,
                        supplier_id: plist.supplier_id,
                        userId: plist.userId,
                        productId: plist.productId,
                    
                          // id: plist.product.id,
                            product_name: plist.product.product_name,
                            product_company: plist.product.product_company,
                            product_details: plist.product.product_details,
                            product_price: plist.product.product_price,
                            lab_assigned: plist.product.lab_assigned,
                            lab_approved: plist.product.lab_approved,
                            approved: plist.product.approved,
                            userId: plist.product.userId
                     

                    }
                })
            }

            const context1 = {
                contextUser: user.map(plist => {
                    return {
                        id:plist.id,
                        name:plist.name,
                        email:plist.email,
                        password:plist.password,
                        usertype:plist.usertype,
                    }

                })
            }
            res.render('patient_productlist', {
                name: req.session.name,
                email: req.session.email,
                role: req.session.role,
                user: context1.contextUser,
                order: context.contextOrders
            })

          
           })
       })
        
    }
    else{
        res.redirect('/auth/login');
    }
});


router.get('/productlist/:id', (req,res)=>{
    if(req.session.loggedin){
        User.findAll({
            where:{usertype: 'Retailer'}

        })
        .then(user=>{
              R_Order.findAll({
                  R_order: [['id', 'ASC']],
                  where:{
                  userId: req.params.id,
                  d_confirm:"Yes"
                  },
                  include:[{
                      model: Product,
                      required:true
                  }]
              })
              .then(order=>{
                console.log(JSON.stringify(order, null, 2));
                const context = {
                    contextOrders: order.map(plist => {
                        return {
                            id: plist.id,
                            quantity: plist.quantity,
                            phone_number: plist.phone_number,
                            address: plist.address,
                            m_confirm: plist.m_confirm,
                            d_confirm: plist.d_confirm,
                            r_confirm: plist.r_confirm,
                            supplier_id: plist.supplier_id,
                            userId: plist.userId,
                            productId: plist.productId,
                        
                               //id: plist.product.id,
                                product_name: plist.product.product_name,
                                product_company: plist.product.product_company,
                                product_details: plist.product.product_details,
                                product_price: plist.product.product_price,
                                lab_assigned: plist.product.lab_assigned,
                                lab_approved: plist.product.lab_approved,
                                approved: plist.product.approved,
                                userId: plist.product.userId
                         

                        }
                    })
                }

                const context1 = {
                    contextUser: user.map(plist => {
                        return {
                            id:plist.id,
                            name:plist.name,
                            email:plist.email,
                            password:plist.password,
                            usertype:plist.usertype,
                        }

                    })
                }
                res.render('patient_productlist', {
                    name: req.session.name,
                    email: req.session.email,
                    role: req.session.role,
                    user: context1.contextUser,
                    order: context.contextOrders
                })

              })

        })
            
            
        
        
    }
    else{
        res.redirect('/auth/login');
    }
    });


   router.get('/order/:id', (req, res) => {
        console.log(req.session);
        if (req.session.loggedin) {
           R_Order.findAll({ 
               where: { 
                   id: req.params.id 
                },
                include:[{
                    model:Product,
                    required:true
                }]
        })
        .then(order=>{
            
            console.log(JSON.stringify(order, null, 2));
            const context = {
                contextOrders: order.map(plist => {
                    return {
                        id: plist.id,
                        //quantity: plist.quantity,
                        //phone_number: plist.phone_number,
                        //address: plist.address,
                        r_confirm: plist.r_confirm,
                        userId: plist.userId,
                        productId: plist.productId,
                        //id: plist.product.id,
                        product_name: plist.product.product_name,
                        product_company: plist.product.product_company,
                        product_details: plist.product.product_details,
                        product_price: plist.product.product_price,
                        lab_assigned: plist.product.lab_assigned,
                        lab_approved: plist.product.lab_approved,
                        approved: plist.product.approved,
                        userId: plist.product.userId
                     
    
                    }
                })
            }

            res.render('new1', {
                name: req.session.name,
                email: req.session.email,
                role: req.session.role,
               // product: context.contextProducts
                order: context.contextOrders
    
            })
            
        })
    }
      
    else{
        res.redirect('/auth/login');
    }
    });


   router.post('/order/:id', (req, res) => {
        console.log(req.session);
        if (req.session.loggedin) {
        
           
            User.findOne({ where: { email: req.session.email } })
                    .then(user => {
                        R_Order.findOne({ 
                            where: { 
                                id: req.params.id 
                             },
                             include:[{
                                 model: Product,
                                 required: true
                             }]
                     })
                            .then(s => {
                                let { product_name, quantity, phone_number, address } = req.body;
                                P_Order.create({
                                    quantity,
                                    phone_number,
                                    address,
                                    r_confirm: "No",
                                    userId: user.id,
                                    productId: s.productId,
                                    rOrderId: s.id
                                
    
                                })
                                    .then(order => {
                                        console.log(order);
                                        //req.flash('success_msg', 'Medicine Orderd Succesfully');
                                        //res.redirect('/distributor/view');
                                        Product.findAll({ where: { id: s.productId } })
                                        .then(product=> {
    
                                            const context = {
                                                    contextProducts: product.map(plist => {
                                                        return {
                                                            id: plist.id,
                                                           product_name: plist.product_name, 
                                                            product_company: plist.product_company,
                                                            product_details: plist.product_details,
                                                            product_price: plist.product_price,
                                                            assigned: plist.assigned,
                                                            lab_approved: plist.lab_approved,
                                                            approved: plist.lab_approved,
                                                            userId: plist.userId
                                                        }
    
                                                    })
                                                }
                                                res.render('p_order_product', {
                                                    name: req.session.name,
                                                    email: req.session.email,
                                                    role: req.session.role,
                                                    product: context.contextProducts,
                                                    alert: `${product_name} has been orderd`
                                                   //alert: "Medicine Ordered Successfully"
                                                })
                                        })
                                    })
                                    .catch(err => console.log(err));
                            })
                    })
            }
    
    });
    
    router.get('/placed_order', (req, res) => {
        console.log(req.session.loggedin);
        if (req.session.loggedin) {
            User.findOne({where:{email: req.session.email}})
            .then(user=>{
              P_Order.findAll({
                where:{
                    userId: user.id
                },
                include:[{
                    model: R_Order,
                    required: true,
                    include:[{
                       
                        model:User,
                        required:true

                    },{
                        model:Product,
                        required:true
                    }]

                    }]
                    
                   
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
                            r_confirm: plist.r_confirm,
                            userId: plist.userId,
                            productId:plist.productId,
                            rOrderId: plist.rOrderId,
                             //id: plist.r_order.id,
                             quantity: plist.r_order.quantity,
                             phone_number:plist.r_order.phone_number,
                             address:plist.r_order.address,
                             d_confirm: plist.r_order.d_confirm,
                             userId: plist.r_order.userId,
                             productId:plist.r_order.productId,
                             dOrderId:plist.r_order.dOrderId,



                            //id: plist.r_order.product.id,
                            product_name: plist.r_order.product.product_name,
                            product_company: plist.r_order.product.product_company,
                            product_details: plist.r_order.product.product_details,
                            product_price: plist.r_order.product.product_price,
                            lab_assigned: plist.r_order.product.lab_assigned,
                            lab_approved: plist.r_order.product.lab_approved,
                            approved: plist.r_order.product.approved,
                            userId: plist.r_order.product.userId,

                            //id: plist.r_order.user.id.
                            name:plist.r_order.user.name,
                            email:plist.r_order.user.email,
                             password:plist.r_order.user.password,
                             usertype:plist.r_order.user.usertype
                            
                        }
    
                    })
                }
                res.render('p_order_placed',{
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
    
    router.get('/confirm_reject_orderlist', (req, res) => {
        console.log(req.session.loggedin);
        if (req.session.loggedin) {
            User.findOne({where:{email: req.session.email}})
            .then(user=>{
              P_Order.findAll({
                where:{
                    userId: user.id
                    //m_confirm: {[Op.notLike]: '%No'}
                },
                include:[{
                        model: Product,
                        required:true
                    }]
                    
                   
                })
                .then(order=>{
                   // console.log(order);
                    console.log(JSON.stringify(order, null, 2));
                  
                   const context = {
                    contextOrders: order.map(plist => {
                        return {
                            id: plist.id,    // id of order
                            quantity: plist.quantity,
                            phone_number:plist.phone_number,
                            address:plist.address,
                            r_confirm: plist.r_confirm,
                            userId: plist.userId,
                            productId:plist.productId,
                            //id: plist.product.id, //id of product
                            product_name: plist.product.product_name,
                            product_company: plist.product.product_company,
                            product_details: plist.product.product_details,
                            product_price: plist.product.product_price,
                            lab_assigned: plist.product.lab_assigned,
                            lab_approved: plist.product.lab_approved,
                            approved: plist.product.approved,
                            userId: plist.product.userId,
                            
                        }
    
                    })
                }
                res.render('p_orderlist_confirm_reject',{
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
    
    

    router.get('/purchased', (req, res) => {
        if (req.session.loggedin) {
          User.findOne({where: {email: req.session.email}})
          .then(user=>{
              P_Order.findAll({
                  where: {
                      userId: user.id,
                      r_confirm: "Yes"
                  },
                  include:[{
                    model: Product,
                    required:true
                }]
              })
              .then(order => {
                console.log(JSON.stringify(order, null, 2));
                   const context = {
                        contextOrders: order.map(plist => {
                            return {
                            //id: plist.id,
                            quantity: plist.quantity,
                            phone_number:plist.phone_number,
                            address:plist.address,
                            r_confirm:plist.r_confirm,
                            userId: plist.userId,
                            productId:plist.productId,
                            id: plist.product.id,
                            product_name: plist.product.product_name,
                            product_company: plist.product.product_company,
                            product_details: plist.product.product_details,
                            product_price: plist.product.product_price,
                            lab_assigned: plist.product.lab_assigned,
                            lab_approved: plist.product.lab_approved,
                            approved: plist.product.approved,
                            userId: plist.product.userId,
                            
                            }
    
                        })
                    }
    
                    res.render('p_purchased_list', {
                        name: req.session.name,
                        email: req.session.email,
                        role: req.session.role,
                        order: context.contextOrders
    
                    })
                })
            })
                .catch(err => console.log(err));
    
        }
    
    });


module.exports=router;
