const Chatbot = () => {
  return (
    <main class="main relative">
      <div
        id="home"
        className="relative overflow-hidden bg-primary text-primary-color pt-[120px] md:pt-[130px] lg:pt-[160px]"
      >
        <div className="container relative z-10">
          <div className="flex flex-col min-h-[75vh] justify-end bg-neutral-100 rounded-box mx-auto p-6 shadow-md mb-10 !z-10">
            <form action="#" method="POST" target="_blank" class="mt-8 flex">
              <input
                type="text"
                name="message"
                class="inline-block flex-grow px-5 py-3 rounded-md rounded-e-none border border-solid border-alpha-light dark:border-alpha-dark text-black text-base focus:border-primary"
                placeholder="Nhập thắc mắc của ban tại đây..."
                required
              />
              <button
                type="submit"
                class="inline-block px-4 rounded-md rounded-s-none text-center text-lg/none bg-primary text-primary-color hover:bg-primary-light-10 dark:hover:bg-primary-dark-10 focus:bg-primary-light-10 dark:focus:bg-primary-dark-10"
              >
                <i class="lni lni-arrow-right"></i>
              </button>
              <div className="ml-4 flex justify-end">
                <button 
                className=" px-4 text-black text-lg/none text-center ">
                  <svg width="35" height="35" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0 0 0)">
                  <path d="M12 2.28125C9.37669 2.28125 7.25006 4.40788 7.25006 7.03122V11.5313C7.25006 14.1546 9.37669 16.2812 12 16.2812C14.6234 16.2812 16.75 14.1546 16.75 11.5313V7.03122C16.75 4.40788 14.6234 2.28125 12 2.28125Z" fill="#3657c3"/>
                  <path d="M5.75 11.5312C5.75 11.117 5.41421 10.7812 5 10.7812C4.58579 10.7812 4.25 11.117 4.25 11.5312C4.25 15.5584 7.3217 18.8682 11.25 19.2454V20.7812H10C9.58579 20.7812 9.25 21.117 9.25 21.5312C9.25 21.9455 9.58579 22.2812 10 22.2812H14C14.4142 22.2812 14.75 21.9455 14.75 21.5312C14.75 21.117 14.4142 20.7812 14 20.7812H12.75V19.2454C16.6783 18.8682 19.75 15.5584 19.75 11.5312C19.75 11.117 19.4142 10.7812 19 10.7812C18.5858 10.7812 18.25 11.117 18.25 11.5312C18.25 14.983 15.4518 17.7812 12 17.7812C8.54822 17.7812 5.75 14.983 5.75 11.5312Z" fill="#3657c3"/>
                  </svg>
              </button>
              </div>
              
            </form>
             
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chatbot;
