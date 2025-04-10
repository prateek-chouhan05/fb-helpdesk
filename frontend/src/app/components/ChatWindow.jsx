// components/ChatWindow.js
import React from "react";

const ChatWindow = ({ activeConversation, messages, onSendMessage }) => {
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    let initials = "";

    if (parts.length >= 1 && parts[0]) {
      initials += parts[0].charAt(0).toUpperCase();
    }
    if (parts.length >= 2 && parts[1]) {
      initials += parts[1].charAt(0).toUpperCase();
    } else if (parts.length === 1 && parts[0].length > 1) {
      initials += parts[0].charAt(1).toUpperCase();
    }

    return initials.substring(0, 2);
  };

  if (!activeConversation) {
    return (
      <div className="flex-1 p-4">Select a conversation to start chatting.</div>
    );
  }

  return (
    <div className="flex-1 flex flex-col py-4 bg-gray-50">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-black uppercase bg-gray-300">
            {activeConversation.avatar ? (
              <img
                src={activeConversation.avatar}
                alt={activeConversation.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span>{getInitials(activeConversation.name)}</span>
            )}
          </div>
          <h2 className="text-lg font-semibold">{activeConversation.name}</h2>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto py-2 px-4 space-y-2 bg-gray-100">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "agent" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg p-2 text-black ${
                message.sender === "agent"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              {message.text}
              <p className="text-xs text-right mt-1">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 p-2">
        <input
          type="text"
          placeholder={`Message ${activeConversation.name}`}
          className="w-full border rounded-md p-2"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSendMessage(e.target.value);
              e.target.value = "";
            }
          }}
        />
        {/* Optionally add a send button */}
      </div>
    </div>
  );
};

export default ChatWindow;
