
function Son(obj){
	this.obj = document.getElementsByClassName(obj)[0];
	this.oLis = this.obj.children;
	this.oImges = this.obj.nextElementSibling;

	this.prev = null;
	this.next = null;
	this.prev = '';
	this.next = '';

	this.oNums = 0;
	this.timer = null;
	this.str = '';

	this.settings = {	// 默认配置
		event : 'click',
		time : null,
		left : 'prev',
		right : 'prev',
		changeImg : true,
	};

	for(var i = 0; i < this.oLis.length; i++){
		this.str += '<li>' + (i+1) + '</li>';
		// console.log(this.str);
	}
	this.oImges.innerHTML = this.str;
	// console.log(this.oImges.innerHTML);
	this.oImges.children[0].className = 'active';
}
Son.prototype.init = function(opt){
	extend(this.settings,opt);

	function addEvent(ele,event,fun,ft){	// 事件添加兼容写法
		if(ele.attachEvent){
			ele.attachEvent('on' + event,fun);
		}else{
			ele.addEventListener(event,fun,ft);
		}
	}

	this.Time();
	var that = this;

	if(this.settings.changeImg){
		this.prev = document.createElement('div');
		this.next = document.createElement('div');
		this.next.innerHTML = '>';
		this.prev.innerHTML = '<';
		this.next.className = this.settings.right;
		this.prev.className = this.settings.left;
		this.obj.parentNode.appendChild(this.next);
		this.obj.parentNode.appendChild(this.prev);
		// console.log(this.prev);
	
		addEvent(this.prev,'click',function(){	// 左箭头单击事件
			that.oNums--;
			if(that.oNums < 0){
				that.oNums = that.oLis.length - 1;
				// console.log('aaa');
			}
			that.Dots(that.oNums);
		},false);

		addEvent(this.next,'click',function(){		// 右箭头单击事件
			that.oNums++;
			if(that.oNums > that.oLis.length - 1){
				that.oNums = 0;
			}
			that.Dots(that.oNums);
		},false);

		addEvent(this.obj.parentNode,'mouseover',function(){// 为鼠标进入,离开盒子添加事件
			that.prev.style.display = 'block';
			that.next.style.display = 'block';
			that.eliminate();
		},false);

		addEvent(this.obj.parentNode,'mouseout',function(){
			that.prev.style.display = 'none';
			that.next.style.display = 'none';
			that.Time();
		},false);
	}else{
		this.prev = '';
		this.next = '';
	}
	for(var i = 0; i < this.oImges.children.length; i++){	// 给小圆点添加事件
		this.oImges.children[i].index = i;
		addEvent(this.oImges.children[i],this.settings.event,function(){
			that.Dots(this.index);
			// console.log(this.index);
			that.oNums = this.index;
		},false);
	}
}

Son.prototype.Dots = function(n){  // 小圆点的事件执行程序

	for(var i = 0; i < this.oImges.children.length; i++){
		this.oImges.children[i].className = '';
	}
	this.oImges.children[n].className = 'active';
	// console.log(n);
	this.obj.style.left = -(n * this.oLis[0].offsetWidth) + 'px';
}
Son.prototype.Time = function(){
	var that = this;
	if(this.settings.time != null){
		this.timer = setInterval(function(){
			that.oNums++;
			if(that.oNums < 0){
				that.oNums = that.oLis.length - 1;
			}
			if(that.oNums > that.oLis.length - 1){
				that.oNums = 0;
			}
			that.Dots(that.oNums);
		},this.settings.time);
	}
}
Son.prototype.eliminate = function(){  //清除自己的定时器
	clearInterval(this.timer) 
}
function extend(obj1,obj2){
	for(var attr in obj2){
		obj1[attr] = obj2[attr];
	}
}