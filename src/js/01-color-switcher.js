function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

const refs = {
  btnStartEl: document.querySelector('button[data-start]'),
  btnStopEl: document.querySelector('button[data-stop]'),
};

refs.btnStartEl.addEventListener('click', startChangeColor);
refs.btnStopEl.addEventListener('click', stopChangeColor);

function startChangeColor() {
  refs.btnStartEl.disabled = true;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function stopChangeColor() {
  refs.btnStartEl.disabled = false;
  clearInterval(timerId);
}
