class Connect4Game {
    constructor(board, width, height){
        this.board = board;
        this.width = width;
        this.height = height;
        this.currPlayer = 1;
        this.htmlBoard = document.createElement('table');
        this.cellCount = 0;

        console.log("Constructor",this);

        this.makeBoard();
        this.makeHTMLBoard();
    }
    //makeBoard: Create multi-dimensional array based on width & height.  //This will be used to store each Connect 4 slot value.
    makeBoard(){
        console.log("makeBoard",this);
        if(this.board.length == 0){
            while(this.board.length <= this.height){
                this.board.push([...Array(this.width)]);
            } 
        }
        else{
            alert(`Board already exists!`);
        }
    }
    //makeHTMLBoard: Create an HTML table based off of the board.
    makeHTMLBoard(){
        console.log("makeHTMLBoard",this);
        // Generate table, and add event listener for when user clicks.
        let top = document.createElement("tr");
        top.setAttribute("id", "column-top");
        top.addEventListener("click", this.handleClick.bind(this));
        
        //Create header row that the user will click into.
        for (let x = 0; x < this.width; x++) {
            let headCell = document.createElement("td");
            headCell.setAttribute("id", x);
            top.append(headCell);
        }
        this.htmlBoard.append(top);

        //Create rows that will store the pieces.
        for (let y = 0; y < this.height; y++) {
            const row = document.createElement("tr");
            for (let x = 0; x < this.width; x++) {
                const cell = document.createElement("td");
                cell.setAttribute("id", `${y}-${x}`);
                row.append(cell);
            }
            this.htmlBoard.append(row);
        }
        //Attach htmlBoard to HTML div.
        document.getElementById('game').append(this.htmlBoard);
    }

    //handleClick: Event handler for when the table is clicked.
    handleClick(evt) {
        // get x from ID of clicked cell
        let x = +evt.target.id;
        console.log(x);
    
        // get next spot in column (if none, ignore click)
        console.log(this);
        let y = this.findSpotForCol(x);
        if (!y) {
        return;
        }
    
        // place piece in board and add to HTML table
        this.placeInTable(y, x);
    
        //Check if board is full.  If so, declare a tie.
        this.checkForTie();
    
        //Check for win
        if (this.checkWin(x,y)) {
        return this.endGame(`Player ${this.currPlayer} won!`);
        }
        this.switchPlayers();
    }
    
    //findSpotForCol: Upon clicking a column, from bottom to top, search for an empty slot for a piece to enter.
    findSpotForCol(x) {
        let i = this.height;
        console.log(`Index searched: ${x}`)
        for(i; i >= 0; i--){
        console.log(`Integer: ${i}.  Value: ${this.board[i][x]}`);
        if(!this.board[i][x]){
            return i;
        }
        }
        return;
    }

    //placeInTable: Places a piece into both the board, and the HTML table.
    placeInTable(y, x) {
        let div = document.createElement('div');
        div.classList.toggle(`Player-${this.currPlayer}`)
        div.classList.toggle('piece')
    
        this.board[y][x] = this.currPlayer;
    
        console.log(`x : ${x}  y : ${y}`)
        console.log(this.board[y][x]);
        document.getElementById(`${y - 1}-${x}`).append(div);
    
        this.cellCount++;
    }

    //Check for tie
    checkForTie(){
        //Look at count variable.  If value matches height x width(area of the grid) then game is over.
        if(this.cellCount >= this.width * this.height){
        return endGame(`Tie game!  Hit restart to try again.`);
        }
    }

    //checkWin: Look for possible wins based on the cell that was just placed.
    checkWin(x,y){
        function _win(cells) {
            console.log(this);
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
        console.log(this);
        return cells.every(function([y,x]){
            //([y, x]) =>
            y >= 0 &&
            y <= this.height &&
            x >= 0 &&
            x <= this.width &&
            this.board[y][x] === currPlayer
        }.bind(this));
        
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

        let winThis = _win().bind(this);

        console.log(this);
        if (winThis(horizR) || winThis(horizL)|| winThis(vert) || winThis(diagDR) || winThis(diagDL)) {
        return true;
        }
    }
    //Call alert to notify that the game has ended.
    endGame(msg) {
        alert(msg);
    }
  
    // switch players
    switchPlayers(){
      this.currPlayer == 1 ? this.currPlayer = 2 : this.currPlayer = 1;
    }
}