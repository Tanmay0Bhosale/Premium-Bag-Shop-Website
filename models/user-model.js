const mongoose = require('mongoose');
import { is } from './../node_modules/@types/whatwg-url/lib/URL.d';

mongoose.connect('mogodb://127.0.0.1:27017/premiumbagshop');

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        minLength : 3,
        trim : true,
    },
    email : String,
    password : String,  
    cart:{
        type : Array,
        default : []
    },
    isAdmin : Boolean,
    orders : {
        type : Array,
        default : []
    },
    contact : Number,
    picture : String
});

module.exports = mongoose.model('user', userSchema);