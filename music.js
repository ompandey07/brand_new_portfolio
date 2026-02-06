// ============================================
// Music Player - Om Pandey Portfolio
// ============================================

// Songs Data - Add more songs here
const songs = [
    {
        title: "Arz Kiya Hai",
        artist: "Unknown Artist",
        src: "Songs/ Arz Kiya Hai.mp3",
        cover: "Songs/Arz Kiya Hai.jpg"
    },
    {
        title: "Ye Tune Kya Kiya",
        artist: "Unknown Artist",
        src: "Songs/Ye Tune Kya Kiya.mp3",
        cover: "Songs/Ye Tune Kya Kiya.jpg"
    },
    {
        title: "Aaj Se Teri",
        artist: "Arijit Singh",
        src: "Songs/Arijit Singh - Aaj Se Teri.mp3",
        cover: "Songs/aaj-se-teri-padman.jpg"
    },
    {
        title: "Sanani",
        artist: "Unknown Artist",
        src: "Songs/Sanani.mp3",
        cover: "Songs/Sanani.jpg"
    },
    {
        title: "See You Again",
        artist: "Wiz Khalifa",
        src: "Songs/Wiz Khalifa - See You Again.mp3",
        cover: "Songs/See You Again.jpg"
    }
];


// State
let currentSongIndex = 0;
let isPlaying = false;
let isPlayerOpen = false;

// DOM Elements
const musicWidget = document.querySelector('.music-widget');
const musicWidgetBtn = document.getElementById('musicWidgetBtn');
const musicWidgetLabel = document.getElementById('musicWidgetLabel');

const musicPlayer = document.getElementById('musicPlayer');
const musicPlayerHeader = document.getElementById('musicPlayerHeader');
const musicPlayerBody = document.getElementById('musicPlayerBody');
const musicPlayerMini = document.getElementById('musicPlayerMini');
const musicPlayerMinimize = document.getElementById('musicPlayerMinimize');
const musicPlayerClose = document.getElementById('musicPlayerClose');

const audioPlayer = document.getElementById('audioPlayer');
const musicCover = document.getElementById('musicCover');
const musicCoverMini = document.getElementById('musicCoverMini');
const musicTitle = document.getElementById('musicTitle');
const musicTitleMini = document.getElementById('musicTitleMini');
const musicArtist = document.getElementById('musicArtist');

const playPauseBtn = document.getElementById('playPauseBtn');
const miniPlayPauseBtn = document.getElementById('miniPlayPauseBtn');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationTimeEl = document.getElementById('durationTime');

const volumeBtn = document.getElementById('volumeBtn');
const volumeSlider = document.getElementById('volumeSlider');

// ============================================
// Music Player Functions
// ============================================

function toggleMusicPlayer() {
    if (isPlayerOpen) {
        closeMusicPlayer();
    } else {
        openMusicPlayer();
    }
}

function openMusicPlayer() {
    loadSong(currentSongIndex);
    musicPlayer.classList.add('active');
    isPlayerOpen = true;
    updatePlayPauseIcons();
}

function closeMusicPlayer() {
    musicPlayer.classList.remove('active');
    isPlayerOpen = false;
    pauseSong();
}

function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    musicCover.src = song.cover;
    musicCoverMini.src = song.cover;
    musicTitle.textContent = song.title;
    musicTitleMini.textContent = song.title;
    musicArtist.textContent = song.artist;
    
    // Set volume
    audioPlayer.volume = volumeSlider.value / 100;
    
    // Reset progress
    progressBar.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    durationTimeEl.textContent = '0:00';
}

function playSong() {
    audioPlayer.play();
    isPlaying = true;
    musicPlayer.classList.add('playing');
    musicWidget.classList.add('playing');
    updatePlayPauseIcons();
}

