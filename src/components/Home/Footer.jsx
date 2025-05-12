import React from 'react'

const Footer = () => {
 return (
 <footer class="bg-primary-dark-2 text-white">
    <div class="container py-20 lg:py-[100px]">
      <div class="row">
        <div class="col-12 order-first lg:col-4">
          <div class="w-full">
            

            <p class="mb-8 text-body-dark-11">
              We create digital experiences for brands and companies by using
              technology.
            </p>

            <div class="-mx-3 flex items-center">
              <a href="javascript:void(0)" class="px-3 text-body-dark-11 hover:text-primary text-[22px] leading-none">
                <i class="lni lni-facebook-fill"></i>
              </a>

              <a href="javascript:void(0)" class="px-3 text-body-dark-11 hover:text-primary text-[22px] leading-none">
                <i class="lni lni-twitter-original"></i>
              </a>

              <a href="javascript:void(0)" class="px-3 text-body-dark-11 hover:text-primary text-[22px] leading-none">
                <i class="lni lni-instagram-original"></i>
              </a>

              <a href="javascript:void(0)" class="px-3 text-body-dark-11 hover:text-primary text-[22px] leading-none">
                <i class="lni lni-linkedin-original"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="col-6 lg:col-2">
          <div class="w-full">
            <h4 class="mb-9 text-lg font-semibold text-inherit">Solutions</h4>
            <ul>
              <li>
                <a href="javascript:void(0)"
                  class="mb-3 inline-block text-body-dark-11 hover:text-primary">Marketing</a>
              </li>
              <li>
                <a href="javascript:void(0)"
                  class="mb-3 inline-block text-body-dark-11 hover:text-primary">Analytics</a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-body-dark-11 hover:text-primary">Commerce</a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-body-dark-11 hover:text-primary">Insights</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-6 lg:col-2">
          <div class="w-full">
            <h4 class="mb-9 text-lg font-semibold text-inherit">Support</h4>
            <ul>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-body-dark-11 hover:text-primary">Pricing</a>
              </li>
              <li>
                <a href="javascript:void(0)"
                  class="mb-3 inline-block text-body-dark-11 hover:text-primary">Documentation</a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-body-dark-11 hover:text-primary">Guides</a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-body-dark-11 hover:text-primary">API
                  Status</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 -order-3 lg:col-4 lg:order-1">
          <div class="w-full">
            <h4 class="mb-9 text-lg font-semibold text-inherit">Subscribe</h4>

            <p class="text-body-dark-11">
              Subscribe to our newsletter for the latest updates
            </p>

            <form action="#" method="POST" target="_blank" class="mt-8 flex">
              <input type="email" name="email"
                class="inline-block flex-grow px-5 py-3 rounded-md rounded-e-none border border-solid border-alpha-dark text-inherit text-base focus:border-primary"
                placeholder="Email address" required />

              <button type="submit"
                class="inline-block py-3 w-[50px] rounded-md rounded-s-none text-center text-lg/none bg-primary text-primary-color hover:bg-primary-light-10 dark:hover:bg-primary-dark-10 focus:bg-primary-light-10 dark:focus:bg-primary-dark-10">
                <i class="lni lni-envelope"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full border-t border-solid border-alpha-dark"></div>
    <div class="container py-8">
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2">
          <div class="my-1">
            <div class="flex flex-wrap justify-center gap-x-3 md:justify-start">
              <a href="javascript:void(0)" class="text-body-dark-11 hover:text-body-dark-12">Privacy Policy</a>
              <a href="javascript:void(0)" class="text-body-dark-11 hover:text-body-dark-12">Legal Notice</a>
              <a href="javascript:void(0)" class="text-body-dark-11 hover:text-body-dark-12">Terms of Service</a>
            </div>
          </div>
        </div>

        <div class="w-full md:w-1/2">
          <div class="my-1 flex justify-center md:justify-end">
            <p class="text-body-dark-11">
              &#169; 2024 Inazuma Inc. All rights reserved. Distributed by
              <a href="https://themewagon.com" target="_blank">ThemeWagon</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );

};

export default Footer;