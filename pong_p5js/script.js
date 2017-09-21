p1 = null;
p2 = null;
b = null;

isstart = true;
op_start = 100;

/*preload function of p5.js*/
function preload() {
  myFont = loadFont('ARCADECLASSIC.TTF');
}


/*setup function of p5.js*/
function setup(){
	textFont(myFont);
	createCanvas(500, 500);
	setFrameRate(20)
	p1 = new Player(5);
	p2 = new Player(465);
	b = new Ball();
}

/*draw function of p5.js*/
function draw(){
	background(0);
	
	if(isstart){
		drawTitle();
	}else{
		drawTotal();
		p1.show();
		p2.show();
		b.update();
		b.show();
	}
	
}


/*function of draw totals of p1 and p2*/
drawTotal = function(){
	
	fill(255,255,255,100);
	textSize(40);
	text(p1.total, 10, 210);
	text(p2.total, 10, 300);
	//draw a rect in middle of canvas
	for(var i=0; i<500; i+=60)
		rect(i,240,20,10);
	
}

drawTitle = function(){
	fill(255,255,255);
	textSize(50);
	text("PONG", 190, 230);
	
	textSize(20);
	text("powered  by  p5 js", 170, 270);
	
	if(op_start<0)
		op_start = 255;
	fill(255,255,255,op_start-=10);
	textSize(10);
	text("press Space for play", 195, 300);
}

restartGame = function(){
	p1.x = 185;
	p2.x = 185;
	b.x = 250;
	b.y = 250;
}
function keyPressed(){
	if(isstart && keyCode === 32){
		isstart = false;
		console.log("o")
	}else{
		if(keyCode === LEFT_ARROW){
			p1.movex(-1);
		}else if(keyCode === RIGHT_ARROW){
			p1.movex(1);
		}
		
		if(key === "Q"){
			p2.movex(-1);
		}else if(key === "W"){
			p2.movex(1);
		}
	}
}


/*Class BALL*/
function Ball(){
	this.x = 250;
	this.y = 250;
	this.w = 20;
	this.h = 20;
	this.yspeed = 5;
	this.xspeed = 10;
	this.path = [];
	
	this.update = function()
	{
		if(this.path.length < 5){
			this.path.push(createVector(this.x, this.y));
		}else{
			this.path.shift();
		}
		
		
		if((this.y < p1.y+p1.h && this.y > p1.y+p1.h-10 && this.x > p1.x && this.x < p1.x+p1.w) 
		||(this.y+this.h > p2.y && this.y < p2.y+10 && this.x > p2.x && this.x < p2.x+p1.w)
			){
			this.invertdiry();
			this.changedirx();
		}
		
		if( (this.xspeed < 0  && this.x < 0) || (this.xspeed > 0  && this.x > 480 ) ) {
			this.invertdirx();
		}
		
		if(this.y < 0){
			p2.addTotal();
			restartGame();
		}
		
		if(this.y > 500){
			p1.addTotal();
			restartGame();
		}
		this.x += this.xspeed;
		this.y += this.yspeed;
		
	
	}
	
	this.show = function(){	
		fill(255, 255,255);
		rect(this.x,this.y,this.w,this.h);
		
		for(var i=0; i < this.path.length; i++){
			fill(255, 255,255, 20*i);
			stroke(0,0,0,0)
			rect(this.path[i].x,this.path[i].y,this.w,this.h);	
		}
	}
	
		
	this.invertdiry = function(){
		 this.yspeed = -this.yspeed;		
	}
	
	this.invertdirx = function(){
		 this.xspeed = -this.xspeed;		
	}
	
	this.changedirx = function(){
		if(this.xspeed> 0)
			this.xspeed = random(9,10);
		else
			this.xspeed = random(-9,-10);
	}
}


/*CLASSE PLAYER*/
function Player(y){
	this.x = 185;
	this.y = y;
	this.speedx=20;
	this.w=150;
	this.h=30;
	this.total = 0;
	
	this.show = function(){	
		fill(255);
		rect(this.x,this.y,this.w,this.h);
	}
	
	this.movex = function(dir){
		this.x += this.speedx*dir;
	}
	
	this.addTotal = function(){
		this.total++;
	}
}
