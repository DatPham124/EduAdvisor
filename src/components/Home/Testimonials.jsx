import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-area">
      <div className="container">
        <div className="scroll-revealed text-center max-w-[550px] mx-auto mb-12">
          <h6 className="mb-2 block text-lg font-semibold text-primary">Đôi lời đến từ</h6>
          <h2 className="mb-6">Cựu sinh viên Đại học Ninh Kiều</h2>
          <p>
            Hãy lắng nghe những chia sẻ chân thực từ những người đã từng là một phần của Đại học Ninh Kiều - nơi kiến tạo nên những thành công ngày hôm nay.
          </p>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
          }}
          className="testimonial-carousel common-carousel scroll-revealed"
        >
         
            <SwiperSlide>
              <div className="rounded-xl bg-body-light-1 dark:bg-body-dark-12/10 px-5 py-8 shadow-card-2 sm:px-8">
                <p className="mb-6 text-base text-body-light-11 dark:text-body-dark-11">
                  "Tôi đánh giá cao sự đầu tư vào các phòng lab hiện đại, giúp sinh viên có cơ hội thực hành chuyên sâu."
                </p>
                <figure className="flex items-center gap-4">
                  <div className="h-[50px] w-[50px] overflow-hidden">
                    <img src="/images/student1.jpg" alt="Testimonial" className="h-full w-full rounded-full object-cover" />
                  </div>
                  <figcaption className="flex-grow">
                    <h3 className="text-sm font-semibold">Trần Kim Huỳnh</h3>
                    <p className="text-xs">Sinh viên khóa 2 - Ngành CNTT</p>
                  </figcaption>
                </figure>
              </div>
            </SwiperSlide>

              <SwiperSlide>
              <div className="rounded-xl bg-body-light-1 dark:bg-body-dark-12/10 px-5 py-8 shadow-card-2 sm:px-8">
                <p className="mb-6 text-base text-body-light-11 dark:text-body-dark-11">
                  "Sự hướng dẫn nhiệt tình của thầy cô là một trong những yếu tố quan trọng giúp tôi phát triển."
                </p>
                <figure className="flex items-center gap-4">
                  <div className="h-[50px] w-[50px] overflow-hidden">
                    <img src="/images/student2.jpg" alt="Testimonial" className="h-full w-full rounded-full object-cover" />
                  </div>
                  <figcaption className="flex-grow">
                    <h3 className="text-sm font-semibold">Nguyễn Sang Hền</h3>
                    <p className="text-xs">Sinh viên khóa 2 - Ngành CNTT</p>
                  </figcaption>
                </figure>
              </div>
            </SwiperSlide>
              <SwiperSlide>
              <div className="rounded-xl bg-body-light-1 dark:bg-body-dark-12/10 px-5 py-8 shadow-card-2 sm:px-8">
                <p className="mb-6 text-base text-body-light-11 dark:text-body-dark-11">
                  "Tôi còn có nhiều kỷ niệm đẹp về cộng đồng sinh viên thân thiện và các hoạt động ngoại khóa sôi nổi tại trường. "
                </p>
                <figure className="flex items-center gap-4">
                  <div className="h-[50px] w-[50px] overflow-hidden">
                    <img src="/images/student3.jpg" alt="Testimonial" className="h-full w-full rounded-full object-cover" />
                  </div>
                  <figcaption className="flex-grow">
                    <h3 className="text-sm font-semibold">Lê Anh Vy</h3>
                    <p className="text-xs">Sinh viên khóa 5 - Ngành Truyền thông đa phương tiện</p>
                  </figcaption>
                </figure>
              </div>
            </SwiperSlide>
              <SwiperSlide>
              <div className="rounded-xl bg-body-light-1 dark:bg-body-dark-12/10 px-5 py-8 shadow-card-2 sm:px-8">
                <p className="mb-6 text-base text-body-light-11 dark:text-body-dark-11">
                  "Chương trình đào tạo cập nhật, theo kịp xu hướng thị trường lao động, giúp sinh viên có lợi thế cạnh tranh sau khi ra trường."
                </p>
                <figure className="flex items-center gap-4">
                  <div className="h-[50px] w-[50px] overflow-hidden">
                    <img src="/images/student4.jpg" alt="Testimonial" className="h-full w-full rounded-full object-cover" />
                  </div>
                  <figcaption className="flex-grow">
                    <h3 className="text-sm font-semibold">Lý Hữu Phước</h3>
                    <p className="text-xs">Sinh viên khóa 7 - Ngành Kỹ thuật phần mềm</p>
                  </figcaption>
                </figure>
              </div>
            </SwiperSlide>
              <SwiperSlide>
              <div className="rounded-xl bg-body-light-1 dark:bg-body-dark-12/10 px-5 py-8 shadow-card-2 sm:px-8">
                <p className="mb-6 text-base text-body-light-11 dark:text-body-dark-11">
                  "Chương trình đào tạo bám sát thực tế và những kỹ năng mềm mà trường trang bị cho sinh viên."
                </p>
                <figure className="flex items-center gap-4">
                  <div className="h-[50px] w-[50px] overflow-hidden">
                    <img src="/images/student5.jpg" alt="Testimonial" className="h-full w-full rounded-full object-cover" />
                  </div>
                  <figcaption className="flex-grow">
                    <h3 className="text-sm font-semibold">Mã Quang Hồ</h3>
                    <p className="text-xs">Sinh viên khóa 6 - Ngành Quản trị du lịch</p>
                  </figcaption>
                </figure>
              </div>
            </SwiperSlide>
        
        </Swiper>

        <div className="">
          <div className="swiper-button-prev">
          </div>
          <div className="swiper-button-next">
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Testimonials;
