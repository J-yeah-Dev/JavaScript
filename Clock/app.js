let width = 500;
let height = width;
let radius = width/2;


let canvas;
let context;

window.onload = function() {
  canvas = document.getElementById("clock");
  canvas.width = width;
  canvas.height = height;
  context = canvas.getContext("2d");
  
  context. translate(width/2,height/2)
  radius = radius*0.9
  drawClock();
}
 
function drawClock(){
  drawFace();
  drawNumbers();
  drawTime();
  setTimeout(drawClock, 1000);
}
 
function drawFace(){
  context.beginPath();
  context.arc(0,0, radius, 0, 2*Math.PI);
  context.strokeStyle = "#000";
  context.lineWidth = radius*0.1;
  context.stroke()

  context.fillStyle = "whitesmoke";
  context.fill();
}

function drawNumbers(){
  context.font = `${radius*0.2}px times new roman`;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.fillStyle = "black";
  
  for (let num = 1; num <=12 ; num ++){
    let angle = num * Math.PI /6;
    context.rotate(angle);
    context. translate(0, -radius*0.85);
    context.rotate(-angle);


    context.fillText(num.toString(), 0,0 )

    context.rotate(angle);
    context. translate(0, radius*0.85)
    context.rotate(-angle);
  }

}
 
function drawTime(){
  let now = new Date();
  let hour = now.getHours() %12; 
  let min = now. getMinutes();
  let sec = now.getSeconds();

  let secAngle = sec * Math.PI /30;  //60 sec * PI/30 = 2* PT
  context.strokeStyle = "red";
  drawHands(secAngle, radius*0.75, radius*0.01)

  let minAngle = min * Math.PI /30; //60 sec * PI/30 = 2* PT
  context.strokeStyle = "black";
  drawHands(minAngle, radius*0.68, radius*0.02)

  
  let hourAngle = hour * Math.PI /6;  //60 sec * PI/6 = 2* PT
   hourAngle += minAngle/12;
  context.strokeStyle = "black";
  drawHands(hourAngle, radius*0.5, radius*0.03)


  context.beginPath();
  context.arc(0, 0, radius*0.05, 0, 2*Math.PI)
  context.fillStyle = "black";
  context.fill()

}

function drawHands(angle, length, width){
  context.beginPath();
  context.lineWidth = width;
  context.lineCap = "round";

  context.moveTo(0,0);
  context.rotate(angle);
  context.lineTo(0,-length);
  context.stroke();
  context.rotate(-angle);
}