const Task = require("../model/Task")



// Add a task
exports.addTask = async (req,res)=>{
    try {
        let task = await req.body
        let taskCreated = await Task.create(task)
        if (!taskCreated){
            res.status(400).json({
                success:false,
                message: "task creation failed"
            })
        }
        res.status(201).json({
            success:true,
            message: "Task Created Successfully",
            task: taskCreated
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            messsage: 'Internal server error',
            error: error.message,
        })
        
    }
}


//Update a task
exports.updateTask = async (req,res) =>{
    try {
        let id = {_id:req.params.id}
        let task = await req.body
        let update = await Task.findOneAndUpdate(id,task,{new: true})
        if(!update){
            res.status(400).json({
                success:false,
                message: "Task not updated"
            })
        }
        res.status(200).json({
            success: true,
            message: "Task updated",
            task: update,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error: error.message
        })
    }
} 


//Get all tasks
exports.getAllTasks = async (req,res) => {
    try {
        let tasks = await Task.find()
        if(tasks.length === 0){
            return res.status(404).json({
                success:false,
                message: 'No tasks were found'
            })
        }
        res.status(200).json({
            success: true,
            message: "tasks found",
            tasks
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        })
        
    }
}


//Get a single user
exports.getTask =async (req,res) => {
    try {
        let id = {_id: req.params.id}
        let task = await Task.findOne(id)
        if(!task){
            res.status(404).json({
                success:false,
                message: 'Task not found'
            })}
        res.status(200).json({
            success:true,
            message: 'Task found',
            task,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error: error.message
        })
    }
}

//Delete a task
exports.deleteTask =async (req,res) => {
    try {
        let id = {_id:req.params.id}
        let task = await req.body
        let deleted = await Task.findOneAndRemove(id)
        if (!deleted){
            res.status(400).json({
                success:false,
                message: "Task not deleted"
            })
        }
        res.status(200).json({
            success: true,
            message: "Task deleted",
            task: deleted,
        })
      } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error: error.message
        })
        
      }
}