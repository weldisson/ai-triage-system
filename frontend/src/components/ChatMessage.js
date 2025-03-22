import React from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const { role, content } = message;
  const isUser = role === 'user';
  const isSystem = role === 'system';

  return (
    <div className={`chat-message ${isUser ? 'user-message' : isSystem ? 'system-message' : 'assistant-message'}`}>
      <div className="message-content">
        <div className="message-header">
          {isUser ? '👤 Você' : isSystem ? '💡 Sistema' : '🩺 Enfermeiro IA'}
        </div>
        <div className="message-body">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;