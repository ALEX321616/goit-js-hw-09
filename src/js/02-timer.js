import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let refs = {
  dataInputEl: document.getElementById('datetime-picker'),
  btnStartEl: document.querySelector('[data-start]'),
  dataDaysEl: document.querySelector('[data-days]'),
  dataHoursEl: document.querySelector('[data-hours]'),
  dataMinutesEl: document.querySelector('[data-minutes]'),
  dataSecondsEl: document.querySelector('span[data-seconds]'),
};

refs.btnStartEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      refs.btnStartEl.addEventListener('click', startTimer);
      refs.btnStartEl.disabled = false;
      function startTimer() {
        Notiflix.Notify.success('Start');
        refs.dataInputEl.disabled = true;
        refs.btnStartEl.disabled = true;
        refs.btnStartEl.removeEventListener('click', startTimer);
        let timerId = setInterval(() => {
          if (selectedDates[0] - new Date() > 0) {
            showTimer(convertMs(selectedDates[0] - new Date()));
          } else {
            clearInterval(timerId);

            Notiflix.Notify.success('Finish');
            refs.dataInputEl.disabled = false;
          }
        }, 1000);
      }
    } else {
      refs.btnStartEl.disabled = true;
    }
  },

  onOpen() {
    refs.btnStartEl.disabled = true;
  },
  onChange(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    Notiflix.Notify.info('Date selected');
  },
};
flatpickr('#datetime-picker', options);
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function showTimer({ days, hours, minutes, seconds }) {
  refs.dataDaysEl.textContent = addLeadingZero(days);
  refs.dataHoursEl.textContent = addLeadingZero(hours);
  refs.dataMinutesEl.textContent = addLeadingZero(minutes);
  refs.dataSecondsEl.textContent = addLeadingZero(seconds);
}
