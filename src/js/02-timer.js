import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    input: document.querySelector('input[type="text"]'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
//   minDate: new Date(), 
  minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        validateDate(selectedDates);
    },
};

const timerApi = flatpickr(refs.input, options);
console.log(timerApi);
refs.startBtn.disabled = true;

class Timer {
    constructor ({onTick}) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
    }

    init() {
        refs.startBtn.disabled = true;
    }

    start() {
        if (this.isActive) {
            return;
        }

        this.isActive = true;
        refs.startBtn.disabled = true;
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const finishTime = Date.parse(refs.input.value);
            const deltaTime = finishTime - currentTime;
            const time = this.convertMs(deltaTime);
            this.onTick(time);
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
    }

    convertMs(ms) {

        if (ms <= 0) {
            Notiflix.Report.info('Time is gone!!');
            this.stop();
            this.init();
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

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

    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    }
}

const countTimer = new Timer({
    onTick: updateClockface,
});

function validateDate(date) {
    if (Date.parse(date) < Date.now()) {
        Notiflix.Report.failure('Please choose a date in the future');
        refs.startBtn.disabled = true;
        return;
    }
    refs.startBtn.disabled = false;
}

function updateClockface({ days, hours, minutes, seconds }) {
    refs.days.textContent = this.addLeadingZero(days);
    refs.hours.textContent = this.addLeadingZero(hours);
    refs.minutes.textContent = this.addLeadingZero(minutes);
    refs.seconds.textContent = this.addLeadingZero(seconds); 
}

refs.startBtn.addEventListener('click', countTimer.start.bind(countTimer));
