//create variables using the DOM 
var randomButton = document.getElementById('random');
var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');
var clearButton = document.getElementById('clear');
var parent = document.querySelector('.container');
var addButton = document.getElementById('enter');
var grid = document.getElementById('inputgrid').value;
var cells = [];
var cellsState = [];
var randomCells = [];

//the Cell class
class Cell{
    constructor(yAxis, xAxis, state){
        this.cellDiv = document.createElement('div');
        this.cellDiv.className = "gridedCells";
        this.cellDiv.id= `n${yAxis}-${xAxis}`;
        this.cellDiv.state = state;
        this.changeColor();
        this.cellDiv.yAxis = yAxis;
        this.cellDiv.xAxis = xAxis;
    }
    attach(){
        parent.appendChild(this.cellDiv);
    }
    //Gets the Neighbouring cells of each cell
    getNeighbour(){
        this.neighbours = [];
        this.neighboursState = [];
        for(let i=this.cellDiv.yAxis-1; i <= this.cellDiv.yAxis+1; i+=1 ){
            for(let j=this.cellDiv.xAxis-1; j <= this.cellDiv.xAxis+1; j+=1 ){
                    var neighbour = document.getElementById(`n${i}-${j}`);
                    if(this.cellDiv.yAxis == i && this.cellDiv.xAxis == j){
                    }else{
                        if (neighbour != null){
                            this.neighbours.push(neighbour);
                            this.neighboursState.push(neighbour.state);
                    }
                }
            }
        }
    }
        
    changeColor(){
        if (this.cellDiv.state == true){
            this.cellDiv.style.backgroundColor = 'white';
            this.cellDiv.style.border = '1px solid black';
        }else{
            this.cellDiv.style.backgroundColor = 'black';
            this.cellDiv.style.border = '.2px dotted green';
        }
    }
    //Analyses the state of neighbouring cells and change state 
    ListenToNeighbours(){
        var trueValues = this.neighboursState.filter(value => value === true).length;
        if(trueValues == 3){
            this.cellDiv.state = true;
            this.changeColor();
        }else if(trueValues == 2){
        }else if(trueValues == 0 || trueValues == 1){
            this.cellDiv.state = false;
            this.changeColor();
        }else if(trueValues >= 4){
            this.cellDiv.state =false;
            this.changeColor();
        }
    }
}
//generates random numbers and appends to an array
function randomGenerator(){
    randomCells = [];
    for(let i=0; i <= grid/3; i+=1){
        var randomNumber = Math.floor(Math.random()*grid);
        randomCells.push(randomNumber);
    }
}
//displays grid
function createGrid(){
    parent.style.display = 'grid';
    parent.innerHTML = '';
    var cssGrids = '';
    for (let i = 0; i < grid; i++){
        cssGrids += '1fr ';
    }
    parent.style.gridTemplateColumns = cssGrids;
    cells = [];
    for (let i = 0; i < grid; i+=1){
        for (let j = 0; j < grid; j+=1){
            square = new Cell(i, j, false);
            cells.push(square);
            square.attach();
            square.cellDiv.addEventListener('click', activateCell);
        }
    }
}
//customizes the grid based on user input
function customGrid(){
    if(document.getElementById('inputgrid').value != ''){
        grid = document.getElementById('inputgrid').value;
    }else{
        alert('Empty Input');
    }
    createGrid();
}
//gets the state of all cells
function getcellsState(){
    cellsState = [];
    for(let i=0; i < cells.length; i+=1){
        cellsState.push(cells[i].cellDiv.state);
    } 
}
let runner;
function automata(){
    getcellsState();
    cellsState = [];
    for(let i=0; i < cells.length; i+=1){
        cells[i].getNeighbour();
    }
    for(let i = 0; i< cells.length; i+=1){
        cells[i].ListenToNeighbours();
        cellsState.push(cells[i].cellDiv.state);
    }
    if(cellsState.includes(true) == false){
        clearInterval(runner);
    }
 }
 //generates random alive cells
 function randomize(){
    randomGenerator();
    for(let i = 0; i < cells.length; i+=1){
        var X = cells[i].cellDiv.xAxis;
        var Y = cells[i].cellDiv.yAxis;
        if(randomCells.includes(X+Y)&&randomCells.includes(X-Y)||randomCells.includes(Y/X)||randomCells.includes(X*Y)){
            cells[i].cellDiv.state = true;
            cells[i].changeColor();
        }
    }
 }
 //starts the automatic execution
 function start(){ 
    stop(); 
    runner = setInterval(automata, 250);
    automata();
 }
 function stop(){
    clearInterval(runner);
 }
 //clear screen
 function clear(){
    for(let i = 0; i < cells.length; i+=1){
        cells[i].cellDiv.state = false;
        cells[i].changeColor();
    }
 }
 function activateCell(e){
    if(e.target.state == false){
        e.target.state = true;
        e.target.style.backgroundColor = 'white';
        e.target.style.border = '1px solid black';
    }else{
        e.target.state = false;
        e.target.style.backgroundColor = 'black';
        e.target.style.border = '.2px dotted green';
    }
 }
randomButton.addEventListener('click', randomize);
startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
clearButton.addEventListener('click', clear);
addButton.addEventListener('click', customGrid);