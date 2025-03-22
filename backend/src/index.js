const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const { nurseTriage } = require('./config/prompt');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Load deepseek model on Ollama startup
const loadModel = async () => {
  try {
    console.log('Loading deepseek-r1:1.5b model...');
    const response = await axios.post('http://ollama:11434/api/pull', {
      name: 'deepseek-r1:1.5b'
    });
    console.log('Model loaded successfully:', response.data);
  } catch (error) {
    console.error('Error loading model:', error.message);
  }
};

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'AI Nurse Triage API is running',
    endpoints: {
      '/chat': 'POST - Send a message to the AI nurse'
    }
  });
});

app.post('/chat', async (req, res) => {
  try {
    const { message, conversationId } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create system context with the nurse triage prompt
    const systemPrompt = nurseTriage;
    
    // Call Ollama API
    const response = await axios.post('http://ollama:11434/api/chat', {
      model: 'deepseek-r1:1.5b',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      stream: false
    });

    return res.json({
      response: response.data.message.content,
      conversationId: conversationId || Date.now().toString()
    });
  } catch (error) {
    console.error('Error calling Ollama:', error);
    return res.status(500).json({ 
      error: 'Failed to process your request',
      details: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Load the model when the server starts
  loadModel();
});