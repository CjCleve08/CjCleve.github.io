let currentSquare = 1;
let section = 0;

let letters = [];

const date = new Date();

let word = "";
let wordArray = [];

let squaresPerRow = 7;
let squaresPerColumm = 5;

let availableLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "Enter", "Backspace"];

let won = false;
let canType = true;

document.addEventListener("DOMContentLoaded", () => {

    GetName();
    CreateSquares();
    ChangeWordIntoArray();
    ChangeNumOfSquaresperRow();

    function CreateSquares() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < squaresPerRow * squaresPerColumm; index++){
            let square = document.createElement("div");
            let squareFront = document.createElement("div");
            let squareBack = document.createElement("div");

            square.classList.add("square");
            squareFront.classList.add("square-front");
            squareBack.classList.add("square-back");


            square.setAttribute("id", "c" + (index + 1));
            squareFront.setAttribute("id", index + 1);
            squareBack.setAttribute("id", "b" + (index + 1));

            square.appendChild(squareFront);
            square.appendChild(squareBack);
            gameBoard.appendChild(square);
        }
    }
})

function GetName(){
    word = Names[Dates.indexOf(date.getDate())];
}

function ChangeNumOfSquaresperRow(){
    document.getElementById("board").style["grid-template-columns"] = `repeat(${squaresPerRow}, 1fr)`;
}

function ChangeWordIntoArray(){
    wordArray = [];

    for(index = 0; index < squaresPerRow; index++){
        wordArray.push(word[index]);
    }
}

function ChangeColor(index, color){
    setTimeout(() => {
        document.getElementById("c" + (index + section + 1)).classList.add(color);
    }, 450 * index)
}

function Reset(){
    CheckForWin()

    if (won){return;}

    if (section < squaresPerRow * squaresPerColumm - squaresPerRow){
        ChangeWordIntoArray();
        section += squaresPerRow;
        currentSquare = 1;
        letters = [];
        canType = true;
    } else{
        window.alert("You lost, the word was " + word + "!");
    }
}

function WinAnimationStart(){
    for(index = 0; index < squaresPerRow; index++){
        PlayWinAnimation(index);
    }

    setTimeout(() => {
        window.alert("You win! The word was infact " + word + "!");
    }, 100 * squaresPerRow);
}

function PlayWinAnimation(index){
    setTimeout(() => {
        document.getElementById("c" + (index + section + 1)).classList.add("won");
    }, 100 * index);
}

function CheckForWin(){
    let newLetters = letters.filter(function(x){
        return x !== "0";
    })

    if (newLetters.join("") == word){
        WinAnimationStart();
        won = true;
    }
}

function WriteToSquare(keyPressed){
    document.getElementById(currentSquare + section).innerHTML = keyPressed;
    document.getElementById("b" + (currentSquare + section)).innerHTML = keyPressed;

    letters[currentSquare - 1] = keyPressed;

    currentSquare++;
}

function EraseSquare(){
    currentSquare--;
    document.getElementById(currentSquare + section).innerHTML = "";
    document.getElementById("b" + (currentSquare + section)).innerHTML = "";
    letters.splice(currentSquare + section - 1);
}

function HandleSummitWord(){
    canType = false;

    while (letters.length < squaresPerRow){
        letters.push("0"); // Placeholder
    }

    for (index = 0; index < squaresPerRow; index++){
        if (letters[index] == word[index] || letters[index] == "0" && word[index] == undefined){
            ChangeColor(index, "green-square"); 
            wordArray.splice(wordArray.indexOf(letters[index]), 1);
        }else{
            if (wordArray.includes(letters[index]) && document.getElementById("c" + (index + section + 1)).classList.contains("green-square") == false){
                ChangeColor(index, "yellow-square");
                wordArray.splice(wordArray.indexOf(letters[index]), 1);
            }else{
                ChangeColor(index, "grey-square");
            }
        }
        
    }

    setTimeout(() => {
        Reset();
    }, squaresPerRow * 450)
}

document.addEventListener("keydown", (event) => {
    if(availableLetters.indexOf(event.key) == -1 || won || !canType){ return;}

    if (event.key == "Enter"){
        if (letters.length < 4) {window.alert("Word must be at least 4 letters long!"); return;}
        HandleSummitWord();
        return;
    }

    if (event.key == "Backspace" && currentSquare > 1){
        EraseSquare();
    } else{
        if (event.key != "Backspace" && currentSquare < squaresPerRow + 1) {
            WriteToSquare(event.key);
        }
    }
})