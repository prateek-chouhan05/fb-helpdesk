"use client";

import React from "react";

const ConversationList = ({ conversations, onConvoClick, activeConvoId }) => {
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

  return (
    <div className="bg-white w-80 border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Conversations</h2>
      </div>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            className={`p-3 hover:bg-gray-100 cursor-pointer ${
              activeConvoId === conversation.id ? "bg-blue-50" : ""
            }`}
            onClick={() => onConvoClick(conversation.id)}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white uppercase bg-gray-300">
                {conversation.avatar ? (
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span>{getInitials(conversation.name)}</span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{conversation.name}</p>
                <p className="text-xs text-gray-500">
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unreadCount > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                  {conversation.unreadCount}
                </span>
              )}
              <span className="text-xs text-gray-400 ml-auto">
                {conversation.lastActive}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
