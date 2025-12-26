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
  const loadSong = (songId) => {
    const song = songList[songId];
    if (title) title.innerText = song.title;
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
};
