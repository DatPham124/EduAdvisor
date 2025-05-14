import React from 'react';

const PopularMajors = () => {
  return (
    <section id="portfolio" class="section-area">
      <div class="container">
        <div class="scroll-revealed text-center max-w-[550px] mx-auto mb-12">
          <h2 class="mb-6">Ngành học thịnh hành</h2>
          <p>
            Khám phá các ngành học đa dạng từ lập trình, thiết kế đồ họa đến
            công nghệ thông tin
          </p>
        </div>

        <div class="scroll-revealed portfolio-grid row">
          <div class="portfolio col-12 sm:col-6 lg:col-4">
            <article class="group">
              <div class="relative overflow-hidden w-full aspect-[4/3] rounded-xl">
                <img
                  src="/images/popular_major.jpg"
                  alt="Popular Major"
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-0 left-0 w-full aspect-[4/3] flex items-center justify-center bg-body-light-1/75 scale-[0.15] rounded-xl opacity-0 invisible group-hover:scale-95 group-hover:opacity-100 group-hover:visible">
                  <div class="flex flex-wrap  p-4">
                    <div class="inline-block relative">
                      <a
                        href="./assets/img/portfolio/portfolio-1.jpg"
                        class="portfolio-box text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color"
                      >
                        <i class="lni lni-eye"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pt-4">
                <h4 class="mb-2">
                  <a
                    href="javascript:void(0)"
                    class="text-[1.5rem] leading-tight text-inherit"
                  >
                    Công nghệ thông tin
                  </a>
                </h4>
                <p>
                  Chuyên ngành Công nghệ thông tin (CNTT) đào tạo kỹ sư có kỹ
                  năng và kiến thức để đảm nhận vị trí nghề nghiệp trong lĩnh
                  vực CNTT
                </p>
              </div>
            </article>
          </div>
          <div class="portfolio col-12 sm:col-6 lg:col-4">
            <article class="group">
              <div class="relative overflow-hidden w-full aspect-[4/3] rounded-xl">
                <img
                  src="/images/popular_major.jpg"
                  alt="Popular Major"
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-0 left-0 w-full aspect-[4/3] flex items-center justify-center bg-body-light-1/75 scale-[0.15] rounded-xl opacity-0 invisible group-hover:scale-95 group-hover:opacity-100 group-hover:visible">
                  <div class="flex flex-wrap  p-4">
                    <div class="inline-block relative">
                      <a
                        href="./assets/img/portfolio/portfolio-1.jpg"
                        class="portfolio-box text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color"
                      >
                        <i class="lni lni-eye"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pt-4">
                <h4 class="mb-2">
                  <a
                    href="javascript:void(0)"
                    class="text-[1.5rem] leading-tight text-inherit"
                  >
                    Công nghệ thông tin
                  </a>
                </h4>
                <p>
                  Chuyên ngành Công nghệ thông tin (CNTT) đào tạo kỹ sư có kỹ
                  năng và kiến thức để đảm nhận vị trí nghề nghiệp trong lĩnh
                  vực CNTT
                </p>
              </div>
            </article>
          </div>
          <div class="portfolio col-12 sm:col-6 lg:col-4">
            <article class="group">
              <div class="relative overflow-hidden w-full aspect-[4/3] rounded-xl">
                <img
                  src="/images/popular_major.jpg"
                  alt="Popular Major"
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-0 left-0 w-full aspect-[4/3] flex items-center justify-center bg-body-light-1/75 scale-[0.15] rounded-xl opacity-0 invisible group-hover:scale-95 group-hover:opacity-100 group-hover:visible">
                  <div class="flex flex-wrap  p-4">
                    <div class="inline-block relative">
                      <a
                        href="./assets/img/portfolio/portfolio-1.jpg"
                        class="portfolio-box text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color"
                      >
                        <i class="lni lni-eye"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pt-4">
                <h4 class="mb-2">
                  <a
                    href="javascript:void(0)"
                    class="text-[1.5rem] leading-tight text-inherit"
                  >
                    Công nghệ thông tin
                  </a>
                </h4>
                <p>
                  Chuyên ngành Công nghệ thông tin (CNTT) đào tạo kỹ sư có kỹ
                  năng và kiến thức để đảm nhận vị trí nghề nghiệp trong lĩnh
                  vực CNTT
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularMajors;
