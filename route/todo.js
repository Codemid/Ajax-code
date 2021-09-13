//引入express框架
const express = require('express');

const {Task} = require('../model/task');

//
const Joi = require('joi');
//创建任务路由
const todoRoute = express.Router();

//获取任务列表
todoRoute.get('/task', async (req, res) => {
    const data  = await Task.find();
    res.send(data);
})

//添加任务
todoRoute.post('/addTask', async (req,res) => {
    // 接收客户端传递过来的任务名称
	const { title } = req.body;
	// 验证规则
	const schema = {
		title: Joi.string().required().min(2).max(30)
	};
	// 验证客户端传递过来的请求参数 
	const { error } = Joi.validate(req.body, schema);
	// 验证失败
	if (error) {
		// 将错误信息响应给客户端
		return res.status(400).send({message: error.message})
	}
	// 创建任务实例
	const task = new Task({title: title, completed: false});
	// 执行插入操作
	await task.save();
	// 响应
	setTimeout(() => {
		res.send(task);
	}, 2000)
    
})

//删除任务
todoRoute.get('/delTask', async (req,res) => {
    const { _id }  = req.query;
    const task = await Task.deleteMany({_id:_id});
    res.send(task)
})

//修改任务状态
todoRoute.post('/modifyTask', async (req, res) => {
    const {_id, completed, title} = req.body;
    const task = await Task.findOneAndUpdate({_id: _id},{
		title: title,
		completed: completed
	},{new: true});
	res.send(task)
   
})

//清除已完成任务
todoRoute.get('/delcompleted', async (req, res) => {
	//返回删除的数量
	const result = await Task.deleteMany({completed: true});
	res.send(result);
})


module.exports = todoRoute;