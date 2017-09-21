playone = true;
playtwo = false;

opt_pone = -1;
opt_ptwo = -1;
imgs =[];


/*preload function of p5.js*/
function preload() {
  myFont = loadFont('ARCADECLASSIC.TTF');
}


/*setup function of p5.js*/
function setup(){
	textFont(myFont);
	
	setFrameRate(40)
	createCanvas(500, 500);
	imgs[0] = loadImage("rock.png"); 
	imgs[1] = loadImage("paper.png"); 
	imgs[2] = loadImage("scrissors.png"); 

	
}

/*draw function of p5.js*/
function draw(){
	textAlign(CENTER);
	background(0);
	textSize(30);
	fill(random(255),random(255),random(255))
	text("Rock Paper and Scrissors", 250, 60);
	
	fill(255)
	textSize(20);
	if(playone){
		textSize(25);
		text("Player 1  Press", 240, 210);
		textSize(20);
		text("1 to Rock", 250, 230);
		text("2 to Paper and", 250, 250);
		text("3 to Scissors", 250, 270);
	}else if(playtwo){
		textSize(25);
		text("Player 2  Press", 240, 210);
		textSize(20);
		text("1  to  Rock", 250, 230);
		text("2  to  Paper and", 250, 250);
		text("3  to  Scissors", 250, 270);
	}else{
		textSize(25);
		text("Result", 250, 210);
		textSize(20);
		text(chekWin()+"  win!", 250, 240);
		text("x", 250, 340);
		image(imgs[opt_pone-1], 120, 300);
		text("Player 1 ", 150, 370);
		image(imgs[opt_ptwo-1], 330, 300);
		text("Player 2", 350, 370);
		
	}
}

function chekWin(){
	if(opt_pone == 1 && opt_ptwo == 3)
		return "Player  1";
	else if(opt_pone == 2 && opt_ptwo == 1)
		return "Player  1";
	else if(opt_pone == 3 && opt_ptwo == 2)
		return "Player  1";
	
	if(opt_ptwo == 1 && opt_pone == 3)
		return "Player  2";
	else if(opt_ptwo== 2 && opt_pone == 1)
		return "Player  2";
	else if(opt_ptwo == 3 && opt_pone == 2)
		return "Player  2";
	
	return "No Player ";
}
function keyPressed(){
	if(key === '1'){
		if(playone){
			opt_pone = 1;
			changePlayer();
		}else if(playtwo){
			opt_ptwo = 1;
			finishMatch();
		}
	}else if(key === '2'){
		if(playone){
			opt_pone = 2;
			changePlayer();
		}else if(playtwo){
			opt_ptwo = 2;
			finishMatch();
		}
	}else if(key === '3'){
		if(playone){
			opt_pone = 3;
			changePlayer();
		}else if(playtwo){
			opt_ptwo = 3;
			finishMatch();
		}
	}else if(keyCode === ESCAPE){
		restartGame()
	}
	
	
}

function restartGame(){
	playone = true;
	playtwo = false;

	opt_pone = -1;
	opt_ptwo = -1;
}

function changePlayer(){
	playone = false;
	playtwo = true;
}

function finishMatch(){
	playtwo = false;
}