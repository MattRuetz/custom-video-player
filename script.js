const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //
const showPlayIcon = () => {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

const togglePlay = () => {
    if(video.paused) {
        video.play()
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    } else {
        video.pause();
        playBtn.classList.replace('fa-pause', 'fa-play');
        playBtn.setAttribute('title', 'Play');
    }
}

// Progress Bar ---------------------------------- //
// Calculate display time values
const displayTime = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds < 10 && (seconds = `0${seconds}`);

    return `${minutes}:${seconds}`;
}

//Update progress as video plays
const updateProgress = () => {
    progressBar.style.width = `${(video.currentTime / video.duration)*100}%`
    currentTime.textContent = `${displayTime(video.currentTime)} /`
    duration.textContent = `${displayTime(video.duration)}`
}

const setProgress = (event) => {
    const newTime = event.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime}%`;
    video.currentTime = newTime * video.duration;
    updateProgress();
}

// Volume Controls --------------------------- //
let lastVolume = 1;

// Volume Bar
const changeVolume = (e) => {
    let volume = e.offsetX / volumeRange.offsetWidth;
    //Round vol
    if (volume < 0.1) {
        volume = 0;
    } else if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume*100}%`;
    video.volume = volume;

    // Change voume icon to show relative vol
    volumeIcon.className = ''; //Removes ALL classes from volumeIcon
    
    if(volume > 0.7) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-high');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-low');
    } else {
        volumeIcon.classList.add('fa-solid', 'fa-volume-off');
    }
    lastVolume = volume;

}

// Mute / Unmute
const toggleMute = () => {

    volumeIcon.className = '';

    if (video.volume) {
        lastVolume = video.volume; //store volume
        video.volume = 0; //mute
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fa-solid', 'fa-volume-mute');
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`
        volumeIcon.classList.add('fa-solid', 'fa-volume-high');
        volumeIcon.setAttribute('title', 'Unmute');
    }
}

// Change Playback Speed -------------------- //
const changeSpeed = () => {
    video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}
/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

let fullscreen = false;

// Toggle fullscreen
function toggleFullscreen() {
  fullscreen ? closeFullscreen() : openFullscreen(player);
  fullscreen = !fullscreen;
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
video.addEventListener('ended', showPlayIcon);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);

changeSpeed();