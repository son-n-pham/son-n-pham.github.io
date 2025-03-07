export const initNavbar = () => {
	const navbarHTML = `
    <nav class="nav">
      <div class="container__navbar">
        <h1 class="nav__name">SON PHAM</h1>
        <ul class="nav__links">
          <li>
            <a href="#about-me" class="nav__link" data-slide="0">About Me</a>
          </li>
          <li>
            <a href="#education" class="nav__link" data-slide="1">Education</a>
          </li>
          <li>
            <a href="#expertise" class="nav__link" data-slide="2">Expertise</a>
          </li>
          <li>
            <a href="#career-timeline" class="nav__link" data-slide="3">Career Timeline</a>
          </li>
          <li>
            <a href="docs/SON-PHAM_resume.pdf" class="nav__link nav__link--resume" download="SON-PHAM_resume.pdf">
              Download My Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `;

	// Insert the navbar at the top of the body
	document.body.insertAdjacentHTML("afterbegin", navbarHTML);
};
