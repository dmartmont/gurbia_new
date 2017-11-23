const firebase = require('firebase');
const express = require('express');
const raccoon = require('raccoon');
const natural = require('natural');
const bodyParser = require('body-parser');

const config = require('../database/config');
const classfier = require('./classifier');
const tokenizer = new natural.WordTokenizer();

classfier.train();

const app = new express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
firebase.initializeApp(config);

app.post('/addLiked', (req, res) => {
    const postID = req.body.postID;
    const userID = req.body.userID;
    raccoon.liked(userID, postID);
    res.send({ status: 'OK', statusMesagge: 'Liked posts added' });
});

app.post('/getRecommendations', (req, res) => {
    const numberOfRec = req.body.recs;
    const userID = req.body.userID;
    raccoon.recommendFor(userID, numberOfRec).then((recs) => {
        var posts = [];
        recs.map((postId) => {
            posts.push(postId);
        });
        res.json(posts);
    });
});

app.post('/getTags',(req, res) => {
    const text = req.body.description;
    var list = tokenizer.tokenize(text).map(word => {
        return classfier.getClassifications(word);
    }).filter(classifications => {
        return classifications[0].value != classifications[1].value
    }).map(classification => {
        return classification[0].label;
    });
    var json_list = {
	    tags: list
    }; 
    res.json(json_list);
});

app.listen(PORT);
