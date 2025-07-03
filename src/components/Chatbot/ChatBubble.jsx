// components/ChatBubble.jsx
import React from 'react';
import { MessageCircle } from 'lucide-react'; // hoặc dùng icon khác

const ChatBubble = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 p-4 bg-green-400 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
    >
      <MessageCircle size={24} />
    </button>
  );
};

export default ChatBubble;
