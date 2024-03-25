const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const fullscreenBtn = player.querySelector(".fullscreen");
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll('.player__slider');
const soundIcons = player.querySelectorAll('.sound-icon');

let lastRange;
let mousedown = false;

function updateIcons() {
    soundIcons.forEach(icon => {
        icon.classList.contains('hidden') ? icon.classList.remove('hidden') : icon.classList.add('hidden'); 
    });
};

function handleMute() {
    
    const soundBar = ranges[0];

    if(video.volume != 0) {
        video.volume = 0;
        updateIcons();
    } else {
        video.volume = lastRange;
        updateIcons();
    };
    soundBar.value = video.volume;
};

function handleRangeChange() {
      video[this.name] = this.value;
      lastRange = video.volume;
      console.log(this.name);
}

function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    };
};

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
};

function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
};

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

soundIcons.forEach(icon => icon.addEventListener('click', handleMute));
ranges.forEach(range => range.addEventListener('change', handleRangeChange));
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
skipButtons.forEach(button => {
    button.addEventListener('click', skip);
});
fullscreenBtn.addEventListener('click', () => {
    video.requestFullscreen();
})
