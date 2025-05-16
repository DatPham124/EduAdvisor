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
                class="inline-block flex-grow px-5 py-3 rounded-md rounded-e-none border border-solid border-alpha-light dark:border-alpha-dark text-inherit text-base focus:border-primary"
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
                 <i class="lni lni-microphone"></i>
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
