import React from 'react';

const HeroSection = () => {
  return (
    <section
      id="home"
      class="relative overflow-hidden bg-primary text-primary-color pt-[120px] md:pt-[130px] lg:pt-[160px]">
         <div class="container">
        <div class="-mx-5 flex flex-wrap items-center">
          <div class="w-full px-5">
            <div class="scroll-revealed mx-auto max-w-[780px] text-center">
              <h1
                class="mb-6 text-3xl font-bold leading-snug text-primary-color sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-tight">
                ĐẠI HỌC NINH KIỀU
              </h1>

              <p class="mx-auto mb-9 max-w-[600px] text-base text-primary-color sm:text-lg sm:leading-normal">
                Tại Đại học Ninh Kiều, chúng tôi cam kết mang đến cho sinh viên một nền giáo dục chất lượng, kết hợp giữa lý thuyết và thực hành. Khám phá các ngành học đa dạng từ lập trình, thiết kế đồ họa đến công nghệ thông tin.
              </p>
            </div>
          </div>
          <div class="w-full px-5">
            <div class="scroll-revealed relative z-10 mx-auto max-w-[845px]">
              <figure class="mt-16">
                <img src="/images/hero.jpg" alt="Hero image"
                  class="mx-auto max-w-full rounded-t-xl rounded-tr-xl" />
              </figure>

              <div class="absolute -left-9 bottom-0 z-[-1]">
                <img src="/images/dots.svg" class="w-[120px] opacity-75" />
              </div>

              <div class="absolute -right-6 -top-6 z-[-1]">
                <img src="/images/dots.svg" class="w-[120px] opacity-75" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default HeroSection;
