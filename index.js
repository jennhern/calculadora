var theme = 0; //  de 0 a 2
var numero1 = 0;
var opEncurso = "";
var lastButton;

var toggle = document.getElementById("toggle");
toggle.addEventListener("click", clickToggle);

var keypad = document
  .getElementById("keypad")
  .addEventListener("click", clickKeypad);

function clickKeypad(evt) {
  console.log(evt);
  let btn = evt.target;
  if (btn.localName === "div") return; //termina la función

  console.log("boton: ", btn.innerText);
  let display = document.getElementById("display");

  if (btn.innerText === "=") {
    let resultado = hacerUltimaOperacion(
      numero1,
      parseFloat(display.innerHTML),
      opEncurso
    );
    display.innerText = resultado;
  }
  if (isOperadorAritmetico(btn.innerText)) {
    console.log("Es un operador aritmetico");
    // si hay operacion pendiente.
    if (opEncurso !== "") {
      display.innerText = hacerUltimaOperacion(
        numero1,
        parseFloat(display.innerHTML),
        opEncurso
      );
    }

    numero1 = parseFloat(display.innerText);
    opEncurso = btn.innerText;
    // display.innerText = "";
  }

  // Cuando pulsamos el boton DEL
  if (btn.innerText === "DEL") {
    display.textContent = display.textContent.substring(
      0,
      display.textContent.length - 1
    );
  }
  if (btn.innerText === "RESET") {
    display.textContent = "";
    numero1 = 0;
    opEncurso = "";
  }

  // Si el boton es un numero o .
  if (isNumberOrDot(btn.innerText)) {
    // index = -1 si el punto no esta
    // index = 0 a superior si tiene un punto
    let index = display.textContent.indexOf(".");
    console.log("punto pos: ", index);
    // Escribe el punto en el display si procede
    if (
      index < 0 &&
      btn.innerText === "." &&
      display.innerText !== "" &&
      !isOperadorAritmetico(lastButton)
    ) {
      display.textContent += btn.innerText;
    }

    // Se encarga de escribir los numeros en el display/pantalla
    if (btn.innerText !== ".") {
      // Borra la pantalla/display en el caso de que el boton anterior sea un = o +,-,/,x
      if (lastButton === "=" || isOperadorAritmetico(lastButton)) {
        display.innerText = "";
      }
      display.textContent += btn.innerText;
    }
  }

  lastButton = btn.innerText;
}

function hacerUltimaOperacion(num1, num2, op) {
  let resultado = 0;
  if (op === "+") {
    resultado = num1 + num2;
  } else if (opEncurso === "-") {
    resultado = num1 - num2;
  } else if (opEncurso === "x") {
    resultado = num1 * num2;
  } else if (opEncurso === "/") {
    resultado = num1 / num2;
  }
  return resultado;
}

function isOperadorAritmetico(caracter) {
  return (
    caracter === "-" ||
    caracter === "+" ||
    caracter === "/" ||
    caracter === "x"
  );
}
// Comprueba si es un numero o un punto
function isNumberOrDot(caracter) {
  return caracter === "." || (caracter >= "0" && caracter <= "9");
}

function clickToggle() {
  let t = nextTheme();
  changeTheme(t);
  moveToggle(t);
}

function nextTheme() {
  theme = (theme + 1) % 3;
  return theme + 1;
}
function changeTheme(tema) {
  let body = document.querySelector("body");
  for (let i = 1; i <= 3; i++)
    // Eliminamos las clases theme-*
    if (body.classList.contains(`theme-${i}`))
      body.classList.remove(`theme-${i}`);
  body.classList.add(`theme-${tema}`);
}

function moveToggle(tema) {
  for (let i = 1; i <= 3; i++) {
    // Eliminamos las clases theme_point-*
    if (
      toggle.firstElementChild.classList.contains(`theme_point-${i}`)
    ) {
      toggle.firstElementChild.classList.remove(`theme_point-${i}`);
    }
  }
  toggle.firstElementChild.classList.add(`theme_point-${tema}`);
}
