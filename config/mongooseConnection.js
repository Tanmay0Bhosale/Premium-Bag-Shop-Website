const mongoose = require('mongoose');
const config = require('config');

const dbgr = require('debug')('development:mongoose');
mongoose.connect(`${config.get('MONGODB_URI')}/premiumbagshop`)
.then(function(){
    dbgr("MongoDB connected successfully");
})
.catch(function(err){
    dbgr(err);
})