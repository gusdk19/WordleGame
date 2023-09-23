const 정답 = "ADORE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameclear = () => {
    const div = document.createElement("div");
    div.innerText = "SUCCESS!\nCONGRATULATIONS";
    div.style =
      "display:flex; justify-content:center; align-items:center; text-align: center; position:absolute; top: 40vh; left: 40vw; background-color:white; width: 200px; height: 50px;";
    document.body.appendChild(div);
    window.onresize = function (e) {
      var innerWidth = window.innerWidth;
      if (innerWidth <= "500") div.style.display = "none";
      else div.style.display = "block";
    };
  };

  const gameclear = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameclear();
    clearInterval(timer);
  };

  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "YOU FAILED!\nTRY AGAIN";
    div.style =
      "display:flex; justify-content:center; align-items:center; text-align: center; position:absolute; top: 40vh; left: 40vw; background-color:white; width: 200px; height: 50px;";
    document.body.appendChild(div);
    window.onresize = function (e) {
      var innerWidth = window.innerWidth;
      if (innerWidth <= "500") div.style.display = "none";
      else div.style.display = "block";
    };
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 5) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let 맞은_개수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const 입력_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력_글자 === 정답_글자) {
        맞은_개수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";

      block.style.color = "white";
    }

    if (맞은_개수 === 5) gameclear();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (event.key === "Enter") alert("Please enter 5 letters");
    else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector(".time");
      timeDiv.innerText = `TIME ${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTimer();

  window.addEventListener("keydown", handleKeydown);
}

appStart();
