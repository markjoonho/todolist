const clock = document.querySelector(".clock-js"),
    time = clock.querySelector(".clock-js__clock");



function getTime(){
    const date = new Date();
    const HOUR = date.getHours();
    const MINUTE = date.getMinutes();
    const SECONDS = date.getSeconds();
    time.innerText=`${HOUR<10 ? `0${HOUR}` : HOUR}:${MINUTE<10 ? `0${MINUTE}` : MINUTE}:${SECONDS<10 ? `0${SECONDS}` : SECONDS}`;
}

function init(){
    getTime();
    setInterval(getTime, 1000);
}
init();