function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    musicPlayer.classList.remove('playing');
    musicWidget.classList.remove('playing');
    updatePlayPauseIcons();
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// Update play/pause button icons
function updatePlayPauseIcons() {
    // Main play/pause button
    if (isPlaying) {
        // Music is playing - show PAUSE icon (||)
        playPauseBtn.innerHTML = '<i data-lucide="pause"></i>';
        miniPlayPauseBtn.innerHTML = '<i data-lucide="pause"></i>';
    } else {
        // Music is paused - show PLAY icon (▶)
        playPauseBtn.innerHTML = '<i data-lucide="play"></i>';
        miniPlayPauseBtn.innerHTML = '<i data-lucide="play"></i>';
    }
    
    // Re-initialize lucide icons
    lucide.createIcons();
}

// Update volume icon
function updateVolumeIcon() {
    const volume = audioPlayer.volume;
    
    if (volume === 0) {
        volumeBtn.innerHTML = '<i data-lucide="volume-x"></i>';
    } else if (volume < 0.5) {
        volumeBtn.innerHTML = '<i data-lucide="volume-1"></i>';
    } else {
        volumeBtn.innerHTML = '<i data-lucide="volume-2"></i>';
    }
    
    lucide.createIcons();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

// Format time helper
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update progress bar
function updateProgress() {
    const { currentTime, duration } = audioPlayer;
    
    if (!isNaN(duration) && duration > 0) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(currentTime);
        durationTimeEl.textContent = formatTime(duration);
    }
}

// Set progress on click
function setProgress(e) {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const duration = audioPlayer.duration;
    
    if (!isNaN(duration)) {
        audioPlayer.currentTime = (clickX / width) * duration;
    }
}

// Volume control
function updateVolume() {
    const volume = volumeSlider.value / 100;
    audioPlayer.volume = volume;
    updateVolumeIcon();
}

function toggleMute() {
    if (audioPlayer.volume > 0) {
        audioPlayer.dataset.previousVolume = audioPlayer.volume;
        audioPlayer.volume = 0;
        volumeSlider.value = 0;
    } else {
        const prevVol = parseFloat(audioPlayer.dataset.previousVolume) || 0.7;
        audioPlayer.volume = prevVol;
        volumeSlider.value = prevVol * 100;
    }
    updateVolumeIcon();
}

// Minimize/Expand player
function minimizePlayer() {
    musicPlayer.classList.add('minimized');
    musicPlayerBody.style.display = 'none';
    musicPlayerMini.style.display = 'flex';
    updatePlayPauseIcons();
}

function expandPlayer() {
    musicPlayer.classList.remove('minimized');
    musicPlayerBody.style.display = 'block';
    musicPlayerMini.style.display = 'none';
    updatePlayPauseIcons();
}

// ============================================
// Draggable Player
// ============================================

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

musicPlayerHeader.addEventListener('mousedown', startDrag);
musicPlayerHeader.addEventListener('touchstart', startDragTouch, { passive: false });

function startDrag(e) {
    // Don't drag if clicking on buttons
    if (e.target.closest('button')) return;
    
    isDragging = true;
    const rect = musicPlayer.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function startDragTouch(e) {
    // Don't drag if clicking on buttons
    if (e.target.closest('button')) return;
    
    isDragging = true;
    const rect = musicPlayer.getBoundingClientRect();
    const touch = e.touches[0];
    dragOffsetX = touch.clientX - rect.left;
    dragOffsetY = touch.clientY - rect.top;
    
    document.addEventListener('touchmove', dragTouch, { passive: false });
    document.addEventListener('touchend', stopDrag);
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    let x = e.clientX - dragOffsetX;
    let y = e.clientY - dragOffsetY;
    
    // Boundary checks
    const maxX = window.innerWidth - musicPlayer.offsetWidth;
    const maxY = window.innerHeight - musicPlayer.offsetHeight;
    
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));
    
    musicPlayer.style.left = `${x}px`;
    musicPlayer.style.top = `${y}px`;
    musicPlayer.style.right = 'auto';
    musicPlayer.style.bottom = 'auto';
}

