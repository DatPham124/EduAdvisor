import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header
      className="ic-navbar absolute left-0 top-0 z-40 flex w-full items-center bg-transparent sticky"
      role="banner"
      aria-label="Navigation bar"
    >
      <div class="container">
        <div class="ic-navbar-container relative -mx-5 flex items-center justify-between">
          <div class="w-60 lg:w-56 max-w-full px-5">
            <a
              href="."
              class="ic-navbar-logo block w-full py-3 text-primary-color"
            >
              <img
                src="/images/logo_name.png"
                alt="Logo"
                class="rounded-full"
              />
            </a>
          </div>
          <div class="flex w-full items-center justify-between px-5">
            <div>
              <button
                type="button"
                class="ic-navbar-toggler absolute right-4 top-1/2 block -translate-y-1/2 rounded-md px-3 py-[6px] text-[22px]/none text-primary-color ring-primary focus:ring-2 lg:hidden"
                data-web-toggle="navbar-collapse"
                data-web-target="navbarMenu"
                aria-expanded="false"
                aria-label="Toggle navigation menu"
              >
                <i class="lni lni-menu"></i>
              </button>

              <nav
                id="navbarMenu"
                class="ic-navbar-collapse absolute right-4 top-[80px] w-full max-w-[250px] rounded-lg hidden bg-primary-light-1 py-5 shadow-lg dark:bg-primary-dark-1 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:py-0 lg:shadow-none dark:lg:bg-transparent xl:px-6"
              >
                <ul
                  class="block lg:flex"
                  role="menu"
                  aria-label="Navigation menu"
                >
                  <li class="group relative">
                    <Link
                      to="/home"
                      class={`ic-page-scroll mx-8 flex py-2 text-base font-medium text-body-light-12 group-hover:text-primary dark:text-body-dark-12 lg:mx-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-primary-color lg:dark:text-primary-color lg:group-hover:text-primary-color lg:group-hover:opacity-70 
                      ${location.pathname === '/home' ? 'active' : ''}`}
                      onClick={() => window.scrollTo(0, 0)}
                      role="menuitem"
                    >
                      Trang chủ
                    </Link>
                  </li>

                  <li class="group relative">
                    <Link
                      to="/major"
                      class={`ic-page-scroll mx-8 flex py-2 text-base font-medium text-body-light-12 group-hover:text-primary dark:text-body-dark-12 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-primary-color lg:dark:text-primary-color lg:group-hover:text-primary-color lg:group-hover:opacity-70
                      ${location.pathname === '/major' ? 'active' : ''}`}
                      onClick={() => window.scrollTo(0, 0)}
                      role="menuitem"
                    >
                      Chuyên ngành đào tạo
                    </Link>
                  </li>

                  <li class="group relative">
                    <Link
                     to="/signup"
                      class={`ic-page-scroll mx-8 flex py-2 text-base font-medium text-body-light-12 group-hover:text-primary dark:text-body-dark-12 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-primary-color lg:dark:text-primary-color lg:group-hover:text-primary-color lg:group-hover:opacity-70
                      ${location.pathname === '/chatbot' ? 'active' : ''}`}
                      onClick={() => window.scrollTo(0, 0)}
                      role="menuitem"
                    >
                      Tư vấn trực tuyến
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
