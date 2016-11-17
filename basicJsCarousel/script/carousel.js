
/*
 * 全局变量
 */

 var container = $('carousel-box'),
     picList = $('carousel-pic-list'),
     indicators = $('carousel-indicators').getElementsByClassName('carousel-inditem'),
     prev = $('carousel-prev'),
     next = $('carousel-next'),
     index = 1, // 保存点击的目标下标
     timer; // 自动播放定时器

/*
 * 自定义工具函数
 */

// 封装一个id选择器
function $(idName) {
    return document.getElementById(idName);
}

// 读取css样式
function getStyle(el, styleName) {
    if( el.currentStyle ) {
        // for IE
        return el.currentStyle[styleName];
    } else {
        // for peace
        return getComputedStyle(el, false)[styleName];
    }
}

/*
 * 滑动轮播代码
 */

// 导航原点切换
function indicator() {
    for (var i = 0; i < indicators.length; i++) {
        if (indicators[i].classList.contains('ci-active')) {
            indicators[i].classList.remove('ci-active');
        }
        indicators[index-1].classList.add('ci-active');
    }
}

// 点击切换图片
function switchPic(offset) {
    // 当前位置
    var curPosition = parseInt(picList.style.left) + offset;
    // 修改位置
    picList.style.left = curPosition + 'px';
    if (curPosition > 0) {
        picList.style.left = -2000 + 'px';
    }
    if (curPosition < -2000) {
        picList.style.left = 0 + 'px';
    }
}
prev.onclick = function () {
    if (index == 1) {
        index = totalPic;
    }else{
        index -= 1;
    }
    indicator();
    switchPic(500);
}
next.onclick = function () {
    if (index == totalPic) {
        index = 1;
    }else{
        index += 1;
    }
    indicator();
    switchPic(-500);
}

// 导航原点控制
var aimIndex,
    offset;
for (var i = 0; i < indicators.length; i++) {
    indicators[i].onmouseover = function () {
        if (this.classList.contains('ci-active')) {
            return;
        }
        aimIndex = parseInt(this.dataset.index);
        offset = -500 * (aimIndex - index);
        index = aimIndex;
        indicator();
        switchPic(offset);
    }
}

// 自动播放
function play() {
    timer = setInterval(function() {
        next.onclick();
    }, 2000);
}
function stop() {
    clearInterval(timer);
}
play();
// 自动 播放/暂停 事件
container.onmouseover = stop;
container.onmouseout = play;
