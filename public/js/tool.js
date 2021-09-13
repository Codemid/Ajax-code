//添加类移除类
function toggleClass(option) {
    $(option).addClass('selected');
    $(option).parent().siblings().find('a').removeClass('selected');
}
//模版拼接复用方法
function  render(arr) {
    //哪个模版和哪个数据拼接
    var html = template('taskTpl', { task: arr })
    //追加模版
    taskBox.html(html);
}

//用于计算未完成任务的数量
function calcCount() {
    var count = 0;
    //未完成的就是数组里completed为false的任务
    var newArr = taskAry.filter(item => item.completed == false);
    //未完成的数量就是数组的长度
    count = newArr.length;
    strong.text(count);
}