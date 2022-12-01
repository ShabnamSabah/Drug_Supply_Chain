const Sequelize = require('sequelize');
const db= require('../config/database');

//creating model

const Appointment = db.define('appointments',{
mfr_id:{
    type: Sequelize.INTEGER
    
},
lab_id:{
   type: Sequelize.INTEGER
        
}
},{
    timestamps:false
});
    


module.exports=Appointment;
