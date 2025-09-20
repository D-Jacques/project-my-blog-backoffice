const Article = require('../models/article');

exports.create = (req, res, next) => {
    const articleObject = JSON.parse(req.body.article);
    console.log(articleObject);
    const article = new Article({
        ...articleObject
    })

    article.save()
        .then(() => res.status(201).json({ message : "Article created succesfully"}))
        .catch(error => res.status(400).json({ error }));
}

exports.edit = (req, res, next) => {
    const articleObject = { ...req.body };
    Article.findOne({ _id : req.params.id })
        .then(article => {
            // updateOne va faire un findOne puis une update
            // updateOne({filte de recherche}, {elements à update})
            Article.updateOne({ _id : req.params.id }, { ...articleObject, _id : req.params.id })
                .then(() => res.status(200).json({ message : "Article updated successfully" }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
}

exports.getAllArticles = (req, res, next) => {
    Article.find()
        .then(articles => res.status(200).json(articles))
        .catch(error => res.status(400).json({ error }));
}

exports.getArticleById = (req, res, next) => {
    Article.findOne({ _id : req.params.id })
        .then(article => res.status(200).json(article))
        .catch(error => res.status(400).json({ error }));
}