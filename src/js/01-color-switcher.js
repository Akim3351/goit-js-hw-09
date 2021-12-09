const SWITCH_DELAY = 1000;
const refs = {
    startSwitchBtn: document.querySelector('button[data-start]'),
    stopSwitchBtn: document.querySelector('button[data-stop]'),
    bodyEl: document.body,
};
let intervalId = null;

refs.startSwitchBtn.addEventListener('click', onStartSwitchClick);
refs.stopSwitchBtn.addEventListener('click', onStopSwitchClick);

buttonsInitState();
function buttonsInitState() {
    refs.startSwitchBtn.disabled = false;
    refs.stopSwitchBtn.disabled = true;
};

function buttonsActiveState() {
    refs.startSwitchBtn.disabled = true;
    refs.stopSwitchBtn.disabled = false;
}

function onStartSwitchClick() {
    intervalId = setInterval(switchColor, SWITCH_DELAY);
    buttonsActiveState();
}

function onStopSwitchClick() {
    clearInterval(intervalId);
    buttonsInitState();
}

function switchColor() {
        const randomHexColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        refs.bodyEl.setAttribute('style', `background-color: ${randomHexColor}`);
}