const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title : { type : String, required : true},
    textContent : { type : String, required : true },
    image : { type : String, required : false },
    author : { type: String, required : true }
})

module.exports = mongoose.model("Article", articleSchema);