import React from 'react';

const Footer = () => {
  return (
    <footer class="bg-primary-dark-2 text-white">
      <div class="container py-20 lg:py-[100px]">
        <div class="row">
          <div class="col-12 order-first lg:col-4">
            <div class="w-full">
              <p class="mb-8 text-body-dark-11">
                Tại Trung tâm công nghệ phần mềm -CUSC, chúng tôi cam kết mang đến cho sinh viên
                một nền giáo dục chất lượng, kết hợp giữa lý thuyết và thực hành
              </p>

              <div class="-mx-3 flex items-center">
                <a
                  href="javascript:void(0)"
                  class="px-3 text-body-dark-11 hover:text-primary text-[22px] leading-none"
                >
                  <i class="lni lni-facebook-fill"></i>
                </a>

                <a
                  href="javascript:void(0)"
                  class="px-3 text-body-dark-11 hover:text-primary text-[22px] leading-none"
                >
                  <i class="lni lni-twitter-original"></i>
                </a>

                <a
                  href="javascript:void(0)"
                  class="px-3 text-body-dark-11 hover:text-primary text-[22px] leading-none"
                >
                  <i class="lni lni-instagram-original"></i>
                </a>

                <a
                  href="javascript:void(0)"
                  class="px-3 text-body-dark-11 hover:text-primary text-[22px] leading-none"
                >
                  <i class="lni lni-linkedin-original"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="col-6 lg:col-2">
            <div class="w-full">
              <h4 class="mb-9 text-lg font-semibold text-inherit">Trang</h4>
              <ul>
                <li>
                  <a
                    href="javascript:void(0)"
                    class="mb-3 inline-block text-body-dark-11 hover:text-primary"
                  >
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    class="mb-3 inline-block text-body-dark-11 hover:text-primary"
                  >
                    Chuyên ngành đào tạo
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    class="mb-3 inline-block text-body-dark-11 hover:text-primary"
                  >
                    Tư vấn trực tuyến
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-6 lg:col-2">
            <div class="w-full">
              <h4 class="mb-9 text-lg font-semibold text-inherit">Xác thực</h4>
              <ul>
                <li>
                  <a
                    href="javascript:void(0)"
                    class="mb-3 inline-block text-body-dark-11 hover:text-primary"
                  >
                    Đăng nhập
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    class="mb-3 inline-block text-body-dark-11 hover:text-primary"
                  >
                    Đăng ký
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-12 -order-3 lg:col-4 lg:order-1">
            <div class="w-full">
              <h4 class="mb-9 text-lg font-semibold text-inherit">Liên hệ</h4>

              <p class="text-body-dark-11">Hotline: 0298756474</p>
              <p class="text-body-dark-11">Email: nku@gmail.com</p>
              <p class="text-body-dark-11">
                Địa chỉ: 123, Đường 3/2, Phường Xuân Khánh, Quận Ninh Kiều, Tp.
                Cần Thơ
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full border-t border-solid border-alpha-dark"></div>
      <div class="container py-8">
        <div class="flex flex-wrap">
          <div class="w-full md:w-1/2">
            <div class="my-1 flex justify-center md:justify-end">
              <p class="text-body-dark-11">
                &#169; 2025 bản quyền thuộc về Ninh Kieu University
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
