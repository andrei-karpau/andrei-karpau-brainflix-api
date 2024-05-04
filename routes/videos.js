const express = require('express');
const router = express.Router();
const videosJSON = require('../data/videos.json');

router.get(`/videos`, (req, res) => {
    res.send(videosJSON);
});

router.get(`/videos/:id`, (req, res) => {
    const id = req.params.id;
    res.send(videosJSON.filter(video => video.id === id));
});

module.exports = router;