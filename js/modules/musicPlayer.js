import { songList } from './songList.js';

export const initMusicPlayer = () => {
  const musicContainer = document.getElementById('music-container');
  const playBtn = document.getElementById('play');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const audio = document.getElementById('audio');
  const progress = document.getElementById('progress');
  const progressContainer = document.getElementById('progress-container');
  const title = document.getElementById('title');
  const cover = document.getElementById('cover');

  const songIds = Object.keys(songList);
  let songIndex = 0;

  // Functions
  const checkTitleOverflow = () => {
    if (!title) return;
    const container = title.parentElement;
    if (!container) return;

    // Reset title style to get accurate measurements
    title.style.transform = 'translateX(0)';
    
    const scrollWidth = title.scrollWidth;
    const clientWidth = container.clientWidth;

    if (scrollWidth > clientWidth && clientWidth > 0) {
      const distance = scrollWidth - clientWidth;
      title.style.setProperty('--scroll-distance', `-${distance}px`);
      container.classList.add('long-title');
    } else {
      container.classList.remove('long-title');
    }
  };

  const loadSong = (songId) => {
    const song = songList[songId];
    if (title) {
      title.innerText = song.title;
      // Small delay to allow DOM update before checking overflow
      setTimeout(checkTitleOverflow, 50);
    }
    if (audio) audio.src = `music/${song.file}.mp3`;
    if (cover) cover.src = `img/music_${song.file}.jpg`;
  };

  const playSong = () => {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
    audio.play();
  };

  const pauseSong = () => {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.replace('fa-pause', 'fa-play');
    audio.pause();
  };

  // Event Listeners and initialization
  loadSong(songIds[songIndex]);

  // Next song
  function nextSong() {
    if (songIndex < songIds.length - 1) songIndex++;
    else songIndex = 0;
    loadSong(songIds[songIndex]);
    playSong();
  }

  // Previous song
  function previousSong() {
    if (songIndex > 0) songIndex--;
    else songIndex = songIds.length - 1;
    loadSong(songIds[songIndex]);
    playSong();
  }

  // Update progress bar
  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }

  // Set progress bar
  function setProgress(e) {
    const clickX = e.offsetX;
    const width = this.clientWidth;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  }

  // Event listeners

  // Play song
  playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });

  // Change song
  nextBtn.addEventListener('click', nextSong);

  prevBtn.addEventListener('click', previousSong);

  // Time/song update
  audio.addEventListener('timeupdate', updateProgress);

  // Set progress
  progressContainer.addEventListener('click', setProgress);

  // Song ends
  audio.addEventListener('ended', nextSong);

  // Check overflow on resize
  window.addEventListener('resize', checkTitleOverflow);

  // Watch for tab switching to re-check overflow when music player becomes visible
  const footerMusic = document.getElementById('footer-music');
  if (footerMusic) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && footerMusic.classList.contains('active')) {
          // Small delay to ensure layout is updated
          setTimeout(checkTitleOverflow, 100);
        }
      });
    });
    observer.observe(footerMusic, { attributes: true });
  }
};