function dragTouch(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    let x = touch.clientX - dragOffsetX;
    let y = touch.clientY - dragOffsetY;
    
    const maxX = window.innerWidth - musicPlayer.offsetWidth;
    const maxY = window.innerHeight - musicPlayer.offsetHeight;
    
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));
    
    musicPlayer.style.left = `${x}px`;
    musicPlayer.style.top = `${y}px`;
    musicPlayer.style.right = 'auto';
    musicPlayer.style.bottom = 'auto';
}

function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', dragTouch);
    document.removeEventListener('touchend', stopDrag);
}

// ============================================
// Event Listeners
// ============================================

// Play/Pause buttons
playPauseBtn.addEventListener('click', togglePlay);
miniPlayPauseBtn.addEventListener('click', togglePlay);

// Next/Previous
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Progress
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('loadedmetadata', () => {
    durationTimeEl.textContent = formatTime(audioPlayer.duration);
});
progressContainer.addEventListener('click', setProgress);

// Volume
volumeSlider.addEventListener('input', updateVolume);
volumeBtn.addEventListener('click', toggleMute);

// Minimize/Expand
musicPlayerMinimize.addEventListener('click', minimizePlayer);
miniExpandBtn.addEventListener('click', expandPlayer);

// Close player
musicPlayerClose.addEventListener('click', closeMusicPlayer);

// Song ended - play next
audioPlayer.addEventListener('ended', nextSong);

// Handle play/pause state changes from audio element
audioPlayer.addEventListener('play', () => {
    isPlaying = true;
    musicPlayer.classList.add('playing');
    musicWidget.classList.add('playing');
    updatePlayPauseIcons();
});

audioPlayer.addEventListener('pause', () => {
    isPlaying = false;
    musicPlayer.classList.remove('playing');
    musicWidget.classList.remove('playing');
    updatePlayPauseIcons();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (!musicPlayer.classList.contains('active')) return;
    
    // Don't trigger if typing in input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            togglePlay();
            break;
        case 'ArrowRight':
            audioPlayer.currentTime += 5;
            break;
        case 'ArrowLeft':
            audioPlayer.currentTime -= 5;
            break;
        case 'ArrowUp':
            e.preventDefault();
            volumeSlider.value = Math.min(100, parseInt(volumeSlider.value) + 10);
            updateVolume();
            break;
        case 'ArrowDown':
            e.preventDefault();
            volumeSlider.value = Math.max(0, parseInt(volumeSlider.value) - 10);
            updateVolume();
            break;
        case 'KeyM':
            toggleMute();
            break;
        case 'KeyN':
            nextSong();
            break;
        case 'KeyP':
            prevSong();
            break;
        case 'Escape':
            closeMusicPlayer();
            break;
    }
});

// Initialize lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    updatePlayPauseIcons();
    updateVolumeIcon();
});

// Hide label after 10 seconds if not clicked
setTimeout(() => {
    if (musicWidgetLabel && !isPlayerOpen) {
        musicWidgetLabel.style.opacity = '0';
        musicWidgetLabel.style.transform = 'translateY(10px)';
        setTimeout(() => {
            if (musicWidgetLabel) {
                musicWidgetLabel.style.display = 'none';
            }
        }, 300);
    }
}, 10000);

// Show label again on widget hover
if (musicWidget) {
    musicWidget.addEventListener('mouseenter', () => {
        if (!isPlayerOpen && musicWidgetLabel) {
            musicWidgetLabel.style.display = 'block';
            setTimeout(() => {
                musicWidgetLabel.style.opacity = '1';
                musicWidgetLabel.style.transform = 'translateY(0)';
            }, 10);
        }
    });

    musicWidget.addEventListener('mouseleave', () => {
        if (!isPlayerOpen && musicWidgetLabel) {
            musicWidgetLabel.style.opacity = '0';
            musicWidgetLabel.style.transform = 'translateY(10px)';
        }
    });
}