const Sequelize = require('sequelize');
const db= require('../config/database');

//creating model

const R_Order = db.define('r_orders',{
quantity:{
type: Sequelize.INTEGER

},
phone_number:{
    type: Sequelize.STRING
    
},
address:{
    type: Sequelize.STRING
},

d_confirm:{
    type: Sequelize.STRING,
    defaultValue: "No"

}}
,{
    timestamps:false
});


module.exports=R_Order;
