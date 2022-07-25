const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Game = require('../models/videogame');
const Messages = require('../../messages/messages')


router.get("/", (req, res, next) =>{
   Game.find({})
   .then(result => {
    res.status(200).json({
        message: Messages.game_found,
        game:{
            _id: result.id,
            title: result.title,
            developer: result.developer
        }, 
        metadata: {
            host: req.hostname,
            method: req.method
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
   })
});


router.post("/", (req, res, next) =>{
    Game.find({
        title: req.body.title,
        developer: req.body.developer
    })
    .exec()
    .then(result => {
        console.log(result);
        if(result.lenght > 0){
            return res.status(406).json({
                message: Messages.game_cat
            })
        }
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
                message: Messages.game_saved,
                game: {
                    _id: result._id,
                    title: result.title,
                    developer: result.developer
                }, 
                metadata: {
                    host: req.hostname,
                    method: req.method
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
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    })
});


router.get("/:videoId", (req, res, next) =>{
    const videoId = req.params.videoId
    Game.findById(videoId)
    .then(result => {
        res.status(200).json({
            message: Messages.game_found,
            game: {
                _id: videoId,
                title: result.title,
                developer: result.developer
            }, 
            metadata: {
                host: req.hostname,
                method: req.method
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
    })
});

router.patch("/:videoId", (req, res, next) =>{
    const videoId = req.params.videoId
    const updatedGame = {
        title: req.body.title,
        developer: req.body.developer
    };
    Game.updateOne({
        _id: videoId,
    }, {
        $set: updatedGame
    })
    .then(result => {
        res.status(200).json({
            message: Messages.game_update,
            game: {
                _id: videoId,
                title: result.title,
                developer: result.developer
            }, 
            metadata: {
                host: req.hostname,
                method: req.method
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
    })
});

router.delete("/:videoId", (req, res, next) =>{
    const videoId = req.params.videoId
    Game.remove({_id: videoId})
    .then(result => {
        res.status(200).json({
            message: Messages.game_delete,
            game: {
                _id: videoId,
                title: result.title,
                developer: result.developer
            }, 
            metadata: {
                host: req.hostname,
                method: req.method
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
    })
});

module.exports = router;