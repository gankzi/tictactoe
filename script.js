const boxes = document.querySelectorAll([".box"]);
const boxP = document.querySelectorAll([".box-p"]);
const resultPage = document.querySelector(".result-page");
const resultHeading = document.querySelector(".result-header");
const classX = "X";
const classO = "O";
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
let currentSign = classX;

boxes.forEach((box) => box.addEventListener("click", displayMark, {once: true}));

function displayMark(event) {
    event.target.classList.add(currentSign);
    event.target.firstElementChild.textContent = currentSign;
   
    checkGameResult();
    currentSign = currentSign == classX ? classO : classX; 
}

function checkGameResult() {

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

    function checkWin() {
        if(winConditions.some(win => win.every(marked => {
            return xClassArray.includes(marked);
        }))) {
            resultHeading.textContent = "X Wins!!!";
            resultPage.setAttribute("id", "result");
        } else if(winConditions.some(win => win.every(marked => {
            return oClassArray.includes(marked);
        }))) {
            resultHeading.textContent = "O Wins!!!";
            resultPage.setAttribute("id", "result");
        } else if ((xClassArray.length + oClassArray.length) == 9) {
            resultHeading.textContent = "Draw!!!";
            resultPage.setAttribute("id", "result");
        }

       };
   
       checkWin();
};

function restart() {
    currentSign = classX;
    resultPage.removeAttribute("id");
    boxes.forEach((box) => box.classList.remove("O"));
    boxes.forEach((box) => box.classList.remove("X"));
    boxP.forEach((p) => p.textContent = "");
    boxes.forEach((box) => box.addEventListener("click", displayMark, {once: true}));
}