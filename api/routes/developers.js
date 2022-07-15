const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) =>{
    res.json({
        message: 'Developers -GET',
    })
})

router.post("/", (req, res, next) =>{
    res.json({
        message: 'Developers -POST',
    })
})

router.get("/:developId", (req, res, next) =>{
    const developId = req.params.developId
    res.json({
        message: 'Developers -GET BY ID',
        id: developId
    })
})

router.patch("/:developId", (req, res, next) =>{
    const developId = req.params.developId
    res.json({
        message: 'Developers -PATCH BY ID',
        id: developId
    })
})

router.delete("/:developId", (req, res, next) =>{
    const developId = req.params.developId
    res.json({
        message: 'Developers -DELETE BY ID',
        id: developId
    })
})


module.exports = router;