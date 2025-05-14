import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" class="section-area">
      <div class="container">
        <div class="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div class="w-full">
            <figure class="scroll-revealed max-w-[480px] mx-auto">
              <img
                src="/images/about-img.jpg"
                alt="About image"
                class="rounded-xl"
              />
            </figure>
          </div>

          <div class="w-full">
            <div class="scroll-revealed">
              <h6 class="mb-2 block text-lg font-semibold text-primary">
                Đôi chút về
              </h6>
              <h2 class="mb-6">Đại học Ninh Kiều</h2>
            </div>

            <div class="tabs scroll-revealed">
              <nav
                class="tabs-nav flex flex-wrap gap-4 my-8"
                role="tablist"
                aria-label="About us tabs"
              >
                <button
                  type="button"
                  class="tabs-link inline-block py-2 px-4 rounded-md text-body-light-12 dark:text-body-dark-12 bg-body-light-12/10 dark:bg-body-dark-12/10 text-inherit font-medium hover:bg-primary hover:text-primary-color focus:bg-primary focus:text-primary-color"
                  data-web-toggle="tabs"
                  data-web-target="tabs-panel-profile"
                  id="tabs-list-profile"
                  role="tab"
                  aria-controls="tabs-panel-profile"
                >
                  Giới thiệu
                </button>

                <button
                  type="button"
                  class="tabs-link inline-block py-2 px-4 rounded-md text-body-light-12 dark:text-body-dark-12 bg-body-light-12/10 dark:bg-body-dark-12/10 text-inherit font-medium hover:bg-primary hover:text-primary-color focus:bg-primary focus:text-primary-color"
                  data-web-toggle="tabs"
                  data-web-target="tabs-panel-vision"
                  id="tabs-list-vision"
                  role="tab"
                  aria-controls="tabs-panel-vision"
                >
                  Tầm nhìn
                </button>

                <button
                  type="button"
                  class="tabs-link inline-block py-2 px-4 rounded-md text-body-light-12 dark:text-body-dark-12 bg-body-light-12/10 dark:bg-body-dark-12/10 text-inherit font-medium hover:bg-primary hover:text-primary-color focus:bg-primary focus:text-primary-color"
                  data-web-toggle="tabs"
                  data-web-target="tabs-panel-history"
                  id="tabs-list-history"
                  role="tab"
                  aria-controls="tabs-panel-history"
                >
                  Lịch sử
                </button>
              </nav>

              <div
                class="tabs-content mt-4"
                id="tabs-panel-profile"
                tabIndex="-1"
                role="tabpanel"
                aria-labelledby="tabs-list-profile"
              >
                <p>
                  Trường Đại học Ninh Kiều, tọa lạc tại trái tim vùng đất Tây
                  Đô, là một cơ sở giáo dục đại học trẻ trung và đầy khát vọng,
                  được thành lập với sứ mệnh tiên phong trong đào tạo nguồn nhân
                  lực chất lượng cao trong lĩnh vực công nghệ và thiết kế. Với
                  bề dày 10 năm xây dựng và phát triển, trường đã khẳng định vị
                  thế là một trung tâm đào tạo uy tín, nơi ươm mầm những tài
                  năng sáng tạo, đáp ứng nhu cầu ngày càng cao của thị trường
                  lao động trong bối cảnh hội nhập quốc tế sâu rộng. Chúng tôi
                  tự hào mang đến một môi trường học tập hiện đại, năng động,
                  kết hợp hài hòa giữa lý thuyết vững chắc và thực hành chuyên
                  sâu, trang bị cho sinh viên những kiến thức, kỹ năng và thái
                  độ cần thiết để thành công trong sự nghiệp.
                </p>
              </div>

              <div
                class="tabs-content mt-4"
                id="tabs-panel-vision"
                tabIndex="-1"
                role="tabpanel"
                aria-labelledby="tabs-list-vision"
              >
                <p>
                  Trong thập kỷ tới, Trường Đại học Ninh Kiều hướng đến mục tiêu
                  trở thành một trong những trường đại học hàng đầu khu vực Đồng
                  bằng sông Cửu Long và vươn tầm quốc gia trong lĩnh vực công
                  nghệ và thiết kế. Chúng tôi cam kết xây dựng một môi trường
                  giáo dục sáng tạo, nơi giảng viên và sinh viên cùng nhau kiến
                  tạo tri thức, thúc đẩy nghiên cứu ứng dụng và chuyển giao công
                  nghệ. Trường Đại học Ninh Kiều mong muốn đóng góp tích cực vào
                  sự phát triển kinh tế - xã hội của địa phương và cả nước,
                  thông qua việc cung cấp nguồn nhân lực chất lượng cao, có khả
                  năng thích ứng linh hoạt với những thay đổi của thời đại công
                  nghiệp 4.0.
                </p>
              </div>

              <div
                class="tabs-content mt-4"
                id="tabs-panel-history"
                tabIndex="-1"
                role="tabpanel"
                aria-labelledby="tabs-list-history"
              >
                <p>
                  Trường Đại học Ninh Kiều chính thức được thành lập vào năm
                  [Năm thành lập, ví dụ: 2015], đánh dấu một bước tiến quan
                  trọng trong sự phát triển giáo dục bậc cao của tỉnh [Tên
                  tỉnh/thành phố, ví dụ: Cần Thơ]. Từ những ngày đầu thành lập,
                  trường đã xác định rõ mục tiêu tập trung vào đào tạo các ngành
                  công nghệ và thiết kế - những lĩnh vực có vai trò then chốt
                  trong sự phát triển của nền kinh tế hiện đại.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
