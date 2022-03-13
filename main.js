/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

//Inputs that user will interact with.
const btnStart = document.querySelector('input[name="btnConfirm"]');
const inputHeight = document.querySelector('input[name="ruleHeight"]');
const inputWidth = document.querySelector('input[name="ruleWidth"]');
let gameBoards = []; //Array of Connect 4 games.  Classes will be added to this.

btnStart.addEventListener('click',beginGame);

function beginGame(evt){
  evt.target.parentElement.style.visibility = 'hidden';

  let newGame = new Connect4Game([],parseInt(inputWidth.value),parseInt(inputHeight.value));
  document.getElementById('game').append(newGame.htmlBoard);
  gameBoards.push(newGame);
  //makeBoard(board,parseInt(inputWidth.value),parseInt(inputHeight.value));

  //makeHtmlBoard();
}

