const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Developer = require('../models/developer');
const Messages = require('../../messages/messages');

router.get("/", (req, res, next) =>{
   Developer.find()
   .select("game name")
   .populate("game", "title ")
   .then(Developer => {
    res.status(200).json({
        message: Messages.dev_found,
        developer:Developer
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
    Developer.find({
        game: req.body.game,
        name: req.body.name,
    })
    .select("game name")
    .populate("game", "title ")
    .exec()
    .then(result => {
        console.log(result);
        if(result.lenght > 0){
            return res.status(406).json({
                message: Messages.dev_cat
            })
        }
        const newDeveloper = new Developer({
            game: req.body.game,
            name: req.body.name
        });
        //Write to the DB
        newDeveloper.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: Messages.dev_save,
                game: {
                    game: result.game,
                    name: result.name
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
                message: Messages.dev_unable + req.body.game
            }
        })
    })
});


router.get("/:developId", (req, res, next) =>{
    const developId = req.params.developId
    Developer.findById(developId)
    .select("game name")
    .populate("game", "title ")
    .exec()
    .then(developer => {
        res.status(200).json({
            message: Messages.dev_found,
            developer: developer,
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

router.patch("/:developId", (req, res, next) =>{
    const developId = req.params.developId
    const updatedDeveloper = {
        title: req.body.title,
        developer: req.body.developer
    };
    Developer.updateOne({
        _id: developId,
    }, {
        $set: updatedDeveloper
    })
    .then(result => {
        res.status(200).json({
            message: Messages.dev_update,
            game: {
                _id: developId,
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

router.delete("/:developId", (req, res, next) =>{
    const developId = req.params.developId
    Developer.deleteOne({_id: developId})
    .select("game name")
    .populate("game", "title ")
    .exec()
    .then(result => {
        if(!Developer){
            console.log(Developer);
            res.status(404).json({
                message: Messages.dev_not_found
            })
        }
        res.status(200).json({
            message: Messages.dev_delete,
            game: {
                _id: developId,
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