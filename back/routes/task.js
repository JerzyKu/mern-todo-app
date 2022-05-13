const express = require('express')
const router = express.Router()

const Tasks = require('../models/task')

// get all
router.get('/', async (req, res) => {
    try {
        const tasks = await Tasks.find()
        res.send(tasks)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// get one 
router.get('/:id', getTask, async (req,res) => {
    res.send(res.task)
})

// create one 
router.post('/', async (req, res) => {
    const task = new Tasks({
        task: req.body.task
    })
    try {
        const newTask = task.save()
        res.status(201).json(newTask)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// update one
router.patch('/:id', getTask, async (req,res) => {
    if(req.body.task != null) {
        res.task.task = req.body.task
    }
    if(req.body.isCompleted != null) {
        res.task.isCompleted = req.body.isCompleted
    }
    try {
        const newTask = await res.task.save()
        res.json(newTask)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//delete one
router.delete('/:id', getTask, async (req, res) => {
    try {
        res.task.remove()
        res.json({message: 'Remove correctly'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// middlleware get one 
async function getTask(req,res,next) {
    let task 
    try {
        task = await Tasks.findById(req.params.id)
        if (task == null) {
            return res.status(400).json({message: 'Cannot find task.'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.task = task
    next()
}

module.exports = router