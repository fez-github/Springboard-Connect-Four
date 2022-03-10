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

let cellCount = 0; //Increments each time a piece is added.  Handled in placeInTable.

makeBoard(board,WIDTH,HEIGHT);

makeHtmlBoard();

//makeBoard: Create multi-dimensional array based on width & height.  This will be used to store each Connect 4 slot value.
function makeBoard(board, WIDTH, HEIGHT) {
  while(board.length <= HEIGHT){
    board.push([...Array(WIDTH)]);
  } 
}

//makeHTMLBoard: Create an HTML table based off of the board.
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

  //Create rows that will store the pieces.
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

//handleClick: Event handler for when the table is clicked.
function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (!y) {
    return;
  }

  // place piece in board and add to HTML table
  placeInTable(y, x);

  //Check if board is full.  If so, declare a tie.
  checkForTie();

  //Check for win
  if (checkWin(x,y)) {
    return endGame(`Player ${currPlayer} won!`);
  }
  switchPlayers();

}

//findSpotForCol: Upon clicking a column, from bottom to top, search for an empty slot for a piece to enter.
function findSpotForCol(x) {
  let i = HEIGHT;
  //console.log(`Index searched: ${x}`)
  for(i; i >= 0; i--){
    //console.log(`Integer: ${i}.  Value: ${board[i][x]}`);
    if(!board[i][x]){
      return i;
    }
  }
  return;
}

//placeInTable: Places a piece into both the board, and the HTML table.
function placeInTable(y, x) {
  let div = document.createElement('div');
  div.classList.toggle(`Player-${currPlayer}`)
  div.classList.toggle('piece')

  board[y][x] = currPlayer;

  //console.log(`x : ${x}  y : ${y}`)
  //console.log(board[y][x]);
  document.getElementById(`${y - 1}-${x}`).append(div);

  cellCount++;
}

  //Check for tie
  function checkForTie(){
    //Look at count variable.  If value matches height x width(area of the grid) then game is over.
    if(cellCount >= WIDTH * HEIGHT){
      return endGame(`Tie game!  Hit restart to try again.`);
    }
  }

//checkWin: Look for possible wins based on the cell that was just placed.
function checkWin(x,y){
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer.
    cells.forEach(([y,x]) =>{
     /*
     //Code is to debug the values that will be checked in cells.every.
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

  //console.log(horizR, _win(horizR));
  //console.log(horizL, _win(horizL));
  //console.log(vert, _win(vert));
  //console.log(diagDR, _win(diagDR));
  //console.log(diagDL, _win(diagDL));

  if (_win(horizR) || _win(horizL) || _win(vert) || _win(diagDR) || _win(diagDL)) {
    return true;
  }
}

//Call alert to notify that the game has ended.
function endGame(msg) {
  alert(msg);
}

  // switch players
  function switchPlayers(){
    //console.log("Currplayer: " + currPlayer);
    if(currPlayer == 1){
      //console.log("Changing to P2.");
      currPlayer = 2
    }
    else{
      //console.log("Changing to P1.")
      currPlayer = 1
    }
  }