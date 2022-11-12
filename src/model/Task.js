const {Schema, model} = require('mongoose')


const taskSchema = new Schema ({
    title:{
        type:String,
        required: true,
        minlength:3,
        maxlength:20,
    },
    description:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
    },
},{timestamps:true}
)

const taskModel = model('tasks',taskSchema)

module.exports = taskModel