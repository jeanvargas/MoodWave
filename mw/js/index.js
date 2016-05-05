var canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
document.body.style.margin = "0px";
document.documentElement.style.overflow = 'hidden';

var canvas2 = document.getElementById("canvas2");
canvas2.width = document.body.clientWidth;
canvas2.height = document.body.clientHeight;

// creates the moving shapes on the background canvas
function background(){
  var blue_shape = new createjs.Shape();
  var r = Math.random()+0.2;
	  for (var i = 0; i < 50; i++){
		blue_shape.graphics.f("rgb(144," + (144 + i) + ",212)").drawCircle(0,0,r*i); 
	  } 
	  
	  for (var i = 50; i < 100; i++){
		blue_shape.graphics.f("rgb(80,200," + (212-(i-50)) + ")").drawCircle(0,0,r*i); 
	  } 
	  
	  blue_shape.set({ 
		x:Math.random()*canvas.width, // location
		y:Math.random()*canvas.height, // location
		alpha:0.03, // transparancy
		// Recursive motion function - this is the function that makes them move 
		movement: function (){
			var tMotion = 9000;
		  var rx = Math.random() - 0.5; 
		  var ry = Math.random() - 0.5; 
		  new createjs.Tween.get(this)
							.to({x:this.x+rx*200,y:this.y+ry*200}, 
								 tMotion, createjs.Ease.linear)
							.call(this.movement);
		}
	  }); // set()

  stage.addChild(blue_shape);
  return blue_shape;
}

// Makes blobs on the top-most canvas which, when pressed, randomly emit sound
function Blur(){
  var blury = new createjs.Shape();
  var r = Math.random()+0.2;
	  for (var i = 0; i < 50; i++){
		blury.graphics.f("rgb(" + (144 + i) + ",212,149)").drawCircle(0,0,r*i); 

	  } 
	  for (var i = 50; i < 100; i++){
		blury.graphics.f("rgb(112," + (212 - (i-50)) + ",149)").drawCircle(0,0,r*i); 

	  } 
	  
	  // Random location
	  blury.set({ 
		x:Math.random()*canvas.width,
		y:Math.random()*canvas.height,
		alpha:0.03,float: function (){
			var tMotion = 3000;
		  var rx = Math.random() - 0.5; // x motion
		  var ry = Math.random() - 0.5; // y motion
		  new createjs.Tween.get(this)
							.to({x:this.x+rx*200,y:this.y+ry*200}, 
								 tMotion, createjs.Ease.linear)
							.call(this.float);
		}
	  }); // set()
    
  blury.on("pressmove", function(event) { 
  		event.target.x = event.stageX;
		event.target.y = event.stageY;
		playSound();
		stage2.update();	
	});
blury.on("pressup", function(event) {
		console.log("up");
	});
	
  stage2.addChild(blury);
  return blury;
}

function soundBlob(){
  var sb = new createjs.Shape();
  var r = Math.random()+0.2;
	  for (var i = 0; i < 50; i++){
		sb.graphics.f("rgb(212," + (144 + i) + ",212)").drawCircle(0,0,r*i); 
	  }  
	  
	  for (var i = 50; i < 100; i++){
		sb.graphics.f("rgb(212,200," + (212-(i-50)) + ")").drawCircle(0,0,r*i); 
	  } 
	  
  // Set object location, alpha, and life-giving function
	  sb.set({ 
		x:Math.random()*canvas.width,
		y:Math.random()*canvas.height,
		alpha:0.03,
		// Recursive motion function - this is the function that makes them move 
		float: function (){
			var tMotion = 3000;
		  var rx = Math.random() - 0.5; // x motion
		  var ry = Math.random() - 0.5; // y motion
		  new createjs.Tween.get(this)
							.to({x:this.x+rx*200,y:this.y+ry*200}, 
								 tMotion, createjs.Ease.linear)
							.call(this.float);
		}
	  }); // set()
    
  sb.on("pressmove", function(event) { 
  		event.target.x = event.stageX;
		event.target.y = event.stageY;
		playSound();
		stage2.update();	
	});
sb.on("pressup", function(event) {
		console.log("up");
	});
	
  stage2.addChild(sb);
  return sb;
}


MAX = 50;
function init(){
  stage = new createjs.Stage("canvas"); 
  stage2 = new createjs.Stage("canvas2"); 

  createjs.Ticker.addEventListener("tick", tick); 
  createjs.Ticker.setFPS(60);
  createjs.Ticker.useRAF = false;
  
  var background_blob, b, sblob;
  var sound_blobs = [];
  
  for (var i = 0; i < MAX; i++){
    background_blob = new background();
   	background_blob.movement();
  }
  
   for (var i = 0; i < MAX; i++){
     var b = new Blur();
	 sblob = new soundBlob();
	 sound_blobs.push(sblob);
	 sound_blobs.push(b);
  }
  
  Leap.loop({

  hand: function(hand){
	playSound();
	var index = (Math.floor(Math.random() * 100));
	console.log(index);
	var s = sound_blobs[index];
	s.float();
    console.log( hand.screenPosition() );
  }

}).use('screenPosition'); 
  
}

function tick(){
  stage.update(); 
  stage2.update();
}

var sounds = [];
var soundBackground = "background";
var full = "full";
var low = "low";
var smooth = "smooth";
var strings = "strings";
var swell = "swell";

var amb_guitar = "guitar";
var synth = "synth";
var weird = "weird";

function loadSound () {
		createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin,createjs.WebAudioPlugin]);
        createjs.Sound.registerSound("sound/background.mp3", soundBackground);
		createjs.Sound.registerSound("sound/full.mp3", full);
		createjs.Sound.registerSound("sound/low.mp3", low);
		createjs.Sound.registerSound("sound/smooth.mp3", smooth);
		createjs.Sound.registerSound("sound/strings.mp3", strings);
		createjs.Sound.registerSound("sound/swell.mp3", swell);
		createjs.Sound.registerSound("sound/amb_guitar.mp3", amb_guitar);
		createjs.Sound.registerSound("sound/synth.mp3", synth);
		createjs.Sound.registerSound("sound/weird.mp3", weird);
		
		sounds.push(soundBackground);
		sounds.push(full);
		sounds.push(low);
		sounds.push(smooth);
		sounds.push(strings);
		sounds.push(swell);
		sounds.push(amb_guitar);
		sounds.push(synth);
		sounds.push(weird);
      }
	  
function playSound() {
		var index = (Math.floor(Math.random() * 9));
		var sound_to_play = sounds[index];
		createjs.Sound.play(sound_to_play);
		
		console.log(sound_to_play);
		console.log(index);
      }

init();
loadSound();
