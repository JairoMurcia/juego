var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 5;
var dy = 1;
var radio=10;
var velLad=-1;
var rightPressed = false;
var leftPressed = false;
var ancho=70;
var alto=10
var puntaje=0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function reiniciar(){
	
   location.reload();
}

function interseccion(){
	bool=false
	for(i=0;i<ladrillos.length;i++){
		if(x>ladrillos[i].x && x<ladrillos[i].x+ancho){
			if(ladrillos[i].y==y+radio || ladrillos[i].y+velLad==y+dy ){
				bool=true;
			 	i=ladrillos.length;
			 }
		}
	}

	return bool;

}



function iniciar_ladrillos(limite){
	var c=[];
   
    for(i=0;i<3;i++){
    	 c[i]=Math.random()*((ladrillos.length-1));
    }

	var a=[];
	var X=0;
	
	limite-=ancho;
	for (i=0;i<7;i++){

		
		
			a[i]={x:X,y:20+80*i,la:'m'};
					
		
		
	}
	return a;

}

var ladrillos=iniciar_ladrillos(canvas.width);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else{

     if(e.keyCode == 37) {
        leftPressed = true;
    	}
	}
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else{

    if(e.keyCode == 37) {
        leftPressed = false;
    	}
	}
}


function drawGame() {
    
    ctx.beginPath();
    ctx.arc(x, y, radio, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
   		 
}
    


function draw() {
	puntaje+=1/100;
    var p=Math.round(puntaje);



    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGame();
    if (y+dy>=canvas.height-radio || y+dy<radio){
    	clearInterval(refreshIntervalId);
    	alert('perdiste');
    	
    }



    if(rightPressed && x+dx <= canvas.width-radio) {
        x += dx;
    }
    else{

    if(leftPressed && x-dx>=radio) {
         x-= dx;
    	}
    }
    if(interseccion()){
        y+= velLad;
	}else{
		y+=dy;
	}


    for(i=0;i<ladrillos.length;i++){
    	if(ladrillos[i].y<0){
    		ladrillos[i].y=canvas.height+100;
    		ladrillos[i].x=Math.random()*(canvas.width-ancho);
    	}else{
    		ladrillos[i].y+=velLad;
    	}

    }
   
    
    document.getElementById("puntaje").innerHTML="Puntaje: "+p.toString();
  

}


var refreshIntervalId = setInterval(draw, 10);
