var board;
var turns = 0;
var rows = 3;
var cols = 3;

var currTile;
var blankTile;

var imageOrder =["4","2","8","5","1","6","7","9","3"];

window.onload = function(){
  for ( let r=0; r<rows; r++){
    for(let c=0; c<cols; c++){

      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src= "images/"+ imageOrder.shift() + ".jpg";

      tile.addEventListener("click", clickTile);

      document.getElementById("board").append(tile)
    }
  }
}


function clickTile(){
  
  let currTile = this;
  
  let currCoords = currTile.id.split("-");
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  var blankTile = document.querySelector('#board img[src*="images/3.jpg"]');
  let blankCoords = blankTile.id.split("-");
  let r2 = parseInt(blankCoords[0]);
  let c2 = parseInt(blankCoords[1]);
  
  let moveLeft = (r == r2 && c2 == c-1);
  let moveRight = (r == r2 && c2 == c+1);
  let moveUp = (c == c2 && r2 == r-1);
  let moveDown = (c == c2 && r2 == r+1);

  if(moveLeft || moveRight || moveUp || moveDown){

    let currTileImg = currTile.src; 
    currTile.src = blankTile.src;
    blankTile.src = currTileImg;

    turns ++;
    document.getElementById("turns").innerText = turns;
  }


}
