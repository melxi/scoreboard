const usersRouter =  require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({msg: 'Content not found'})
    }
})

usersRouter.post('/', async (req, res) => {
    console.log(req.body)
    const user = User({
        username: req.body.username,
        score: req.body.score,
        country: req.body.country
    })

    
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(400).json({msg: 'Failed to add a score'})
    }
    
})

module.exports = usersRouter