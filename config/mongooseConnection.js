const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/premiumbagshop")
.then(function(){
    console.log("MongoDB connected successfully");
})
.catch(function(err){
    console.log(err);
})