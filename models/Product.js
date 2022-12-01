const Sequelize = require('sequelize');
const db= require('../config/database');

//creating model

const Product = db.define('products',{
product_name:{
type: Sequelize.STRING
},
product_company:{
    type: Sequelize.STRING
},
product_details:{
    type: Sequelize.STRING
    
},
product_price:{
   type: Sequelize.INTEGER
        
},
assigned:{
    type: Sequelize.STRING,
    defaultValue: "No"

},
lab_approved:{
        type: Sequelize.STRING,
        defaultValue: "No"
},
approved:{
    type: Sequelize.STRING,
    defaultValue: "No"
}
},{
    timestamps:false
});


module.exports=Product;
