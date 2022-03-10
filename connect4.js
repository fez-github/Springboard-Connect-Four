/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

let cellCount = 0;

//Create multi-dimensional array based on width & height.  This will be used to store each Connect 4 slot value.
function makeBoard(board, WIDTH, HEIGHT) {
  while(board.length <= HEIGHT){
    board.push([...Array(WIDTH)]);
  } 
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  let htmlBoard = document.querySelector("#board");

  // Generate table, and add event listener for when user clicks.
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  
  //Create header row that the user will click into.
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  let i = HEIGHT;
  console.log(`Index searched: ${x}`)
  for(i; i >= 0; i--){
    console.log(`Integer: ${i}.  Value: ${board[i][x]}`);
    if(!board[i][x]){
      return i;
    }
  }
  return;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let div = document.createElement('div');
  div.classList.toggle(`Player-${currPlayer}`)
  div.classList.toggle('piece')
  board[y][x] = currPlayer;
  console.log(`x : ${x}  y : ${y}`)
  console.log(board[y][x]);
  //document.getElementById(`${y - 1}-${x}`).classList.add(`Player-${currPlayer}`);
  document.getElementById(`${y - 1}-${x}`).append(div);

  cellCount++;
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  console.log(evt.target);
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  console.log("y = " + y);
  if (!y) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  checkForTie();
  // check for win
  if (checkWin(x,y)) {
    return endGame(`Player ${currPlayer} won!`);
  }
  switchPlayers();

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  function checkForTie(){
    //Look at count variable.  If value matches height x width(area of the grid) then game is over.
    if(cellCount >= WIDTH * HEIGHT){
      return endGame(`Tie game!  Hit restart to try again.`);
    }
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  function switchPlayers(){
    console.log("Currplayer: " + currPlayer);
    if(currPlayer == 1){
      console.log("Changing to P2.");
      currPlayer = 2
    }
    else{
      console.log("Changing to P1.")
      currPlayer = 1
    }
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkWin(x,y){
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    cells.forEach(([y,x]) =>{
      /*
      if(!board[y][x]){
        console.log(`Undefined.  ${y},${x}`);
      }
      else{
        console.log(`${y},${x} Value: ${board[y][x]}`);
      }
      */
     /*
      if(y >= 0){
        console.log('1: true');
      }
      else{
        console.log('1: false');
      }
      if(y < HEIGHT){
        console.log('2: true');
      }
      else{
        console.log('2: false');
      }
      if(x >= 0){
        console.log('3: true');
      }
      else{
        console.log('3: false');
      }
      if(x < WIDTH){
        console.log('4: true');
      }
      else{
        console.log('4: false');
      }
      if(board[y][x] === currPlayer){
        console.log('5: true');
      }
      else{
        console.log('5: false');
      }
      */
    });
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y <= HEIGHT &&
        x >= 0 &&
        x <= WIDTH &&
        board[y][x] === currPlayer
    );
    
  }
  let horizR = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
  let horizL = [[y, x], [y, x - 1], [y, x - 2], [y, x - 3]];
  let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
  let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
  let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

  console.log(horizR, _win(horizR));
  console.log(horizL, _win(horizL));
  console.log(vert, _win(vert));
  console.log(diagDR, _win(diagDR));
  console.log(diagDL, _win(diagDL));

  if (_win(horizR) || _win(horizL) || _win(vert) || _win(diagDR) || _win(diagDL)) {
    return true;
  }
}
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  //Don't agree with this code.  Instead of looping through every single object, why not check the single cell we placed an object in?

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horizR = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let horizL = [[y, x], [y, x - 1], [y, x - 2], [y, x - 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horizR) || _win(horizL) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard(board,WIDTH,HEIGHT);
makeHtmlBoard();
