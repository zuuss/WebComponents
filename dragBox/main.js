var boxBar = document.getElementById('bar'),
	box = document.getElementById('box');

window.onload = drag;

function drag() {
	boxBar.onmousedown = fnDown;
}

function fnDown(e) {
	//兼容ie
	e = e || window.event;
	//距离
	var disX = e.clientX - box.offsetLeft,
		disY = e.clientY - box.offsetTop;
	//移动
	document.onmousemove = function(e) {
		e = e || window.event;
		fnMove(e, disX, disY);
	}
	//释放 停止操作
	document.onmouseup = function() {
		document.onmousemove = null;
		document.onmouseup = null;
	}
}

function fnMove(e, x, y) {
	var l = e.clientX - x,
		t = e.clientY - y,
		winWidth = document.documentElement.clientWidth || document.body.clientWidth,
		winHeight = document.documentElement.clientHeight || document.body.clientHeight,
		maxW = winWidth - box.offsetWidth;
		maxH = winHeight - box.offsetHeight;
	//限制移动超出可视区域
	if (l<0) {
		l = 0;
	}else if(l>maxW) {
		l = maxW;
	}
	if (t<0) {
		t = 0;
	}else if(t>maxH) {
		t = maxH;
	}
	//设置box位置参数
	box.style.left = l + 'px';
	box.style.top = t + 'px';
}