window.addEventListener('load', function () {
    var that;
    class Tab {
        constructor(id) {
            // 获取到整个tab栏
            that = this;
            this.main = document.querySelector(id);
            this.add = this.main.querySelector('.tabadd');
            this.ul = this.main.querySelector('.fisrstnav ul');
            this.tabscon = this.main.querySelector('.tabscon');
            // init()方法用来给对象绑定事件
            this.init();
        }
        init() {
            this.updateNode();
            // 添加tab栏绑定
            this.add.onclick = this.addTab;
            // tab栏切换绑定
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                // 注意这里不需要加括号，是将方法绑定到li标签上等待触发
                this.lis[i].onclick = this.toggleTab;
                this.remove[i].onclick = this.removeTab;
                this.lis[i].ondblclick = this.editTab;
                this.sections[i].ondblclick = this.editTabContent;
            }
        }
        updateNode() {
            this.lis = this.main.querySelectorAll('li');
            this.sections = this.main.querySelectorAll('section');
            this.remove = this.main.querySelectorAll('.icon-guanbi');
            this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
        }
        // 切换
        toggleTab() {
            // 排他思想先删除其他类
            that.clearClass();
            // 这里面的this指向的都是对应绑定的li标签
            this.className = 'liactive';
            that.sections[this.index].className = 'conactive';

        }
        // 添加一个方法用于在切换时去除所有的类
        clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }
        // 添加
        addTab() {
            var random = Math.random();
            that.clearClass();
            // 这里面的this指向的都是对应绑定的li标签
            var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
            var section = '<section class="conactive">测试' + random + '</section>';
            that.ul.insertAdjacentHTML('beforeend', li);
            that.tabscon.insertAdjacentHTML('beforeend', section);
            // 将新添加的li也绑定相应的事件
            that.init();
        }
        // 删除
        removeTab(e) {
            // this指向的是对应的icon-guanbi
            e.stopPropagation();
            var index = this.parentNode.index;
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();
            // 如果删除的不是选定的li则不需要切换选定状态
            if (document.querySelector('.liactive')) return;
            index--;
            // 短路运算符如果前面的为真则执行后面的，前面为假则不再执行
            that.lis[index] && that.lis[index].click();

        }
        // 编辑
        editTab() {
            // 在双击前首先需要获取span里面的内容
            var str = this.children[0].innerHTML;
            this.children[0].innerHTML = '<input type="text">';
            var span = this.children[0];
            var input = span.children[0];
            input.value = str;
            input.select();
            input.onblur = function () {
                // that.innerHTML = input.value;
                this.parentNode.innerHTML = input.value;
            }
            input.onkeydown = function (e) {
                if (e.keyCode === 13) {
                    this.blur();
                }
            }
        }
        editTabContent() {
            // 在双击前首先需要获取span里面的内容
            var str = this.innerHTML;
            this.innerHTML = '<input type="text">';
            var input = this.children[0];
            input.value = str;
            input.select();
            input.onblur = function () {
                // that.innerHTML = input.value;
                this.parentNode.innerHTML = input.value;
            }
            input.onkeydown = function (e) {
                if (e.keyCode === 13) {
                    this.blur();
                }
            }
        }
    }


    new Tab('#tab');
})
