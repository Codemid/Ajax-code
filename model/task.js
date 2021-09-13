const mongoose = require('mongoose');

//创建任务表规则
const taskSchema = new mongoose.Schema({
    completed: Boolean,
    title: String
})

//创建任务表
const Task = mongoose.model('Task',taskSchema);

//插入数据
// const task = new Task({
//     completed: false,
//     title: '吃电饭锅地方饭'
// })
// task.save((err,ret) => {
//     if(err) {
//         console.log('保存失败');
//     }else {
//         console.log(ret);
//     }
// });

module.exports = {
    Task
}