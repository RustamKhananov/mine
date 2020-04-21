
if (confirm('Бажаєте ризикнути, пане сапере?')) {
  alert('Відкрити клітинку: Left Click; \nВстановити або зняти прапорець: Right Click або тримати на мобільних пристроях.')

  mineGame();
};

function mineGame() {
  let winSound = new Audio;
  let blowSound = new Audio;
  let clickSound = new Audio;
  clickSound.src = './sounds/click.mp3';
  blowSound.src = './sounds/blow.mp3';
  winSound.src = './sounds/win.mp3';

  let startTime = new Date();
  let movesCount = 0;
  
  let size = +prompt(`Оберіть розмір поля? \nНе менше п'яти`);
  let minesCount = size * 2;
  if (size < 5 || size !== size) {
    size = 5;
  };
  if (size * 25 > document.defaultView.screen.availWidth) {
    size = Math.floor(document.defaultView.screen.availWidth / 25) - 2;
  };

  let container = document.querySelector('.minerGameContainer');
  container.innerHTML = fieldHtmlGenerator(size);
  let gameArr = minesRandomGenerator(size, minesCount);
  let rows = [...document.querySelectorAll('.minerGameContainer__row')];
  let elements = [];
  for (let i = 0; i < rows.length; i++) {
    elements.push(...rows[i].children);
  };
  document.addEventListener('click', oneShot);
  document.addEventListener('touchstart', oneShot)
  // document.addEventListener('contextmenu', flag);
  document.addEventListener('contextmenu', flag);

  function flag(event) { //функция устанавливает или снимает флаг
    event.preventDefault();
    if (!elements.includes(event.target)) {
      return;
    };
    if (event.target.style.backgroundImage === 'url("./imgs/neatoshop_achtung-minen_1502460756.large.jpg")') {
      event.target.style.backgroundImage = 'none';
      return;
    };
    if (event.target.textContent !== '') {
      return;
    }

    event.target.style.backgroundImage = 'url("./imgs/neatoshop_achtung-minen_1502460756.large.jpg")';
  }

  function oneShot(event) { //функция открывает одну клетку 
    if (!elements.includes(event.target)) {
      return;
    };
    if (event.target.style.backgroundImage === 'url("./imgs/neatoshop_achtung-minen_1502460756.large.jpg")') {
      return;
    };
    let index = elements.indexOf(event.target);

    if (gameArr[index] === 'm') {
      event.target.style.backgroundColor = 'red';
      event.target.style.backgroundImage = 'url(./imgs/hotpng.com.png)';
      for (let i = 0; i < elements.length; i++) {
        if (gameArr[i] === 'm' && elements[i] !== event.target) {
          elements[i].style.backgroundImage = 'url(./imgs/mines_PNG21.png)';
          elements[i].style.backgroundColor = 'white';
        }
      };
      blowSound.play();
      setTimeout(() => {
        alert('Оце так вибух...!!!')
        if (confirm('Ще раз?')) {
          mineGame();
        }
      }, 1000);
    } else {
      if (event.target.style.backgroundColor !== 'white') {
        movesCount++;
        event.target.style.backgroundColor = 'white';
        event.target.textContent = gameArr[index];
        switch (gameArr[index]) {
          case 0:
            event.target.style.color = 'white';
            openZeros(elements.indexOf(event.target));
            break;
          case 1:
            event.target.style.color = 'green';
            break;
          case 2:
            event.target.style.color = 'brown';
            break;
          default:
            event.target.style.color = 'red';
        };
      };

    

      if (movesCount === size * (size) - minesCount) {
        let timeInSec = Math.round((new Date() - startTime) / 1000);
        winSound.play();
        setTimeout(() => {
          alert(`Вітаємо!!! Ви розмінували поле.\nВаш час ${timeInSec} секунд.`);
          if (confirm('Ще раз?')) {
            mineGame();
          }
        }, 1000);
      }
    };
   
  }
  function openZeros(i) {
    
    if ((i + 1) % size !== 0 
    && i + 1 < elements.length
    && elements[i + 1].style.backgroundColor !== 'white' ) {
      let target = elements[i + 1];
      
      movesCount++;
      target.style.backgroundColor = 'white';
      target.textContent = gameArr[i + 1];
      switch (gameArr[i + 1]) {
        case 0:
          target.style.color = 'white';
          break;
        case 1:
          target.style.color = 'green';
          break;
        case 2:
          target.style.color = 'brown';
          break;
        default:
          target.style.color = 'red';
      };
      if (gameArr[i + 1] === 0) {
        openZeros(i + 1);
      };
    };

   
    if ((i + size) < elements.length && elements[i + size].style.backgroundColor !== 'white' ) {
      let target = elements[i + size];
      movesCount++;
      target.style.backgroundColor = 'white';
      target.textContent = gameArr[i + size];
      switch (gameArr[i + size]) {
        case 0:
          target.style.color = 'white';
          break;
        case 1:
          target.style.color = 'green';
          break;
        case 2:
          target.style.color = 'brown';
          break;
        default:
          target.style.color = 'red';
      };
      if (gameArr[i + size] === 0) {
        openZeros(i + size);
      };
    };
    if (((i - size) >= 0) && (elements[i - size].style.backgroundColor !== 'white') ) {
      let target = elements[i - size];
      movesCount++;
      target.style.backgroundColor = 'white';
      target.textContent = gameArr[i - size];
      switch (gameArr[i - size]) {
        case 0:
          target.style.color = 'white';
          break;
        case 1:
          target.style.color = 'green';
          break;
        case 2:
          target.style.color = 'brown';
          break;
        default:
          target.style.color = 'red';
      };
      if (gameArr[i - size] === 0) {
        openZeros(i - size);
      };
    };

    if (((i - 1) % size !== size - 1) 
    && i - 1 >= 0
    && elements[i - 1].style.backgroundColor !== 'white' ) {
      let target = elements[i - 1];
      movesCount++;
      target.style.backgroundColor = 'white';
      target.textContent = gameArr[i - 1];
      switch (gameArr[i - 1]) {
        case 0:
          target.style.color = 'white';
          break;
        case 1:
          target.style.color = 'green';
          break;
        case 2:
          target.style.color = 'brown';
          break;
        default:
          target.style.color = 'red';
      };
      if (gameArr[i - 1] === 0) {
        openZeros(i - 1);
      };
    };


    if ((i - size - 1) >= 0 
    && (i - size - 1)%size !== size - 1
    && elements[i - size - 1].style.backgroundColor !== 'white' ) {
      let target = elements[i - size - 1];
      movesCount++;
      target.style.backgroundColor = 'white';
      target.textContent = gameArr[i - size - 1];
      switch (gameArr[i - size - 1]) {
        case 0:
          target.style.color = 'white';
          break;
        case 1:
          target.style.color = 'green';
          break;
        case 2:
          target.style.color = 'brown';
          break;
        default:
          target.style.color = 'red';
      };
      if (gameArr[i - size - 1] === 0) {
        openZeros(i - size - 1);
      };
    };

    if ((i + size + 1) < elements.length 
    && (i + size + 1)%size !== 0
    && elements[i + size + 1].style.backgroundColor !== 'white' ) {
      let target = elements[i + size + 1];
      movesCount++;
      target.style.backgroundColor = 'white';
      target.textContent = gameArr[i + size + 1];
      switch (gameArr[i + size + 1]) {
        case 0:
          target.style.color = 'white';
          break;
        case 1:
          target.style.color = 'green';
          break;
        case 2:
          target.style.color = 'brown';
          break;
        default:
          target.style.color = 'red';
      };
      if (gameArr[i + size + 1] === 0) {
        openZeros(i + size + 1);
      };
    };

    if ((i + size - 1) < elements.length
    && (i + size - 1) % size !== size - 1
    && elements[i + size - 1].style.backgroundColor !== 'white' ) {
      let target = elements[i + size - 1];
      movesCount++;
      target.style.backgroundColor = 'white';
      target.textContent = gameArr[i + size - 1];
      switch (gameArr[i + size - 1]) {
        case 0:
          target.style.color = 'white';
          break;
        case 1:
          target.style.color = 'green';
          break;
        case 2:
          target.style.color = 'brown';
          break;
        default:
          target.style.color = 'red';
      };
      if (gameArr[i + size - 1] === 0) {
        openZeros(i + size - 1);
      };
    };

    if ((i - size + 1) > 0
    && (i - size + 1) % size !== 0
    && elements[i - size + 1].style.backgroundColor !== 'white' ) {
      let target = elements[i - size + 1];
      movesCount++;
      target.style.backgroundColor = 'white';
      target.textContent = gameArr[i - size + 1];
      switch (gameArr[i - size + 1]) {
        case 0:
          target.style.color = 'white';
          break;
        case 1:
          target.style.color = 'green';
          break;
        case 2:
          target.style.color = 'brown';
          break;
        default:
          target.style.color = 'red';
      };
      if (gameArr[i - size + 1] === 0) {
        openZeros(i - size + 1);
      };
    };
    return;



  }

};

