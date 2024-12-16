import React, { useState, useEffect } from 'react';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch('http://localhost:3000/chat/history');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:3000/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.reply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-[#6E41E2] rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 flex items-center gap-3 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <div className="relative w-6 h-3">
                <div className="absolute w-2 h-2 rounded-full bg-white left-0" />
                <div className="absolute w-2 h-2 rounded-full bg-white right-0" />
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-lg text-white">CodeAI</h2>
              <p className="text-sm text-white/70">You can ask anything</p>
            </div>
          </div>

          <div className="p-4 h-80 overflow-y-auto flex flex-col gap-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-3 ${message.sender === 'bot' ? '' : 'justify-end'}`}>
                <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 ${message.sender === 'bot' ? '' : 'hidden'}`}>
                  <div className="relative w-4 h-2">
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-white left-0" />
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-white right-0" />
                  </div>
                </div>
                <div className={`bg-white/10 rounded-2xl p-3 text-sm text-white ${message.sender === 'bot' ? '' : 'bg-[#4A3AB2]'}`}>{message.text}</div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/10">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write your message..."
                className="w-full bg-white/10 border-0 text-white placeholder:text-white/50 focus-visible:ring-white/20 rounded-lg p-2"
              />
              <button
                type="submit"
                className="bg-white text-[#6E41E2] hover:bg-white/90 px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 rounded-full bg-[#6E41E2] hover:bg-[#5835B0] transition-colors shadow-lg flex items-center justify-center group"
      >
        <div className="relative w-8 h-4">
          <div className="absolute w-3 h-3 rounded-full bg-white left-0 group-hover:scale-110 transition-transform" />
          <div className="absolute w-3 h-3 rounded-full bg-white right-0 group-hover:scale-110 transition-transform" />
        </div>
      </button>
    </div>
  );
};

export default FloatingChat;
