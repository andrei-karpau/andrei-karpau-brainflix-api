const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');

// function for reading data in videos.json
const readFile = () => {
    const videosData = fs.readFileSync('./data/videos.json');
    return JSON.parse(videosData);
}

// function for writing data in videos.json
const writeFile = (videosData) => {
    fs.writeFileSync('./data/videos.json', JSON.stringify(videosData, null, 2));
}

router.get(`/videos`, (req, res) => {
    const videosData = readFile();
    res.send(videosData);
});

router.get(`/videos/:id`, (req, res) => {
    const id = req.params.id;
    const videosData = readFile();
    const video = videosData.find(video => video.id === id);

    if (!video) {
        return res.status(404).send('Video not found');
    }

    res
        .status(200)
        .send(videosData.filter(video => video.id === id));
});

// post request for upload form
router.post('/', (req, res) => {
    const { title, description, image } = req.body;
    if (!title || !description) {
        return res.status(400).send('Please make sure to include title and description of the video');
    }

    const uploadVideo = {
        id: uuid(),
        title: title,
        channel: 'Andrei Karpau',
        image: image,
        description: description,
        views: 45,
        likes: 38,
        duration: "03:06",
        timestamp: Date.now(),
        comments: []
    };

    const videosData = readFile();
    videosData.push(uploadVideo);
    writeFile(videosData);
    res.status(201).json(uploadVideo);
});

// post request for adding comments
router.post('/:id/comments', (req, res) => {
    const { name, comment } = req.body;
    let id = req.params.id;
    const videosData = readFile();
    let selectedVideo = videosData.find(video => video.id === id);

    const newComment = {
        name: name,
        comment: comment,
        id: uuid(),
        likes: 0,
        timestamp: Date.now()
    };

    selectedVideo.comments.unshift(newComment)
    writeFile(videosData)
    res.status(200).send(videosData);
});

module.exports = router;