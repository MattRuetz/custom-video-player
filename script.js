const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeBar = document.querySelector('.volume-bar');
const volumeRange = document.querySelector('.volume-range');
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
    

}

// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //


// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
video.addEventListener('ended', showPlayIcon);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume)