const express = require('express');
const router = express.Router();
const db = require('../config/database');  // outside routes hen under config
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const session = require('express-session');
const Product = require('../models/Product');
const D_Order = require('../models/D_Order');
const R_Order = require('../models/R_Order');
const Op = Sequelize.Op;

User.hasMany(D_Order);
D_Order.belongsTo(User);
Product.hasMany(D_Order);
D_Order.belongsTo(Product);

router.get('/d_home', (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {

        res.render('d_home', {
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
    if (req.session.loggedin) {
        User.findAll({
            where: { usertype: 'Manufacturer' }
        })
            .then(user => {

                const context = {
                    contextUser: user.map(plist => {
                        return {
                            id: plist.id,
                            name: plist.name,
                            usertype: plist.usertype
                        }

                    })
                }
                Product.findAll({
                    where: {
                        approved: "Yes"
                    }
                })
                    .then(product => {
                        const context1 = {
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
                        res.render('productlist', {
                            name: req.session.name,
                            email: req.session.email,
                            role: req.session.role,
                            user: context.contextUser,
                            product: context1.contextProducts
                        })
                    })
                    .catch(err => console.log(err));
            })
    }
});


router.get('/productlist/:name', (req, res) => {
    if (req.session.loggedin) {
        User.findAll({
            where: { usertype: 'Manufacturer' }
        })
            .then(user => {

                Product.findAll({
                    where: {
                        product_company: req.params.name,
                        approved: "Yes"
                    }
                })
                    .then(product => {
                        const context1 = {
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
                        const context = {
                            contextUser: user.map(plist => {
                                return {
                                    id: plist.id,
                                    name: plist.name,
                                    usertype: plist.usertype
                                }

                            })
                        }
                        res.render('productlist', {
                            name: req.session.name,
                            email: req.session.email,
                            role: req.session.role,
                            user: context.contextUser,
                            product: context1.contextProducts
                        })
                    })
            })
            .catch(err => console.log(err));
    }

})
router.get('/order/:id', (req, res) => {
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
                            assigned: plist.assigned,
                            lab_approved: plist.lab_approved,
                            approved: plist.lab_approved,
                            userId: plist.userId
                        }

                    })
                }
                res.render('order_product', {
                    name: req.session.name,
                    email: req.session.email,
                    role: req.session.role,
                    product: context.contextProducts

                })
            })
    } else {
        res.redirect('/auth/login');
    }
});

router.post('/order/:id', (req, res) => {
    console.log(req.session);
    if (req.session.loggedin) {

       
        User.findOne({ where: { email: req.session.email } })
                .then(user => {
                    Product.findOne({ 
                        where: { 
                            
                            id: req.params.id 
                            
                        } 
                    })
                        .then(s => {
                            let { product_name, quantity, phone_number, address } = req.body;
                            D_Order.create({
                                quantity,
                                phone_number,
                                address,
                                userId: user.id,
                                //supplier_id: s.userId,
                                productId: s.id

                            })
                                .then(order => {
                                    console.log(order);
                                    //req.flash('success_msg', 'Medicine Orderd Succesfully');
                                    //res.redirect('/distributor/view');
                                    Product.findAll({ where: { id: req.params.id } })
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
                                            res.render('order_product', {
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
          D_Order.findAll({
            where:{
                userId: user.id
            },
            include:[{
                    model: Product,
                    required:true,
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
                        m_confirm: plist.m_confirm,
                        d_confirm: plist.d_confirm,
                        r_confirm: plist.r_confirm,
                        supplier_id: plist.supplier_id,
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
                        
                    }

                })
            }
            res.render('d_order_placed',{
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
          D_Order.findAll({
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
                        m_confirm: plist.m_confirm,
                        userId: plist.userId,
                        productId:plist.productId,
                       // id: plist.product.id, //id of product
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
            res.render('d_orderlist_confirm_reject',{
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


router.get('/sell_list', (req, res) => {
    if (req.session.loggedin) {
      User.findOne({where: {email: req.session.email}})
      .then(user=>{
          D_Order.findAll({
              where: {
                  userId: user.id,
                  m_confirm: "Yes"
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
                        m_confirm:plist.m_confirm,
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

                res.render('dist_selling_list', {
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


router.get('/order_received', (req, res) => {
    console.log(req.session.loggedin);
    if (req.session.loggedin) {
        User.findOne({where:{email: req.session.email}})
        .then(user=>{
          R_Order.findAll({
              order: [['id', 'ASC']],
             where:{
                 d_confirm:"No",
                
                 
             },
              include:[{
                    model: D_Order,
                    required:true,
                    include:[{
                        model:Product,
                        required:true
                    },{
                        model:User,
                        where:{
                            id: user.id
                        },
                        required:true
                    }]
                },{
                    model: User,
                    required:true
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
                        dOrderId:plist.dOrderId,
                         //id: plist.d_order.id,
                         //quantity: plist.d_order.quantity,
                         //phone_number:plist.d_order.phone_number,
                         //address:plist.d_order.address,
                         //d_confirm: plist.d_order.d_confirm,
                         //userId: plist.d_order.userId,
                         //productId:plist.d_order.productId,
                        //id: plist.d_order.product.id,
                        product_name: plist.d_order.product.product_name,
                        product_company: plist.d_order.product.product_company,
                        product_details: plist.d_order.product.product_details,
                        product_price: plist.d_order.product.product_price,
                        lab_assigned: plist.d_order.product.lab_assigned,
                        lab_approved: plist.d_order.product.lab_approved,
                        approved: plist.d_order.product.approved,
                       userId: plist.d_order.product.userId,
                        //id: plist.d_order.user.id,
                       //  name:plist.d_order.user.name,
                       //email:plist.d_order.user.email,
                       //password:plist.d_order.user.password,
                       //usertype:plist.d_order.user.usertype,

                              //id: plist.user.id
                              name:plist.user.name,
                              email:plist.user.email,
                              password:plist.user.password,
                              usertype:plist.user.usertype
                        
                    }

                })
            }
            res.render('d_received_order',{
                name: req.session.name,
                email: req.session.email,
                role: req.session.role,
                order: context.contextOrders
                

                
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
       R_Order.findOne({
           where:{
               id: req.params.id,
               d_confirm: "No"
               
           }
        })
        .then(order=>{
            let d_confirm= "Yes";
            R_Order.update(
                {
                    d_confirm: d_confirm
                }, {
                where: {
                    id: req.params.id
    
                }
            })
            .then(s=>{
                res.redirect('/distributor/order_received');
            })
           
        })
    }
     else {
            res.redirect('/auth/login');
        }
    
    });

    

    router.get('/order_reject/:id', (req,res)=>{

        if(req.session.loggedin){
           R_Order.findOne({
               where:{
                   id: req.params.id,
                   d_confirm: "No"
               }
            })
            .then(order=>{
                let d_confirm= "Reject";
                R_Order.update(
                    {
                        d_confirm: d_confirm
                    }, {
                    where: {
                        id: req.params.id
        
                    }
                })
                .then(s=>{
                    res.redirect('/distributor/order_received');
                })
               
            })
        }
         else {
                res.redirect('/auth/login');
            }
        
        })







module.exports = router;