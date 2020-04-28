function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () { //给对象添加方法的形式添加定时器
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if (callback) {
                callback(); //在定时器停止时调用
            }
        }
        obj.speed = (target - obj.offsetLeft) / 20; //此公式达到速度递减的作用
        //此公式保证了后退时的精度问题
        obj.speed = obj.speed > 0 ? Math.ceil(obj.speed) : Math.floor(obj.speed);
        obj.style.left = obj.offsetLeft + obj.speed + 'px'; //通过成比例的减小步长而达到控制精度的目的
    }, 15); //设置成每隔15毫秒触发一次(推荐)
}