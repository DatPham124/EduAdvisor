import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ChatbotService from '../services/chatbot.service';
import { franc } from 'franc'

const langMap = {
  eng: 'en-US',
}
const Chatbot = () => {
  const location = useLocation();
  const registerAd = location.state?.registerAd;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [detectedLang, setDetectedLang] = useState('vi-VN');
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await ChatbotService.getMessages(registerAd._id);
        setMessages(res.data.messages || []);
      } catch (error) {
        console.error('Lỗi lấy lịch sử tin nhắn:', error);
      }
    };
    fetchHistory();
  }, [registerAd]);

  const scrollToBottom = () => {
    const container = messagesEndRef.current; // truy cập DOM element được ref
    if (container) {
      container.scrollTop = container.scrollHeight; // cuộn xuống đáy khung.
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // chạy khi có tin nhắn mới

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsSending(true);
    const payload = {
      user_id: registerAd._id,
      question: input,
    };

    try {
      const res = await ChatbotService.sendMessage(payload);
      setMessages(res.messages || []); //res là toàn bộ message cũ
      setInput('');
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
    } finally {
      setIsSending(false);
    }
  };

  const speakText = (text) => {
    if (window.responsiveVoice) {
      window.responsiveVoice.speak(text, 'Vietnamese Female');
    } else {
      alert('ResponsiveVoice chưa được tải!');
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition; // ktra recognize của trình duyệt, trình duyệt cũ dùng webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Trình duyệt không hỗ trợ Speech Recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = detectedLang;
    recognition.interimResults = true; // Cho phép kết quả tạm thời

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      // Duyệt qua các kết quả từ vị trí mới nhất (event.resultIndex)
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript; //event.result là mảng phương án khác nhau mà hệ thống nghĩ người dùng có thể đã nói, được sắp xếp theo độ tin cậy.
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }

      setInput(final + interim); // Gộp kết quả để hiển thị
      setInterimTranscript(interim);

      // đoán ngôn ngữ khi input đỉ dài
      if (input.length > 20) {
        const langCode = franc(input);
        if (langMap[langCode] && langMap[langCode] !== detectedLang) {
          setDetectedLang(langMap[langCode]); // sẽ trigger useEffect chạy lại
        }
      }
    };

    // recognition.onresult = (event) => {
    //   let transcript = '';
    //   for (let i = event.resultIndex; i < event.results.length; i++) {
    //     transcript += event.results[i][0].transcript; //event.result là mảng phương án khác nhau mà hệ thống nghĩ người dùng có thể đã nói, được sắp xếp theo độ tin cậy.
    //   }
    //   setInput(transcript);
    // };

    recognition.onerror = (event) => {
      console.error('Lỗi nhận dạng giọng nói:', event.error);
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, [detectedLang]); // khi setDetectedLang sẽ chạy lại useEffect()

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start(); // sử dụng đối tượng recognition đã tạo sẵn.
      } catch (error) {
        console.error('Không thể khởi động recognition:', error);
      }
    }
  };

  return (
    <main className="main relative">
      <div
        id="home"
        className="relative overflow-hidden bg-primary text-primary-color pt-[120px] md:pt-[130px] lg:pt-[160px]"
      >
        <div className="container relative z-10">
          <div className="flex flex-col min-h-[75vh] justify-end bg-neutral-200 rounded-box mx-auto p-6 shadow-md mb-10 !z-10">
            <div
              ref={messagesEndRef}
              className="flex flex-col space-y-2 overflow-y-auto max-h-[60vh] mb-4 pr-2"
            >
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-xl shadow max-w-[80%] break-words whitespace-pre-wrap bg-white text-black rounded-br-none">
                  <p>
                    Xin chào {registerAd?.name}, tôi có thể giúp gì cho bạn?
                  </p>
                </div>
              </div>

              {messages.map((msg, idx) => (
                <div key={idx}>
                  <div className="flex justify-end">
                    <div className="px-4 py-2 my-2 rounded-xl shadow max-w-[80%] break-words whitespace-pre-wrap bg-primary text-white rounded-br-none">
                      <p>{msg.question}</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="px-4 py-2 my-2 rounded-xl shadow max-w-[80%] break-words whitespace-pre-wrap bg-white text-black rounded-br-none">
                      <p>{msg.anwser}</p>
                    </div>
                    <div className="ms-4"></div>
                    <button
                      onClick={() => speakText(msg.anwser)}
                      className="hover:text-primary"
                      aria-label="Phát âm"
                    >
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        transform="rotate(0 0 0)"
                      >
                        <path
                          d="M10.0052 5.28367C11.4562 3.99387 13.75 5.02392 13.75 6.96534V18.2848C13.75 20.2262 11.4562 21.2563 10.0052 19.9665L6.80862 17.1251H4.75C3.50736 17.1251 2.5 16.1177 2.5 14.8751V10.3751C2.5 9.13245 3.50736 8.12509 4.75 8.12509H6.80858L10.0052 5.28367Z"
                          fill="#343C54"
                        />
                        <path
                          d="M17.0769 15.7894C18.6384 14.0503 18.6384 11.2006 17.0769 9.46153C16.8001 9.15333 16.8256 8.67914 17.1338 8.4024C17.442 8.12566 17.9162 8.15117 18.193 8.45937C20.2664 10.7685 20.2664 14.4824 18.193 16.7915C17.9162 17.0997 17.442 17.1252 17.1338 16.8485C16.8256 16.5718 16.8001 16.0976 17.0769 15.7894Z"
                          fill="#343C54"
                        />
                        <path
                          d="M14.9853 11.2784C15.6729 12.0429 15.6729 13.2081 14.9853 13.9726C14.7084 14.2806 14.7335 14.7548 15.0415 15.0318C15.3495 15.3088 15.8237 15.2836 16.1007 14.9756C17.3011 13.6407 17.3011 11.6102 16.1007 10.2754C15.8237 9.96736 15.3495 9.94221 15.0415 10.2192C14.7335 10.4962 14.7084 10.9704 14.9853 11.2784Z"
                          fill="#343C54"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="mt-8 flex">
              <input
                type="text"
                name="message"
                value={input || interimTranscript}
                onChange={(e) => setInput(e.target.value)}
                className="inline-block flex-grow px-5 py-3 rounded-md rounded-e-none border border-solid border-alpha-light dark:border-alpha-dark text-black text-base focus:border-primary"
                placeholder="Nhập thắc mắc của bạn tại đây..."
                required
              />
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className={`inline-block px-4 rounded-md rounded-s-none text-center text-lg/none 
                  ${isSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-light-10 dark:hover:bg-primary-dark-10'} 
                  text-primary-color focus:outline-none transition`}
              >
                {isSending ? (
                  <span className="animate-pulse text-black">Đang gửi...</span>
                ) : isRecording ? (
                  <span className="animate-pulse text-black">
                    Đang ghi âm...
                  </span>
                ) : (
                  <i className="lni lni-arrow-right"></i>
                )}
              </button>

              <div className="ml-4 flex justify-end">
                <button
                  className=" px-4 text-black text-lg/none text-center "
                  onClick={toggleListening}
                >
                  {!isRecording ? (
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(0 0 0)"
                    >
                      <path
                        d="M12 2.28125C9.37669 2.28125 7.25006 4.40788 7.25006 7.03122V11.5313C7.25006 14.1546 9.37669 16.2812 12 16.2812C14.6234 16.2812 16.75 14.1546 16.75 11.5313V7.03122C16.75 4.40788 14.6234 2.28125 12 2.28125Z"
                        fill="#3657c3"
                      />
                      <path
                        d="M5.75 11.5312C5.75 11.117 5.41421 10.7812 5 10.7812C4.58579 10.7812 4.25 11.117 4.25 11.5312C4.25 15.5584 7.3217 18.8682 11.25 19.2454V20.7812H10C9.58579 20.7812 9.25 21.117 9.25 21.5312C9.25 21.9455 9.58579 22.2812 10 22.2812H14C14.4142 22.2812 14.75 21.9455 14.75 21.5312C14.75 21.117 14.4142 20.7812 14 20.7812H12.75V19.2454C16.6783 18.8682 19.75 15.5584 19.75 11.5312C19.75 11.117 19.4142 10.7812 19 10.7812C18.5858 10.7812 18.25 11.117 18.25 11.5312C18.25 14.983 15.4518 17.7812 12 17.7812C8.54822 17.7812 5.75 14.983 5.75 11.5312Z"
                        fill="#3657c3"
                      />
                    </svg>
                  ) : (
                    <div className="p-4 bg-primary text-white rounded-2xl ">
                      Dừng
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Decorative Dots */}
        <div className="absolute bottom-5 left-96 z-0">
          <img src="/images/dots.svg" alt="Dot" className=" w-25 opacity-75" />
        </div>
        <div className="absolute top-50 right-96 z-0">
          <img src="/images/dots.svg" alt="Dot" className="w-25 opacity-75" />
        </div>
      </div>
    </main>
  );
};

export default Chatbot;
