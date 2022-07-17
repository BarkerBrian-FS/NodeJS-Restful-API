const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Game = require('../models/videogame')

router.get("/", (req, res, next) =>{
    res.json({
        message: 'Videogames -GET',
    })
});

router.post("/", (req, res, next) =>{
    res.json({
        message: 'Videogames -POST',
    });

    const newGame = new Game({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        developer: req.body.developer
    });
    //Write to the DB
    newGame.save()
    .then(result => {
        console.log(result)
        res.status(200).json({
            message: "Game saved",
            game: {
                title: result.title,
                developer: result.developer
            }
        })
    })
    .catch(err => {
        console.error(err.message);
        res.status(500).json({
            error: {
              message: err.message
            }
        })
    });
});

router.get("/:videoId", (req, res, next) =>{
    const videoId = req.params.videoId
    res.json({
        message: 'Videogames -GET BY ID',
        id: videoId
    })
});

router.patch("/:videoId", (req, res, next) =>{
    const videoId = req.params.videoId
    res.json({
        message: 'Videogames -PATCH BY ID',
        id: videoId
    })
});

router.delete("/:videoId", (req, res, next) =>{
    const videoId = req.params.videoId
    res.json({
        message: 'Videogames -DELETE BY ID',
        id: videoId
    })
});

module.exports = router;