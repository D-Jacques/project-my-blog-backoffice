const mongoose = require('mongoose');
const articleModel = require('../models/article');

async function setNewIdKeyForArticles() {
    await mongoose.connect("mongodb://localhost:27017/my-blog-db");
    console.log("Connected to MongoDB");

    const articles = await articleModel.find({ id : { $exists : false } }).sort({ _id : 1 });
    console.log(`Found ${articles.length} articles without 'id' field.`);

    for (let i = 0; i < articles.length; i++) {
        articles[i].id = i + 1;
        await articles[i].save();
        console.log(`Updated article with _id: ${articles[i]._id}, set id: ${articles[i].id}`);
    } 

    console.log("All articles updated successfully.");
    await mongoose.disconnect();
}

setNewIdKeyForArticles().catch(console.error);