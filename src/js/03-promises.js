import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', e => {
  e.preventDefault();
  let { delay, step, amount } = e.currentTarget;
  let delayValue = +delay.value;
  let stepValue = +step.value;
  let amountValue = +amount.value;

  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, delayValue);
    delayValue += stepValue;
  }
});
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
