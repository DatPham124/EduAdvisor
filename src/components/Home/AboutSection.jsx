import React from 'react'

const AboutSection = () => {

    return (<section id="about" class="section-area">
      <div class="container">
        <div class="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div class="w-full">
            <figure class="scroll-revealed max-w-[480px] mx-auto">
              <img src="images/about-img.jpg" alt="About image" class="rounded-xl" />
            </figure>
          </div>

          <div class="w-full">
            <div class="scroll-revealed">
              <h6 class="mb-2 block text-lg font-semibold text-primary">
                About Us
              </h6>
              <h2 class="mb-6">
                Our team comes with the experience and knowledge
              </h2>
            </div>

            <div class="tabs scroll-revealed">
              <nav class="tabs-nav flex flex-wrap gap-4 my-8" role="tablist" aria-label="About us tabs">
                <button type="button"
                  class="tabs-link inline-block py-2 px-4 rounded-md text-body-light-12 dark:text-body-dark-12 bg-body-light-12/10 dark:bg-body-dark-12/10 text-inherit font-medium hover:bg-primary hover:text-primary-color focus:bg-primary focus:text-primary-color"
                  data-web-toggle="tabs" data-web-target="tabs-panel-profile" id="tabs-list-profile" role="tab"
                  aria-controls="tabs-panel-profile">
                  Our Profile
                </button>

                <button type="button"
                  class="tabs-link inline-block py-2 px-4 rounded-md text-body-light-12 dark:text-body-dark-12 bg-body-light-12/10 dark:bg-body-dark-12/10 text-inherit font-medium hover:bg-primary hover:text-primary-color focus:bg-primary focus:text-primary-color"
                  data-web-toggle="tabs" data-web-target="tabs-panel-vision" id="tabs-list-vision" role="tab"
                  aria-controls="tabs-panel-vision">
                  Our Vision
                </button>

                <button type="button"
                  class="tabs-link inline-block py-2 px-4 rounded-md text-body-light-12 dark:text-body-dark-12 bg-body-light-12/10 dark:bg-body-dark-12/10 text-inherit font-medium hover:bg-primary hover:text-primary-color focus:bg-primary focus:text-primary-color"
                  data-web-toggle="tabs" data-web-target="tabs-panel-history" id="tabs-list-history" role="tab"
                  aria-controls="tabs-panel-history">
                  Our History
                </button>
              </nav>

              <div class="tabs-content mt-4" id="tabs-panel-profile" tabindex="-1" role="tabpanel"
                aria-labelledby="tabs-list-profile">
                <p>
                  It is a long established fact that a reader will be
                  distracted by the readable content of a page when looking at
                  its layout. The point of using Lorem Ipsum is that it has a
                  more-or-less normal distribution of letters, look like
                  readable English.
                </p>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have in some form, by injected
                  humour.
                </p>
              </div>

              <div class="tabs-content mt-4" id="tabs-panel-vision" tabindex="-1" role="tabpanel"
                aria-labelledby="tabs-list-vision">
                <p>
                  It is a long established fact that a reader will be
                  distracted by the readable content of a page when looking at
                  its layout. The point of using Lorem Ipsum is that it has a
                  more-or-less normal distribution of letters, look like
                  readable English.
                </p>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have in some form, by injected
                  humour.
                </p>
              </div>

              <div class="tabs-content mt-4" id="tabs-panel-history" tabindex="-1" role="tabpanel"
                aria-labelledby="tabs-list-history">
                <p>
                  It is a long established fact that a reader will be
                  distracted by the readable content of a page when looking at
                  its layout. The point of using Lorem Ipsum is that it has a
                  more-or-less normal distribution of letters, look like
                  readable English.
                </p>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have in some form, by injected
                  humour.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
};

export default AboutSection;