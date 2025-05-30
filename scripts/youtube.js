function formatVidTime(time) {
    const hr = Math.floor(time/3600);
    const min = Math.floor(time%3600/60);
    const sec = Math.floor(time%60); // was round but could go to 60

    let txt = hr ? hr+':' : '';
    txt += hr && (min < 10) ? '0'+min+':' : min+':';
    txt += sec < 10 ? '0'+sec : sec;

    return txt;
}

function updateVidDur() {

    const dur = video.duration;
    const rate = video.playbackRate;
    const newDur = dur/rate;
    if (isNaN(newDur)) {return;}
    let txt = '';

    if (rate !== 1) {
        // 0 -> Y:YY
        // 1 -> X:XX (Y:YY)
        // 2 -> X:XX ±Z:ZZ
        if (timeDurFormat === 0) {txt = formatVidTime(newDur);}
        if (timeDurFormat === 1) {txt = `${formatVidTime(dur)} (${formatVidTime(newDur)})`;}
        if (timeDurFormat === 2) {txt = `${formatVidTime(dur)} ${newDur<dur ? '–':'+'}${formatVidTime(Math.abs(dur-newDur))}`;}
    } else {
        txt = formatVidTime(dur);
    }

    timeDur.textContent = txt;
}


// Get video objects
const video = document.querySelector('video'); if (!video) {throw new Error("No video found!");}
const timeDur = document.getElementsByClassName("ytp-time-duration")[0];
video.addEventListener('ratechange', updateVidDur); // set listener


//--- Load settings
let timeDurFormat;
chrome.storage.sync.get( {style: 1}, (items) => {
    timeDurFormat = items.style;
    if (video.playbackRate !== 1) {updateVidDur();} // if default speed not 1x
});
chrome.storage.onChanged.addListener( (changes) => {
    if ('style' in changes) { // update live if changed
        timeDurFormat = changes.style.newValue;
        updateVidDur();
    }
});