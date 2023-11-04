// Check if the browser supports the SpeechRecognition API
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  
    // Configure recognition settings (optional)
    recognition.continuous = true; // Continuous listening
    recognition.interimResults = true; // Get interim results
  
    // Event listeners for speech recognition
    recognition.onstart = () => {
      console.log('Listening...');
    };
  
    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1][0].transcript;
      console.log('Recognized:', result);
  
      // You can do something with the recognized text here
      // For example, update a text field with the recognized speech
    };
  
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  
    // Start the recognition
    recognition.start();
  } else {
    console.error('Speech recognition not supported in this browser.');
  }
  