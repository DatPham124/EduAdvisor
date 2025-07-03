// components/ChatBotWidget.jsx
import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import ChatbotContent from './ChatbotContent'

const ChatBotWidget = () => {
  const [userInfo, setUserInfo] = useState(null); // khi đăng ký xong sẽ lưu ở đây
    console.log("userinfo: ", userInfo);
  return (
    <div className="fixed bottom-25 right-6 w-100 max-h-[85vh] bg-white shadow-lg rounded-lg p-4 z-50 overflow-y-auto border">
      {!userInfo ? (
        <RegisterForm onSuccess={(user) => setUserInfo(user)} />
      ) : (
        <ChatbotContent registerAd={userInfo} />
      )}
    </div>
  );
};

export default ChatBotWidget;
