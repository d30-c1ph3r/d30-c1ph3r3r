const app = document.querySelector("#app");
localStorage.getItem("page") == "decipherer" ? initDecipherPage() : initQuestionPage();

function initQuestionPage() {
  const isHint1Open = localStorage.getItem("hint-1") == "open";
  const isHint2Open = localStorage.getItem("hint-2") == "open";

  app.innerHTML = `
    <div id="warning">
      <h1>Увага!</h1>
      <h2>Ще не все втрачено!</h2>
      <p id="stats">За статистикою, 70% шифрів не розгадано тільки через те, що отримувач здався на 5 хвилин раніше, ніж треба!<p>
      <hr/>

      <div id="checkboxes">
        <div class="my-checkbox-wrapper">
          <div class="checkbox-wrapper-2">
            <input type="checkbox" class="sc-gJwTLC ikxBAC" id="cb-1" ${isHint1Open ? 'checked' : ''}>
          </div>
          <span>Я даю згоду на отримання підказки №1</span>
        </div>
        <div id="hint-1" class="hint ${isHint1Open ? '' : 'hidden'}">
          <span>Шифр, що було використано в листі ‒ <a href="https://uk.wikipedia.org/wiki/%D0%A8%D0%B8%D1%84%D1%80_%D0%A6%D0%B5%D0%B7%D0%B0%D1%80%D1%8F">Шифр Цезаря!</a></span>

          <div class="my-checkbox-wrapper">
            <div class="checkbox-wrapper-2">
              <input type="checkbox" class="sc-gJwTLC ikxBAC" id="cb-2" ${isHint2Open ? 'checked' : ''}>
            </div>
            <span>Я даю згоду на отримання допомоги від даного сайту в розшируванні цього шифру</span>
          </div>

          <div id="hint-2" class="hint ${isHint2Open ? '' : 'hidden'}">
            <span>В такому разі, пропоную перейти на сторінку дешифратора (Код все одно доведеться підбирати власноруч)</span>

            <div>
              <button class="button-2" role="button" id="redirect">Перейти</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  setTimeout(() => {
    const cb1 = document.getElementById("cb-1");
    cb1.addEventListener('click', () => {
      cb1.checked ? localStorage.setItem('hint-1', "open") : localStorage.setItem('hint-1', 'closed');
      const div = document.getElementById("hint-1");
      cb1.checked ? div.classList.remove('hidden') : div.classList.add('hidden')
    })

    const cb2 = document.getElementById("cb-2");
    cb2.addEventListener('click', () => {
      cb2.checked ? localStorage.setItem('hint-2', "open") : localStorage.setItem('hint-2', 'closed');
      const div = document.getElementById("hint-2");
      cb2.checked ? div.classList.remove('hidden') : div.classList.add('hidden')
    })

    const button = document.getElementById("redirect");
    button.addEventListener('click', () => {
      localStorage.setItem("page", "decipherer");
      initDecipherPage();
    })
  })
}

function initDecipherPage() {
  app.innerHTML = `
    <div id="decipherer">
      <h1>Дешифратор цезаря</h1>
      <hr/>
      <div class="contents">
        <div class="input-container">
          <p class="textarea-title">Вхідне повідомлення:</p>
          <textarea id="input" rows="10"></textarea>
        </div>
        <div class="step">
          <span>Крок шифрування: </span>
          <select id="step-select">
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
            <option value="32">32</option>
          </select>
        </div>
        <div class="button-container">
          <button class="button-2" role="button" id="decipher-btn">Розшифрувати</button>
        </div>
        <div class="output-container">
          <p class="textarea-title">Результат:</p>
          <textarea id="output" rows="10" readonly></textarea>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const button = document.getElementById('decipher-btn');
    button.addEventListener('click', () => {
      const text = document.getElementById('input').value;
      const step = parseInt(document.getElementById('step-select').value);
      const result = caesarDecipher(text, step);
      document.getElementById('output').value = result;
    });
  })
}

function caesarDecipher(text, step) {
  const ukrLowerCaseAlphabet = "абвгдеєжзиійклмнопрстуфхцчшщьюя";
  const ukrUpperCaseAlphabet = "АБВГДЕЄЖЗИІЙКЛМНОПРСТУФХЦЧШЩЬЮЯ";
  const engLowerCaseAlphabet = "abcdefghijklmnopqrstuvwxyz";
  const engUpperCaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const shiftChar = (char, alphabet, shift) => {
    const index = alphabet.indexOf(char);
    if (index === -1) return char;
    let newIndex = (index - shift + alphabet.length) % alphabet.length;
    return alphabet[newIndex];
  };

  return text.split('').map(char => {
    if (ukrLowerCaseAlphabet.includes(char)) {
      return shiftChar(char, ukrLowerCaseAlphabet, step);
    } else if (ukrUpperCaseAlphabet.includes(char)) {
      return shiftChar(char, ukrUpperCaseAlphabet, step);
    } else if (engLowerCaseAlphabet.includes(char)) {
      return shiftChar(char, engLowerCaseAlphabet, step);
    } else if (engUpperCaseAlphabet.includes(char)) {
      return shiftChar(char, engUpperCaseAlphabet, step);
    }
    return char;
  }).join('');
}

function caesarCipher(text, step) {
  const ukrLowerCaseAlphabet = "абвгдеєжзиійклмнопрстуфхцчшщьюя";
  const ukrUpperCaseAlphabet = "АБВГДЕЄЖЗИІЙКЛМНОПРСТУФХЦЧШЩЬЮЯ";
  const engLowerCaseAlphabet = "abcdefghijklmnopqrstuvwxyz";
  const engUpperCaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const shiftChar = (char, alphabet, shift) => {
    const index = alphabet.indexOf(char);
    if (index === -1) return char;
    let newIndex = (index + shift) % alphabet.length;
    return alphabet[newIndex];
  };

  return text.split('').map(char => {
    if (ukrLowerCaseAlphabet.includes(char)) {
      return shiftChar(char, ukrLowerCaseAlphabet, step);
    } else if (ukrUpperCaseAlphabet.includes(char)) {
      return shiftChar(char, ukrUpperCaseAlphabet, step);
    } else if (engLowerCaseAlphabet.includes(char)) {
      return shiftChar(char, engLowerCaseAlphabet, step);
    } else if (engUpperCaseAlphabet.includes(char)) {
      return shiftChar(char, engUpperCaseAlphabet, step);
    }
    return char;
  }).join('');
}