const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    id : { type : Number, unique : true },
    title : { type : String, required : true},
    textContent : { type : String, required : true },
    image : { type : String, required : false },
    author : { type: String, required : true }
}, {
    versionKey : false,
});

articleSchema.pre('save', async function(next) {
    console.log("Pre-save hook triggered for article:", this);
    if (this.isNew) {
        const lastArticle = await this.constructor.findOne().sort({ id : -1 });
        this.id = lastArticle ? lastArticle.id + 1 : 1;
    }
});

module.exports = mongoose.model("Article", articleSchema);