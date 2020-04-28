
window.addEventListener('load', function () {
    var toward_l = document.querySelector('.toward_l');
    var toward_r = document.querySelector('.toward_r');
    var box = document.querySelector('.box');
    var ol = document.querySelector('.box ol');
    var ul = document.querySelector('.box ul');
    box.addEventListener('mouseenter', function () {
        toward_l.style.display = 'block';
        toward_r.style.display = 'block';
        clearInterval(timer);
    })
    box.addEventListener('mouseleave', function () {
        toward_l.style.display = 'none';
        toward_r.style.display = 'none';
        timer = setInterval(function () {
            toward_r.click();
        }, 2000)
    })

    for (var i = 0; i < ul.children.length; i++) { //根据图片数量设置小圆点的个数
        var lis = document.createElement('li');
        ol.appendChild(lis);
        ol.children[0].className = 'current';
        ol.children[i].setAttribute('index', i); //创建属性名索引

    }
    for (var i = 0; i < ol.children.length; i++) { //使用排他算法设置小圆点的颜色
        ol.children[i].addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index'); //获得小圆点的索引号

            circle = index; //链接起了小圆点的点击事件与左右箭头的点击
            num = index;

            var step = -box.offsetWidth * index;
            animate(ul, step); //根据小圆点来移动图片
        })
    }
    var num = 0; //用于点击箭头图片移动
    var circle = 0; //用于点击箭头小圆圈移动
    var img_clone = ul.children[0].cloneNode(true); //true为深克隆
    var demo = true;
    ul.appendChild(img_clone); //将克隆好的图片节点插入ul中
    toward_r.addEventListener('click', function () {
        if (demo) { //创建溢流阀
            demo = false;

            if (num == ul.children.length - 1) { //当其为最后一张图片时，我们让其复原，相当于最后一张图片为第一张图片
                num = 0;
                ul.style.left = 0; //我们直接让其变为最初的距离，达到无缝切换的作用
            }
            num++;
            step = -box.offsetWidth * num; //取得图片需要移动的距离
            animate(ul, step, function () {
                demo = true;
            }); //让图片移动

            circle++;
            if (circle == ol.children.length) { //当小圆点为最后一个时让其清零
                circle = 0;
            }
            circleChange();
        }

    })

    toward_l.addEventListener('click', function () {
        if (demo) {
            demo = false;
            if (num == 0) { //当其为第一张图片时，我们让其变为克隆后的那张图片
                num = ul.children.length - 1;
                ul.style.left = -box.offsetWidth * num + 'px'; //这里的距离为负值，并且记得加px
            }
            num--;
            step = -box.offsetWidth * num; //取得图片需要移动的距离
            animate(ul, step, function () {
                demo = true;
            }); //让图片移动


            circle--;
            if (circle == -1) { //当小圆点为最后一个时让其清零
                circle = ol.children.length - 1;
            }
            circleChange();
        }

    })


    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';

    }

    var timer = setInterval(function () {
        toward_r.click();
    }, 2000)
})