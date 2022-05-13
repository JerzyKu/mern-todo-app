const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task:{
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now()
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model("tasks", taskSchema)