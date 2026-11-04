var board;
var score = 0;
var rows = 4;
var cols = 4;

window.onload = function() {
    setGame();
}

function setGame() {
  score = 0;
  document.getElementById("score").innerText = score;
  board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
  ];

  let boardElement = document.getElementById("board");
  boardElement.innerHTML = "";

  for(let r=0; r<rows; r++){
    for(let c=0; c<cols; c++){
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      boardElement.append(tile);
    }
  }
  setTwo();
  setTwo();
}
function hasEmptyTile(){
  for (let r=0; r<rows; r++){
    for (let c=0; c<cols; c++){
      if(board[r][c] == 0){
        return true;
      }
    }
  }
  return false;
}
function setTwo(){

  if(!hasEmptyTile()){
    alert("Game Over \n Your score is: " + score);
    setGame();
    return;
  }
  let found = false;
  while(!found){
    let r =Math.floor(Math.random() * rows);
    let c =Math.floor(Math.random() * cols);

    if(board[r][c] == 0){
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("t2");
      found = true;
    }
  }
}


function updateTile(tile, num){
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  if(num > 0){
    tile.innerText = num;
    if (num <= 4096){
      tile.classList.add("t" + num.toString());
    } else {
      tile.classList.add("t8192");
    }

  }
}

document.addEventListener("keyup", (e) => {
  if(e.code == "ArrowLeft"){
    slideLeft();
  }
  if(e.code == "ArrowRight"){
    slideRight();
  }
  if(e.code == "ArrowUp"){
    slideUp();
  }
  if(e.code == "ArrowDown"){
    slideDown();
  }
  setTwo();
  document.getElementById("score").innerText = score;
});


function filterZero(row){
    //alert("filterZero");
  return row.filter(num => num != 0);
}

function slide(row){
    //alert("slide");
  row=filterZero(row);
  for (let i =0; i<row.length-1; i++){
    if(row[i] == row[i+1]){
      row[i] *= 2;
      row[i+1] = 0;
      score += row[i];
    }
  }
  row = filterZero(row);

  while (row.length < cols){
    row.push(0);
  }
  return row;

}

function slideLeft(){
    //alert("slideLeft");
  for (let r = 0; r <rows; r++){
    let row = board [r];
    row = slide(row);
    board[r]= row;

    for ( let c = 0; c < cols; c++){
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }

}
function slideRight(){
    //alert("slideRight");
  for (let r = 0; r <rows; r++){
    let row = board [r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r]= row;

    for ( let c = 0; c < cols; c++){
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }

}
function slideUp(){
  for ( let c = 0; c < cols; c++){
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    for (let r = 0; r < rows; r++){
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }

}
function slideDown(){
  for ( let c = 0; c < cols; c++){
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    for (let r = 0; r < rows; r++){
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }

}