const slides = [
`
    <div class="slide">
      <section id="about-me" class="section about-me resume">
        <div class="section-container">
          <div class="about-me__name">
            <h2>
              Son
              <span class="about-me__name--family">Pham</span>
            </h2>
            <div class="about-me__contact">
              South Perth, Western Australia | +61 439 022 252 |
              son.pham2@bakerhughes.com
            </div>
          </div>

          <div class="statement">
            <p>A team-oriented, responsible, diligent, quick-learning, creative, and adaptable employee.</p>
            <p>I enjoy automating processes and developing tools for myself, colleagues, and customers to boost productivity, efficiency, and save both time and costs.</p>
          </div>

          <div class="contact-icons">
            <div class="contact-link">
              <a href="https://www.linkedin.com/in/son-n-pham/" target="_blank">
                <i class="fab fa-linkedin about-me__contact-icons"></i>
              </a>
            </div>
            <div class="contact-link">
              <a href="https://github.com/son-n-pham" target="_blank">
                <i class="fab fa-github about-me__contact-icons"></i>
              </a>
            </div>
            <div class="contact-link">
              <a href="https://hub.docker.com/u/phamsonn" target="_blank">
                <i class="fab fa-docker about-me__contact-icons"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
`,
`
    <div class="slide">
      <section id="education" class="section education resume">
        <div class="card-group justify-content-center">
          <div class="col">
            <div class="card" style="max-width: 18rem">
              <div class="card-icon">
                <img src="img/edu_HCMUT.png"
                  class="card-img-top" alt="DHBK" />
              </div>
              <div class="card-body">
                <h5 class="card-title">HCMC University of Technology</h5>
                <p class="card-text">BSc. Petroleum Geology (2000-2005)</p>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card" style="max-width: 18rem">
              <div class="card-icon">
                <img src="img/edu_UWA.jpg"
                  class="card-img-top" alt="uwa" />
              </div>
              <div class="card-body">
                <h5 class="card-title">University of Western Australia</h5>
                <p class="card-text">
                  Master of Information Technology (2021 - 2023)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
`,
`
    <div class="slide">
      <section id="expertise" class="section expertise resume">
        <div class="card__list">
          <article class="card--expertise">
            <header class="card__header">
              <div class="card__box-img">
                <img class="card__img" src="img/expertise_data-science.png" alt="data science">
              </div>
              <h2>Data Science</h2>
            </header>

            <div class="card__details">
              <div class="card__details--text">
                My whole career is relating to data analytics with the
                data of geology, reservoir engineering, geological model,
                drilling and drill bits.
              </div>
              <div class="card__details--text">
                Since year 2017, I started exploring machine learning to apply into my work to be more productive and
                achieve better analysis result.
              </div>
          </article>

          <article class="card--expertise">
            <header class="card__header">
              <div class="card__box-img">
                <img class="card__img" src="img/expertise_software.png" alt="software">
                <img class="card__img" src="img/expertise_cloud.png" alt="cloud">
              </div>
              <h2>Software Development & Cloud Computing</h2>
            </header>

            <div class="card__details">
              <div class="card__details--text">
                I have felt in love with coding since my childhood with my beloved IBM 386 and MS-DOS OS. I resumed my
                coding learning since year 2015, but take it seriously when learning master degree of IT in UWA.
              </div>
              <div class="card__details--text">
                Web programming is my current focus with the main programming languages of Python, Javascript, and
                various modern serverless technologies from cloud computing.
              </div>
          </article>

          <article class="card--expertise">
            <header class="card__header">
              <div class="card__box-img">
                <img class="card__img" src="img/expertise_geology.png" alt="geology">
              </div>

              <h2>Petroleum Geology & Reservoir Engineering</h2>
            </header>

            <div class="card__details">
              <div class="card__details--text">
                I studied BSc Petroleum Geology in Vietnam and also had 2 years of researching on geological modelling
                and reservoir flow simulation.
              </div>
              <div class="card__details--text">
                Although I am working with drill bits and drilling application engineering now, I still apply geology
                knowledge in daily work to consult our customers and team members across Asia Pacific.
              </div>
          </article>

          <article class="card--expertise">
            <header class="card__header">
              <div class="card__box-img">
                <img class="card__img" src="img/expertise_rig.png" alt="rig">
              </div>

              <h2>Drilling & Drill Bit Application Engineering</h2>

              <div class="card__details">
                <div class="card__details--text">
                  I started working for Baker Hughes Drill Bits since year 2008 in several positions, and application
                  engineering is my backbone to ensure the excellent service delivery to our customer operations.
                </div>
                <div class="card__details--text">
                  Although I am working with drill bits and drilling application engineering now, I still apply geology
                  knowledge in daily work to consult our customers and team members across Asia Pacific.
                </div>
              </div>
            </header>
          </article>

          <article class="card--expertise">
            <header class="card__header">
              <div class="card__box-img">
                <img class="card__img" src="img/expertise_pdc.png" alt="PDC">
              </div>

              <h2>PDC Design</h2>

              <div class="card__details">
                <div class="card__details--text">
                  My curiosity and desire to exceed customers' expectation do not stop at application engineering but
                  extends to mechanical engineering work by designing PDC bits.
                </div>
                <div class="card__details--text">
                  Being able to design PDC bits allows me to implement ideas and resolutions fluidly and rapidly to have
                  actual designs, which shorten the invaluable time to bring the suitable bits to our clients'
                  locations.
                </div>
              </div>
            </header>
          </article>

          <article class="card--expertise">
            <header class="card__header">
              <div class="card__box-img">
                <img class="card__img" src="img/expertise_people.png" alt="people">
              </div>
              <h2>Technical Sales, Account Management</h2>

              <div class="card__details">
                <div class="card__details--text">
                  I started working for Baker Hughes as a account manager in Vietnam, and then expands my technical
                  sales and account management to customers across Asia Pacific.
                </div>
                <div class="card__details--text">
                  My customers are varied from national, international and joint-venture oil & gas companies, whom I
                  enjoy any momenta of my days to support.
                </div>
              </div>
            </header>
          </article>

          <article class="card--expertise">
            <header class="card__header">
              <div class="card__box-img">
                <img class="card__img" src="img/expertise_analyze.png" alt="analyze">
              </div>
              <h2>Root-Cause Analysis (RCA)</h2>

              <div class="card__details">
                <div class="card__details--text">
                  I have been doing RCA since the beginning of the career, and the skill is sharpened drastically over
                  time, especially when it is developed along with other new technical, commercial and coding skills.
                </div>
                <div class="card__details--text">
                  As the engineering lead of the whole Asia Pacific region, I have opportunities to resolve highly
                  challenging issues/incidents by implementing the developed RCA skill and gain more RCA experience at
                  the same time.
                </div>
              </div>
            </header>
          </article>

        </div>
      </section>
    </div>
`,
`
    <div class="slide">
      <section id="career-timeline" class="container-fluid section experience">
        <div class="row timeline">
          <div class="col">
            <div class="timeline-steps aos-init aos-animate" data-aos="fade-up">
              <div class="timeline-step">
                <div class="timeline-content">
                  <button type="button" class="btn-secondary inner-circle" data-bs-toggle="popover"
                    data-bs-placement="top" data-bs-trigger="focus" title="Intern"
                    data-bs-content="- Learn and adopt Schlumberger's QHSE&#10;- Manage inventory and ad hocly support onsite engineer"></button>
                  <p class="h6 mt-3 mb-1">2002</p>
                  <p class="h6 text-muted mb-0 mb-lg-0">Russia</p>
                  <p class="h6 text-muted mb-0 mb-lg-0">Schlumberger</p>
                </div>
              </div>
              <div class="timeline-step">
                <div class="timeline-content">
                  <button type="button" class="btn-secondary inner-circle" data-bs-toggle="popover"
                    data-bs-placement="top" data-bs-trigger="focus" title="Business Assistant"
                    data-bs-content="-Contract and tender support&#10;-Engineering support&#10;-Business development for Vietnam market"></button>
                  <p class="h6 mt-3 mb-1">2005</p>
                  <p class="h6 text-muted mb-0 mb-lg-0">Vietnam</p>
                  <p class="h6 text-muted mb-0 mb-lg-0">Sumitomo</p>
                </div>
              </div>
              <div class="timeline-step">
                <div class="timeline-content">
                  <button type="button" class="btn-secondary inner-circle" data-bs-toggle="popover"
                    data-bs-placement="top" data-bs-trigger="focus" title="Jr. Reservoir Engineer"
                    data-bs-content="- Monitor, analyse and forecast well performances&#10;- Manage database for oil-production wells&#10;- Coordinate to resolve daily production operation issues and prepare production reports for company and partners"></button>
                  <p class="h6 mt-3 mb-1">2005</p>
                  <p class="h6 text-muted mb-0 mb-lg-0">Vietnam</p>
                  <p class="h6 text-muted mb-0 mb-lg-0">
                    Japan Vietnam Petroleum Company (JVPC)
                  </p>
                </div>
              </div>
              <div class="timeline-step">
                <div class="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title=""
                  data-content="" data-original-title="">
                  <button type="button" class="btn-secondary inner-circle" data-bs-toggle="popover"
                    data-bs-placement="top" data-bs-trigger="focus" title="Sales Manager"
                    data-bs-content="- Manage P&L, HR, inventory Account and sales management&#10;- Application engineering&#10;- Mentoring employees"></button>
                  <p class="h6 mt-3 mb-1">2008</p>
                  <p class="h6 text-muted mb-0 mb-lg-0">Vietnam</p>
                  <p class="h6 text-muted mb-0 mb-lg-0">Baker Hughes</p>
                </div>
              </div>
              <div class="timeline-step mb-0">
                <div class="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title=""
                  data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2020">
                  <button type="button" class="btn-secondary inner-circle" data-bs-toggle="popover"
                    data-bs-placement="top" data-bs-trigger="focus" title="Designer & Application Engineer"
                    data-bs-content="- PDC designer&#10;- DART application engineer for Asia Pacific and Africa"></button>
                  <p class="h6 mt-3 mb-1">2012</p>
                  <p class="h6 text-muted mb-0 mb-lg-0">USA</p>
                  <p class="h6 text-muted mb-0 mb-lg-0">Baker Hughes</p>
                </div>
              </div>
              <div class="timeline-step mb-0">
                <div class="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title=""
                  data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2020">
                  <button type="button" class="btn-secondary inner-circle" data-bs-toggle="popover"
                    data-bs-placement="top" data-bs-trigger="focus" title="Account Manager"
                    data-bs-content="- Account and sales management for key offshore customers&#10;- Design PDC for Australia&#10;- Be the technical lead and mentor team members"></button>
                  <p class="h6 mt-3 mb-1">2014</p>
                  <p class="h6 text-muted mb-0 mb-lg-0">Australia</p>
                  <p class="h6 text-muted mb-0 mb-lg-0">Baker Hughes</p>
                </div>
              </div>
              <div class="timeline-step mb-0">
                <div class="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title=""
                  data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2020">
                  <button type="button" class="btn-secondary inner-circle" data-bs-toggle="popover"
                    data-bs-placement="top" data-bs-trigger="focus" title="APAC Engineering Manager"
                    data-bs-content="- Engineering management for Drill Bit operation in APAC&#10;- Design PDC for key applications in the region&#10;- Mentor and support team members across the region&#10;- Work closely with other product lines for new market/opportunity in the region"></button>
                  <p class="h6 mt-3 mb-1">2016</p>
                  <p class="h6 text-muted mb-0 mb-lg-0">Australia - APAC</p>
                  <p class="h6 text-muted mb-0 mb-lg-0">Baker Hughes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
`
];

export default slides;
