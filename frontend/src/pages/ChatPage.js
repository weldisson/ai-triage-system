import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ChatMessage from '../components/ChatMessage';
import './ChatPage.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  // Initial system message
  useEffect(() => {
    setMessages([
      {
        role: 'system',
        content: 'Olá! Sou o assistente de triagem. Como posso ajudar você hoje? Por favor, descreva o que está sentindo.'
      }
    ]);
  }, []);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      // Call the API
      const response = await axios.post('http://api.wabr.cc/chat', {
        message: input,
        conversationId
      });

      // Add response to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.data.response 
      }]);
      
      // Save conversation ID if it's new
      if (!conversationId && response.data.conversationId) {
        setConversationId(response.data.conversationId);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Falha ao conectar com o assistente. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h1>Enfermeiro de Triagem IA</h1>
        <p>Assistente para avaliação inicial de urgência médica</p>
        <div className="disclaimer">
          Este é um assistente de IA para simulação de triagem. Não substitui a avaliação de um profissional de saúde real.
          Em caso de emergência, ligue para 192 (SAMU) ou 193 (Bombeiros).
        </div>
      </div>

      <div className="chat-container">
        {error && <div className="error-message">{error}</div>}
        
        <div className="messages-container">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-form" onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Descreva seus sintomas ou faça uma pergunta..."
            disabled={loading}
            rows={3}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;