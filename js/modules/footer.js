export const initFooter = () => {
	const footerHTML = `
    <footer>
      <div class="container__footer">
        <div class="footer__left"></div>
        <div class="footer__middle">
          <div class="music-container" id="music-container">
            <div class="music-info">
              <h4 id="title"></h4>
              <div class="progress-container" id="progress-container">
                <div class="progress" id="progress"></div>
              </div>
            </div>
            <audio src="./music/Comptine.mp3" id="audio"></audio>
            <div class="img-container">
              <img src="img/music_Comptine.jpg" alt="music-cover" id="cover" />
            </div>
            <div class="navigation">
              <button id="prev" class="action-btn">
                <i class="fas fa-backward"></i>
              </button>
              <button id="play" class="action-btn action-btn-big">
                <i class="fas fa-play"></i>
              </button>
              <button id="next" class="action-btn">
                <i class="fas fa-forward"></i>
              </button>
            </div>
          </div>
          <p class="footer__copyright">
            Copyright &copy; Son Pham All rights reserved.
          </p>
        </div>
        <div class="footer__right"></div>
      </div>
    </footer>
  `;

	document.body.insertAdjacentHTML("beforeend", footerHTML);
};