function fieldHtmlGenerator(size) { // функция возвращает разметку html
  let res = '';
  let res2 = '';
  for (let i = 1; i <= size; i++) {
    for (let i2 = 1; i2 <= size; i2++) {
      res += `<span class="minerGameContainer__item minerGameContainer__item--${i}-${i2}"></span>`
    };
    res2 += `<div class="minerGameContainer__row">${res}</div>`;
    res = '';
  };
  return res2;
}

function minesRandomGenerator(size, minesCount) { // функция возвращает массив с минами и окружающими цифрами
  
  let mines = [];
  for (let i = 0; i < minesCount; i++) {
    mines.push('m');
  };
  for (let i = minesCount; i < size * size; i++) {
    mines.push('');
  }

  mines.sort((a, b) => (Math.random() - 0.5));

  let minesField = [];
  let counter = 0;
  for (let i = 0; i < size; i++) {
    minesField.push([]);
    for (let i2 = 0; i2 < size; i2++) {
      minesField[i][i2] = mines[counter];
      counter++;
    };
  };
  for (let i = 0; i < size; i++) {
    for (let i2 = 0; i2 < size; i2++) {
      if (minesField[i][i2] === '') {
        minesField[i][i2] = 0;

        if ((i !== size - 1)
          && (i2 !== size - 1)
          && minesField[i + 1][i2 + 1] === 'm') {
          minesField[i][i2]++
        }
        if ((i !== size - 1)
          && minesField[i + 1][i2] === 'm') {
          minesField[i][i2]++
        }
        if ((i !== size - 1)
          && (i2 !== 0)
          && minesField[i + 1][i2 - 1] === 'm') {
          minesField[i][i2]++
        }
        if ((i !== 0)
          && (i2 !== 0)
          && minesField[i - 1][i2 - 1] === 'm') {
          minesField[i][i2]++
        };
        if ((i !== 0)
          && minesField[i - 1][i2] === 'm') {
          minesField[i][i2]++
        };
        if ((i2 !== size - 1)
          && (i !== 0)
          && minesField[i - 1][i2 + 1] === 'm') {
          minesField[i][i2]++
        }
        if ((i2 !== 0)
          && minesField[i][i2 - 1] === 'm') {
          minesField[i][i2]++
        };

        if ((i2 !== size - 1)
          && minesField[i][i2 + 1] === 'm') {
          minesField[i][i2]++
        };

      }
    };
  };
  let result = [];
  for (let i = 0; i < minesField.length; i++) {
    result.push(...minesField[i]);
  }
  return result;

}



