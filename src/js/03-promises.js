import Notiflix from 'notiflix';

const inputForm = document.querySelector('form');

inputForm.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } 
        reject({ position, delay });
    }, delay);
  });
};

// function onResolve(resolve) {
//   Notiflix.Notify.success(resolve);
// };

// function onReject(error) {
//   Notiflix.Notify.failure(error);
// };

function onFormSubmit(event) {
  event.preventDefault();
  let position = 1;
  let delay = Number(event.currentTarget.delay.value);
  let step = Number(event.currentTarget.step.value);
  let amount = Number(event.currentTarget.amount.value);
  // console.log(delay, step, amount, position);

  for (let i = 0; i < amount; i += 1) { 
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    position += 1;
    delay += step;
  };
};

