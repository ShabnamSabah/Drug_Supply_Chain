const Sequelize = require('sequelize');
const db= require('../config/database');

//creating model

const P_Order = db.define('p_orders',{
quantity:{
type: Sequelize.INTEGER

},
phone_number:{
    type: Sequelize.STRING
    
},
address:{
    type: Sequelize.STRING
},

r_confirm:{
    type: Sequelize.STRING,
    defaultValue: "No"

}}
,{
    timestamps:false
});


module.exports=P_Order;
