const Article = require("../models/article");

exports.index = (req,res,next) => {
    Article.find()
        .limit(5)
        .then(articles => res.status(200).json(articles))
        .catch(error => res.status(400).json({ error })); 
}