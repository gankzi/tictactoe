const boxes = document.querySelectorAll([".box"]);
const classX = "X";
const classO = "O";
const box6 = document.querySelector("#box6-p");

let currentSign = classX;


boxes.forEach((box) => box.addEventListener("click", displayMark, {once: true}));



const Gameboard = () => {
    const gameboard = [];

}

const Players = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    }

    return {getSign};
};

function gameStart() {

}

function displayMark(event) {
    event.target.classList.add(currentSign);
    event.target.firstElementChild.textContent = currentSign;

    currentSign = currentSign == classX ? classO : classX; 
    
    checkGameResult();
}

function checkGameResult() {
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    const xClassArray = [];
    const oClassArray = [];

    boxes.forEach(checkGameStatus);

    function checkGameStatus (box, index) {
        if (box.classList.contains(classX)) {
            xClassArray.push(index);
        } else if (box.classList.contains(classO)) {
            oClassArray.push(index);
        }
    };

    console.log(xClassArray);
    console.log(oClassArray);

    if(winConditions.some(x => x == xClassArray)) {
        console.log("X Player Wins");
    } else if (winConditions.includes(oClassArray)) {
        console.log("O Player Wins");
    }

}

console.log(boxes);