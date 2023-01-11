const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/codial_development');
const db = mongoose.connection;
db.on('error',console.error.bind(console,"error in binding with database"));
db.once('open',function(){
    console.log("successful connected to database: mongodb");
});
module.exports = db;