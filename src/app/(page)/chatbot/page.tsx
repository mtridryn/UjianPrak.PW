"use client";

import Navbar from "@/components/fragments/Navbar/Navbar";
import ChatbotContainer from "@/components/fragments/Container/ChatbotContainer";
import ChatBotInput from "@/components/core/Input/ChatbotInput";
import Message from "@/components/core/Label/Message";

import { chatBot } from "@/app/(page)/chatbot/api/llm";
import { useState } from "react";

export default function ChatbotPage() {
  const { chatHistory, callConversation } = chatBot();
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      callConversation(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <div className="relative min-h-screen">
      <Navbar></Navbar>

      <ChatbotContainer>
        {chatHistory.map((chat, index) => (
          <Message key={index} user={chat.role === "user"} text={chat.text} />
        ))}
      </ChatbotContainer>

      <ChatBotInput
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onSend={handleSendMessage}
      />
    </div>
  );
}
