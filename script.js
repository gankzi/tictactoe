const boxes = document.querySelectorAll([".box"]);
const boxP = document.querySelectorAll([".box-p"]);
const resultPage = document.querySelector(".result-page");
const resultHeading = document.querySelector(".result-header");
const optionP = document.querySelector("#set-game");
const playPlayer = document.querySelector("#play-player");
const playBot = document.querySelector("#play-bot");

const displayGame = () => {
    const classX = "X";
    const classO = "O"; 
    let currentSign = classX;

    function displayMarkPlayer(event) {
        event.target.classList.add(currentSign);
        event.target.firstElementChild.textContent = currentSign;
       
        gameBoard.checkGameResult();
        currentSign = currentSign == classX ? classO : classX; 
    };

    function displayMarkBot(event) {
        event.target.classList.add(currentSign);
        event.target.firstElementChild.textContent = currentSign;
       
        gameBoard.checkGameResult();
        gameBoard.botSelect();
    };

   return { displayMarkBot, displayMarkPlayer, classX, classO};
};

const gameBoard = (() => {

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
    const {classX, classO} = displayGame();

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

    function botSelect() {
        let botPick = Math.floor(Math.random() * 9);
        if (!resultPage.hasAttribute("id")) {
        checkIfSelected(botPick);
        };
    };
    
    function checkIfSelected(botPick) {
        if (boxes[botPick].classList.contains("X") || boxes[botPick].classList.contains("O")) {
          botSelect();
        } else {
          botMark(botPick);
        }
    };
    
    function botMark(pick) {
        boxes[pick].classList.add("O");
        boxes[pick].firstElementChild.textContent = "O";
        checkGameResult();
    }

    return { checkGameResult, botSelect };
})();

const display = displayGame();

function startGamePlayer() {
    boxes.forEach((box) => box.addEventListener("click", display.displayMarkPlayer, {once: true}));
    optionP.classList.add("hide");
    playPlayer.setAttribute('disabled', '');
    playBot.setAttribute('disabled','');
};

function startGameBot() {
    boxes.forEach((box) =>  box.addEventListener("click", display.displayMarkBot, {once: true}));
    optionP.classList.add("hide");
    playPlayer.setAttribute('disabled', '');
    playBot.setAttribute('disabled','');
};


function restart() {
     window.location.reload();
};

