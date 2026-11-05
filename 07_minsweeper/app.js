var board = [];
var score = 0;
var rows = 8;
var cols = 8;

var minesCount = 5; 
var minesLoc = []; 

var tilesClicked = 0;
var flagEnabled = false;

var gameOver = false;

window.onload = function() {
    setGame();
}


function setMines(){

  let minesLeft = minesCount;
  while(minesLeft>0){
    let r = Math.floor(Math.random()*rows);
    let c = Math.floor(Math.random()*cols);
    let id = r.toString() + "-" + c.toString();

    if(!minesLoc.includes(id)){
      minesLoc.push(id);
      minesLeft -=1;
    }
  }


}

function setGame() {
  document.getElementById("mines-count").innerText = minesCount;
  document.getElementById("flag-button").addEventListener("click", setFlag);
  document.getElementById("reset-button").addEventListener("click", resetBoard);
  let boardElement = document.getElementById("board");
  setMines();

  for(let r=0; r<rows; r++){
    let row =[];
    for(let c=0; c<cols; c++){
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      boardElement.append(tile);
      tile.addEventListener("click", clickTile);
      row.push(tile);
    }
    board.push(row);
  }
}

function resetBoard(){
  board = [];
  minesLoc = [];
  tilesClicked = 0;
  flagEnabled = false;
  gameOver = false;

  

  document.getElementById("mines-count").innerText = minesCount;
  document.getElementById("message-block").innerText="";
  document.getElementById("message-block").classList.remove("success", "failed");
  document.getElementById("flag-button").style.backgroundColor = "lightgray";

  let boardElement = document.getElementById("board");
  boardElement.innerHTML = "";

  setMines();

  for(let r=0; r<rows; r++){
    let row = [];
    for(let c=0; c<cols; c++){
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.addEventListener("click", clickTile);
      boardElement.append(tile);
      row.push(tile);
    }
    board.push(row);
  }

}

function setFlag(){
  if(flagEnabled){
    flagEnabled = false;
     document.getElementById("flag-button").style.backgroundColor = "lightgray";
  }
  else{
    flagEnabled = true;
     document.getElementById("flag-button").style.backgroundColor = "darkgray";
  }
}

function clickTile(){
  
  let tile = this;

  if(gameOver || tile.classList.contains("tile-clicked")){
    return;
  }
  if(flagEnabled){
    if(tile.innerText ==""){
      tile.innerText = "🚩";
    }else if(tile.innerText == "🚩"){
      tile.innerText ="";
    }
    return;
  }

  if(minesLoc.includes(tile.id)){
    gameOver =true;
    showAllMines();
    return;
  }

  let coords = tile.id.split("-");
  let r = parseInt(coords[0]);
  let c= parseInt(coords[1]);
  checkMines(r,c);
}


function showAllMines(){
  for(let r=0; r<rows; r++){
    for(let c=0; c<cols; c++){
      let tile = board[r][c];
      if(minesLoc.includes(tile.id)){
        tile.innerText = "💣";
        tile.style.backgroundColor= "red";
      }
    }
  }
  
      document.getElementById("message-block").classList.add("failed");
      document.getElementById("message-block").innerText="You Lost!";
}

function checkMines(r,c){
   if(r < 0 || r >= rows || c < 0 || c >= cols){
    return;
   }
   if(board[r][c].classList.contains("tile-clicked")){    
    return;
   }
   board[r][c].classList.add("tile-clicked");
   tilesClicked +=1;

   let minesFound=0;

   //top 3
   minesFound += checkTile(r-1,c-1);  //top left
   minesFound += checkTile(r-1,c);    //top
   minesFound += checkTile(r-1,c+1);  //top right

   //left & right
   minesFound += checkTile(r,c-1);  //left
   minesFound += checkTile(r,c+1);  //right

   //bottom 3
   minesFound += checkTile(r+1,c-1);  //bottom left
   minesFound += checkTile(r+1,c);    //bottom
   minesFound += checkTile(r+1,c+1);  //bottom right

   if(minesFound > 0){
    board[r][c].innerText = minesFound;
    board[r][c].classList.add("f" + minesFound.toString());
   }
   else{
    //top 3
    checkMines(r-1,c-1);  //top left
    checkMines(r-1,c);    //top
    checkMines(r-1,c+1);  //top right

    //left & right
    checkMines(r,c-1);
    checkMines(r,c+1);

    //bottom 3
    checkMines(r+1,c-1);  //bottom left
    checkMines(r+1,c);    //bottom
    checkMines(r+1,c+1);  //bottom right
   }
   
   if(tilesClicked == (rows*cols) - minesCount){
      document.getElementById("mines-count").innerText="cleared";
      document.getElementById("message-block").classList.add("success");
      document.getElementById("message-block").innerText="You Won!";
      gameOver = true;
   }

}

function checkTile(r,c){
  if(r < 0 || r >= rows || c < 0 || c >= cols){
   return 0;
  }
  if(minesLoc.includes(r.toString() + "-" + c.toString())){
    return 1;
  }
  return 0;
}

