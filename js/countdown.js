
function addZeroes(x){
	x = x+"";
	if(x.length < 2){
		x = "0"+x;
	}
	return x;
}

function getStyle(elem, prop){
	return window.getComputedStyle(elem, null).getPropertyValue(prop);
}

function Flipper(x, y, h, w){
	this.x = x;
	this.y = y;
	this.height = h;
	this.width = w;
	this.state = 1;
	
	this.container = document.createElement("div");
	this.container.style.position = "absolute";
	this.container.style.top = y + "px";
	this.container.style.left = x + "px";
	this.container.style.height = this.height + "px";
	this.container.style.width = this.width + "px";
	this.container.style.perspective = "1000px";
	//this.container.style.border = "1px solid green";
	
	this.flipper = document.createElement("div");
	this.flipper.style.position = "absolute";
	this.flipper.style.top = 0;
	this.flipper.style.left = 0;
	this.flipper.style.height = this.height + "px";
	this.flipper.style.width = this.width + "px";
	this.flipper.style.transformStyle = "preserve-3d";
	this.flipper.style.transitionDuration = "1s";
	//this.flipper.style.border = "1px solid red";
	
	this.container.appendChild(this.flipper);
	
	this.front = document.createElement("div");
	this.front.style.position = "absolute";
	this.front.style.zIndex = 2;
	this.front.style.height = "100%";
	this.front.style.width = "100%";
	//this.front.style.background = "grey";
	this.front.style.transform = "rotateY(0deg)";
	this.front.style.backfaceVisibility = "hidden";
	
	this.flipper.appendChild(this.front);
	
	this.back = document.createElement("div");
	this.front.style.position = "absolute";
	this.back.style.height = "100%";
	this.back.style.width = "100%";
	//this.back.style.background = "teal";
	this.back.style.transform = "rotateY(180deg)";
	this.back.style.backfaceVisibility = "hidden";
	
	this.flipper.appendChild(this.back);
	
	this.flip = function(){
		if(this.state == 1){
			this.flipper.style.transform = "rotateY(180deg)";
			this.state = 2;
		}
		else if(this.state == 2){
			this.flipper.style.transform = "rotateY(0deg)";
			this.state = 1;
		}
	};
	
	this.attach = function(e){
		e.appendChild(this.container);
	};
	
	this.setFront = function(elem){
		this.front.appendChild(elem);
		var w = parseFloat(getStyle(elem, "width"));
		var h = parseFloat(getStyle(elem, "height"));
		
		var scaleX = this.width/w;
		var scaleY = this.width/h;
		
		//alert(scaleX);
		elem.style.transformOrigin = "0 0";
		elem.style.transform = "scaleX("+scaleX+") scaleY("+scaleY+")";
	};
	
	this.setBack = function(elem){
		this.back.appendChild(elem);
		var w = parseFloat(getStyle(elem, "width"));
		var h = parseFloat(getStyle(elem, "height"));
		
		var scaleX = this.width/w;
		var scaleY = this.width/h;
		
		//alert(scaleX);
		elem.style.transformOrigin = "0 0";
		elem.style.transform = "scaleX("+scaleX+") scaleY("+scaleY+")";
	};
	
}


function CountDown(){
	
	this.setTime = function(obj){
		this.year = obj.year;
		this.month = obj.month;
		this.day = obj.day;
	};
	
	this.setDimensions = function(x, y, s){
		this.x = x;
		this.y = y;
		this.size = s;
		this.canv = document.createElement("canvas");
		this.canv.setAttribute("id", "countDown");
		this.ctx = this.canv.getContext("2d");
		this.ctx.canvas.width = s;
		this.ctx.canvas.height = s;
		this.ctx.lineWidth = s*0.03;
		this.ctx.lineCap = "round";
		//this.ctx.globalAlpha = 0.5;
		this.ctx.fillStyle = "white";
		this.ctx.strokeStyle = "white";
		this.ctx.fontWeight = "bolder";
	};
	
	this.getInElementForm = function(){
		return this.canv;
	};
	
	
	this.start = function(){
		
		var temp = this;
		
		var loop, angle, tempAngle;
		var t = 0;
		
		setInterval(function(){
			var ctx = temp.ctx;
			var sec = addZeroes(60 - new Date().getSeconds());
			var min = addZeroes(60 - new Date().getMinutes());
			var hr = addZeroes(24 - new Date().getHours() - 1);
			//var days = new Date().getDays();
			angle = 6*sec*(Math.PI/180);
			tempAngle = angle - 6*Math.PI/180;

			
			var oneDay = 24*60*60*1000;
			var firstDate = new Date();
			var secondDate = new Date(temp.year, temp.month-1, temp.day);

			var day = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
			day = addZeroes(day);
			
			var sign = firstDate.getTime() > secondDate.getTime() ? -1 : 1;
			
			clearInterval(loop);
			
			t = 0.005;
			
			loop = setInterval(function(){
				if(tempAngle < angle){
			
					ctx.clearRect(0, 0, temp.size, temp.size);
			
					ctx.beginPath();
					ctx.arc(temp.size/2, temp.size/2, temp.size/2-ctx.lineWidth, -Math.PI/2, -Math.PI/2 - tempAngle, false);
					
					var daysText = day + " days";
					var hoursText = hr + "h";
					var minsText = min + "m";
					var secText = sec + "s";
					
					if(sign > 0){
						var timeText = hoursText + " : " + minsText + " : " + secText;
						var textHeight = temp.size/12;
						var daysTextWidth = ctx.measureText(daysText).width;
						var timeTextWidth = ctx.measureText(timeText).width;
						var secTextWidth = ctx.measureText(secText).width;

						//ctx.save();
						ctx.font = textHeight+"px batmanForever";
						ctx.textBaseline = "middle";
						//ctx.fillStyle = "white";
						ctx.fillText(daysText, (temp.size-daysTextWidth)/2, (temp.size)/2-1.5*textHeight, daysTextWidth, 100);
						ctx.fillText(timeText, (temp.size-timeTextWidth)/2, (temp.size)/2, timeTextWidth, 100);
						ctx.fillText("to go...", (temp.size-ctx.measureText("to go...").width)/2, (temp.size)/2+1.5*textHeight, ctx.measureText("to go...").width, 100);
						ctx.stroke();
						ctx.closePath();
						tempAngle += 0.1*Math.PI/180 + t;
						t += 0.005;
						//ctx.restore();
					}
					else if(day == 01 || day == 02 || day == 03){
						var text1 = "Live now!";
						var text2 = "Day "+day;
						var textWidth = ctx.measureText(text1).width;
						var textHeight = temp.size/8;
						ctx.font = textHeight+"px serif";
						ctx.textBaseline = "middle";
						ctx.fillText(text1, (temp.size-textWidth)/2, (temp.size)/2 - textHeight, textWidth, 100);
						textWidth = ctx.measureText(text2).width;
						ctx.fillText(text2, (temp.size-textWidth)/2, (temp.size)/2 + textHeight, textWidth, 100);
					}
					else{
					
						var text1 = "Event over!";
						//var text2 = "Day "+day;
						var textWidth = ctx.measureText(text1).width;
						var textHeight = temp.size/8;
						ctx.font = textHeight+"px serif";
						ctx.textBaseline = "middle";
						ctx.fillText(text1, (temp.size-textWidth)/2, (temp.size)/2 - textHeight, textWidth, 100);
						
					
					}
				}
			}, 1000/60);
			
		}, 1000);
	};
}
