const Sequelize = require('sequelize');
const db= require('../config/database');

//creating model

const D_Order = db.define('d_orders',{
quantity:{
type: Sequelize.INTEGER

},
phone_number:{
    type: Sequelize.STRING
    
},
address:{
    type: Sequelize.STRING
},
m_confirm:{
    type: Sequelize.STRING,
    defaultValue: "No"

}}
,{
    timestamps:false
});


module.exports=D_Order;
