const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) =>{
    res.json({
        message: 'Videogames -GET',
    })
})

router.post("/", (req, res, next) =>{
    res.json({
        message: 'Videogames -POST',
    })
})

router.get("/:videoId", (req, res, next) =>{
    const videoId = req.params.videoId
    res.json({
        message: 'Videogames -GET BY ID',
        id: videoId
    })
})

router.patch("/:videoId", (req, res, next) =>{
    const videoId = req.params.videoId
    res.json({
        message: 'Videogames -PATCH BY ID',
        id: videoId
    })
})

router.delete("/:videoId", (req, res, next) =>{
    const videoId = req.params.videoId
    res.json({
        message: 'Videogames -DELETE BY ID',
        id: videoId
    })
})

module.exports = router;