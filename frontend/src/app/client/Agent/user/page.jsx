"use client";
import React, { useState } from "react";

import ChatWindow from "@/app/components/ChatWindow";
import ConversationList from "@/app/components/ConversationList";
import Sidebar from "@/app/components/Sidebar";
import UserProfile from "@/app/components/UserProfile";

// Hardcoded JSON data
const conversationsData = [
  {
    id: 1,
    name: "Amit RG",
    lastMessage: "Is it in stock right now?",
    lastActive: "10m",
    unreadCount: 0,
  },
  {
    id: 2,
    name: "Hiten Saxena",
    lastMessage: "Facebook Post",
    lastActive: "10m",
    unreadCount: 1,
  },
];

const messagesData = {
  1: [
    {
      id: 1,
      sender: "user",
      text: "Is it in stock right now?",
      timestamp: "2:22 AM",
    },
    {
      id: 2,
      sender: "agent",
      text: "We've 3 left in stock!",
      timestamp: "2:22 AM",
    },
    {
      id: 3,
      sender: "agent",
      text: "If you order before 8PM we can ship it today.",
      timestamp: "2:22 AM",
    },
  ],
  2: [
    {
      id: 1,
      sender: "user",
      text: "Is it in stock right now?",
      timestamp: "2:22 AM",
    },
    {
      id: 2,
      sender: "agent",
      text: "We've 100 left in stock!",
      timestamp: "2:23 AM",
    },
    {
      id: 3,
      sender: "user",
      text: "Can I order it now?",
      timestamp: "2:23 AM",
    },
  ],
};

const userData = {
  1: {
    id: 1,
    name: "Amit RG",
    status: "Offline",
    email: "amit@richpanel.com",
    firstName: "Amit",
    lastName: "RG",
  },
  2: {
    id: 2,
    name: "Hiten Saxena",
    status: "Online",
    email: "hiten@richpanel.com",
    firstName: "Hiten",
    lastName: "Saxena",
  },
};

export default function Page() {
  const [activeConversationId, setActiveConversationId] = useState(1); // Set initial active conversation
  const activeConversation = conversationsData.find(
    (convo) => convo.id === activeConversationId
  );

  const [messages, setMessages] = useState(
    messagesData[activeConversationId] || []
  );
  const userDetails = userData[activeConversationId];

  const handleConvoClick = (id) => {
    setActiveConversationId(id);
    setMessages(messagesData[id]);
  };

  const handleSendMessage = (newMessage) => {
    const newMessages = [
      ...messages,
      {
        id: messages.length + 1,
        sender: "agent",
        text: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      },
    ];

    messagesData[activeConversationId] = newMessages;

    setMessages(newMessages);

    // If you need to update the original messagesData (which is generally not recommended for direct mutation)
    // You should do it immutably as well, but consider if you really need to do this.
    // messagesData[activeConversationId] = newMessages;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <ConversationList
        conversations={conversationsData}
        onConvoClick={handleConvoClick}
        activeConvoId={activeConversationId}
      />
      <ChatWindow
        activeConversation={activeConversation}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
      <UserProfile userDetails={userDetails} />
    </div>
  );
}
