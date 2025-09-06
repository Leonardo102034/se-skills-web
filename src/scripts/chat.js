// Chat funcional para videollamadas
class VideoCallChat {
  constructor() {
    this.messages = [];
    this.currentUser = 'Usuario Actual'; // Esto debería venir de la autenticación
    this.participants = [
      { name: 'Agente Cricker', color: 'blue', personality: 'analytical' },
      { name: 'Participante de la llamada', color: 'purple', personality: 'user' }
    ];
    
    // Configuración de texto a voz
    this.speechSynthesis = window.speechSynthesis;
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.voicesLoaded = false;
    
    this.initializeChat();
    this.loadVoices();
  }

  initializeChat() {
    // Referencias a elementos del chat
    this.chatContainer = document.getElementById('chat-messages');
    this.messageInput = document.getElementById('message-input');
    this.sendButton = document.getElementById('send-button');
    this.chatToggle = document.getElementById('chat-toggle');
    this.chatToggleButton = document.getElementById('chat-toggle-button');
    this.chatSidebar = document.getElementById('chat-sidebar');
    this.scrollToBottomButton = document.getElementById('scroll-to-bottom');
    this.ttsToggleButton = document.getElementById('tts-toggle');
    this.voiceLanguageSelector = document.getElementById('voice-language-selector');
    this.isChatVisible = true;
    this.ttsEnabled = true;
    this.selectedLanguage = 'es-MX'; // Idioma por defecto

    // Agregar event listeners
    this.setupEventListeners();
    
    // Cargar mensajes iniciales
    this.loadInitialMessages();
  }

  setupEventListeners() {
    // Enviar mensaje al hacer clic en el botón
    this.sendButton?.addEventListener('click', () => this.sendMessage());
    
    // Enviar mensaje al presionar Enter
    this.messageInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });

    // Toggle del chat (botón interno)
    this.chatToggle?.addEventListener('click', () => this.hideChat());
    
    // Toggle del chat (botón flotante)
    this.chatToggleButton?.addEventListener('click', () => this.toggleChat());

    // Botón para ir al final del chat
    this.scrollToBottomButton?.addEventListener('click', () => this.scrollToBottom());

    // Mostrar/ocultar botón de scroll según la posición
    this.chatContainer?.addEventListener('scroll', () => this.handleScroll());

    // Botón de toggle TTS
    this.ttsToggleButton?.addEventListener('click', () => this.toggleTTS());

    // Selector de idioma de voz
    this.voiceLanguageSelector?.addEventListener('change', (e) => this.changeVoiceLanguage(e.target.value));
  }

  loadInitialMessages() {
    // Mensajes iniciales del Agente Cricker sobre pensamiento crítico
    const initialMessages = [
      { 
        user: 'Agente Cricker', 
        message: '¡Hola! Soy Agente Cricker y te ayudaré a desarrollar habilidades de pensamiento crítico. ¿En qué te gustaría trabajar hoy?', 
        color: 'blue', 
        timestamp: new Date(Date.now() - 300000) 
      },
      { 
        user: 'Agente Cricker', 
        message: 'El pensamiento crítico implica analizar información de manera objetiva, evaluar evidencias y llegar a conclusiones bien fundamentadas.', 
        color: 'blue', 
        timestamp: new Date(Date.now() - 240000) 
      }
    ];

    initialMessages.forEach(msg => {
      this.addMessage(msg.user, msg.message, msg.color, msg.timestamp);
      // Hacer que el Agente Cricker hable en los mensajes iniciales
      if (msg.user === 'Agente Cricker') {
        setTimeout(() => {
          this.speakAsAgent(msg.message);
        }, 2000); // Delay para que no hable inmediatamente
      }
    });
  }

  sendMessage() {
    const messageText = this.messageInput?.value.trim();
    
    if (!messageText) return;

    // Agregar mensaje del usuario actual
    this.addMessage(this.currentUser, messageText, 'purple', new Date());
    
    // Limpiar input
    this.messageInput.value = '';
    
    // Simular respuesta de otros participantes (opcional)
    this.simulateResponse(messageText);
  }

  addMessage(user, message, color, timestamp = new Date()) {
    const messageObj = {
      user,
      message,
      color,
      timestamp
    };

    this.messages.push(messageObj);
    
    // Limitar el número de mensajes visibles para mejorar el rendimiento
    const maxMessages = 30;
    if (this.messages.length > maxMessages) {
      // Remover el mensaje más antiguo del DOM
      const oldestMessage = this.chatContainer.firstChild;
      if (oldestMessage) {
        this.chatContainer.removeChild(oldestMessage);
      }
      // Remover del array también
      this.messages.shift();
    }
    
    this.renderMessage(messageObj);
    
    // Usar setTimeout para asegurar que el DOM se actualice antes del scroll
    setTimeout(() => {
      this.autoScrollIfNeeded();
    }, 50);
  }

  renderMessage(messageObj) {
    if (!this.chatContainer) return;

    const messageElement = document.createElement('div');
    
    // Mapear colores a clases CSS específicas
    const colorClasses = {
      'blue': 'bg-blue-500 bg-opacity-20 border-blue-400 text-blue-300',
      'purple': 'bg-purple-500 bg-opacity-20 border-purple-400 text-purple-300',
      'green': 'bg-green-500 bg-opacity-20 border-green-400 text-green-300',
      'orange': 'bg-orange-500 bg-opacity-20 border-orange-400 text-orange-300',
      'red': 'bg-red-500 bg-opacity-20 border-red-400 text-red-300'
    };
    
    const colorClass = colorClasses[messageObj.color] || colorClasses['blue'];
    const [bgClass, borderClass, textClass] = colorClass.split(' ');
    
    messageElement.className = `${bgClass} p-3 rounded-lg mb-3 border-l-4 ${borderClass} message-hover cursor-pointer`;
    
    const timeString = messageObj.timestamp.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    messageElement.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <div class="text-sm font-semibold ${textClass}">${messageObj.user}</div>
        <div class="text-xs text-gray-400 font-mono">${timeString}</div>
      </div>
      <div class="text-sm text-gray-200 leading-relaxed break-words">${messageObj.message}</div>
    `;

    this.chatContainer.appendChild(messageElement);
  }

  scrollToBottom() {
    if (this.chatContainer) {
      // Usar requestAnimationFrame para asegurar que el DOM se haya actualizado
      requestAnimationFrame(() => {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
      });
    }
  }

  // Función para verificar si el usuario está cerca del final del chat
  isNearBottom() {
    if (!this.chatContainer) return true;
    const threshold = 100;
    return (this.chatContainer.scrollTop + this.chatContainer.clientHeight) >= 
           (this.chatContainer.scrollHeight - threshold);
  }

  // Función para auto-scroll solo si el usuario está cerca del final
  autoScrollIfNeeded() {
    if (this.isNearBottom()) {
      this.scrollToBottom();
    }
  }

  // Función para manejar el scroll y mostrar/ocultar el botón
  handleScroll() {
    if (!this.scrollToBottomButton) return;
    
    if (this.isNearBottom()) {
      // Ocultar botón si está cerca del final
      this.scrollToBottomButton.classList.add('opacity-0', 'pointer-events-none');
      this.scrollToBottomButton.classList.remove('opacity-100', 'pointer-events-auto');
    } else {
      // Mostrar botón si no está cerca del final
      this.scrollToBottomButton.classList.remove('opacity-0', 'pointer-events-none');
      this.scrollToBottomButton.classList.add('opacity-100', 'pointer-events-auto');
    }
  }

  simulateResponse(originalMessage) {
    // Simular respuestas automáticas del Agente Cricker
    const agentResponses = {
      'hola': ['¡Hola! Me alegra verte aquí. ¿En qué aspecto del pensamiento crítico te gustaría trabajar?'],
      'gracias': ['De nada, es un placer ayudarte. Continuemos desarrollando tus habilidades.'],
      'ayuda': ['Estoy aquí para ayudarte. Puedo guiarte en técnicas de análisis, evaluación de evidencias y razonamiento lógico.'],
      'evidencia': ['Excelente pregunta. Para evaluar evidencias, debemos considerar su relevancia, credibilidad y suficiencia.'],
      'sesgo': ['Los sesgos cognitivos son trampas comunes. Identificarlos es clave para el pensamiento crítico.'],
      'fuente': ['Evaluar fuentes implica verificar su autoridad, precisión, objetividad y actualidad.'],
      'argumento': ['Analicemos este argumento: ¿cuáles son las premisas y la conclusión? ¿Es válido y sólido?'],
      'conclusion': ['Las conclusiones deben basarse en evidencias sólidas y seguir lógicamente de las premisas.'],
      'pensamiento': ['El pensamiento crítico es un proceso activo que requiere curiosidad, escepticismo y análisis sistemático.'],
      'analisis': ['Para analizar efectivamente, debemos descomponer el problema en partes más pequeñas y examinar cada una.'],
      'logica': ['La lógica nos ayuda a identificar si un argumento es válido y si las conclusiones se siguen de las premisas.'],
      'critico': ['Ser crítico no significa ser negativo, sino evaluar información de manera objetiva y reflexiva.']
    };

    const lowerMessage = originalMessage.toLowerCase();
    let response = null;

    // Buscar palabras clave en las respuestas del agente
    for (const [keyword, possibleResponses] of Object.entries(agentResponses)) {
      if (lowerMessage.includes(keyword)) {
        response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
        break;
      }
    }

    // Si no hay respuesta específica, dar una respuesta general
    if (!response) {
      const generalResponses = [
        'Interesante punto. ¿Podrías elaborar más sobre eso?',
        'Esa es una perspectiva valiosa. ¿Qué más consideras importante?',
        'Me gusta cómo piensas. ¿Has considerado otros ángulos de este tema?',
        'Excelente observación. ¿Cómo llegaste a esa conclusión?',
        'Muy bien. ¿Qué evidencias respaldan tu punto de vista?'
      ];
      response = generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }

    if (response) {
      // Simular delay antes de responder
      setTimeout(() => {
        this.addMessage('Agente Cricker', response, 'blue');
        // Hacer que el Agente Cricker hable
        this.speakAsAgent(response);
      }, 1000 + Math.random() * 2000);
    }
  }

  toggleChat() {
    if (this.isChatVisible) {
      this.hideChat();
    } else {
      this.showChat();
    }
  }

  showChat() {
    if (this.chatSidebar) {
      this.chatSidebar.classList.remove('translate-x-full');
      this.chatSidebar.classList.add('translate-x-0');
      this.isChatVisible = true;
      
      // Scroll al final cuando se abre
      setTimeout(() => this.scrollToBottom(), 300);
    }
  }

  hideChat() {
    if (this.chatSidebar) {
      this.chatSidebar.classList.remove('translate-x-0');
      this.chatSidebar.classList.add('translate-x-full');
      this.isChatVisible = false;
    }
  }

  updateToggleButton() {
    // El botón de toggle ya no existe, esta función se mantiene para compatibilidad
    return;
  }

  // Método para agregar mensajes del sistema
  addSystemMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'bg-gray-600 bg-opacity-20 p-2 rounded-lg mb-2 text-center';
    messageElement.innerHTML = `<div class="text-xs text-gray-400 italic">${message}</div>`;
    
    if (this.chatContainer) {
      this.chatContainer.appendChild(messageElement);
      this.scrollToBottom();
    }
  }

  // Método para limpiar el chat
  clearChat() {
    if (this.chatContainer) {
      this.chatContainer.innerHTML = '';
    }
    this.messages = [];
  }

  // Métodos de texto a voz
  speakAsAgent(text) {
    if (!this.speechSynthesis || !this.ttsEnabled) {
      console.log('Text-to-speech no está soportado o está desactivado');
      return;
    }

    // Detener cualquier speech anterior
    this.stopSpeaking();

    // Crear nueva utterance
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Configurar la voz del agente
    this.configureAgentVoice(this.currentUtterance);
    
    // Event listeners
    this.currentUtterance.onstart = () => {
      this.isSpeaking = true;
      this.showSpeakingIndicator();
    };
    
    this.currentUtterance.onend = () => {
      this.isSpeaking = false;
      this.hideSpeakingIndicator();
    };
    
    this.currentUtterance.onerror = (event) => {
      console.error('Error en speech synthesis:', event.error);
      this.isSpeaking = false;
      this.hideSpeakingIndicator();
    };

    // Iniciar el speech
    this.speechSynthesis.speak(this.currentUtterance);
  }

  toggleTTS() {
    this.ttsEnabled = !this.ttsEnabled;
    
    // Actualizar el icono del botón
    const icon = this.ttsToggleButton.querySelector('svg');
    if (this.ttsEnabled) {
      // Icono de altavoz activo
      icon.innerHTML = '<path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-4.816a1 1 0 011-.108zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd"></path>';
      this.ttsToggleButton.classList.remove('text-gray-400');
      this.ttsToggleButton.classList.add('text-blue-400');
      this.ttsToggleButton.title = 'Desactivar voz del Agente';
    } else {
      // Icono de altavoz tachado
      icon.innerHTML = '<path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-4.816a1 1 0 011-.108zM3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"></path>';
      this.ttsToggleButton.classList.remove('text-blue-400');
      this.ttsToggleButton.classList.add('text-gray-400');
      this.ttsToggleButton.title = 'Activar voz del Agente';
      // Detener cualquier speech en curso
      this.stopSpeaking();
    }
  }

  configureAgentVoice(utterance) {
    // Configurar propiedades de la voz
    utterance.rate = 0.9; // Velocidad ligeramente más lenta para sonar más profesional
    utterance.pitch = 1.0; // Tono normal
    utterance.volume = 0.8; // Volumen moderado
    utterance.lang = this.selectedLanguage; // Usar el idioma seleccionado por el usuario
    
    // Intentar usar una voz en español masculina si está disponible
    const voices = this.speechSynthesis.getVoices();
    
    // Prioridad 1: Voces masculinas en el idioma seleccionado
    const targetMaleVoice = voices.find(voice => 
      voice.lang === this.selectedLanguage && (
        voice.name.includes('Male') || 
        voice.name.includes('masculino') ||
        voice.name.includes('Hombre') ||
        voice.name.includes('Diego') ||
        voice.name.includes('Carlos') ||
        voice.name.includes('Antonio') ||
        voice.name.includes('Google') ||
        voice.name.includes('Microsoft') ||
        voice.name.includes('David') ||
        voice.name.includes('Alex') ||
        voice.name.includes('Daniel') ||
        voice.name.includes('Paul') ||
        voice.name.includes('Mark')
      )
    );
    
    // Prioridad 2: Cualquier voz masculina en el idioma base
    const baseMaleVoice = voices.find(voice => 
      voice.lang.startsWith(this.selectedLanguage.split('-')[0]) && (
        voice.name.includes('Male') || 
        voice.name.includes('masculino') ||
        voice.name.includes('Hombre') ||
        voice.name.includes('Diego') ||
        voice.name.includes('Carlos') ||
        voice.name.includes('Antonio') ||
        voice.name.includes('Google') ||
        voice.name.includes('Microsoft') ||
        voice.name.includes('David') ||
        voice.name.includes('Alex') ||
        voice.name.includes('Daniel') ||
        voice.name.includes('Paul') ||
        voice.name.includes('Mark')
      )
    );
    
    // Prioridad 3: Cualquier voz en el idioma seleccionado
    const targetVoice = voices.find(voice => 
      voice.lang === this.selectedLanguage
    );
    
    // Prioridad 4: Cualquier voz en el idioma base
    const baseVoice = voices.find(voice => 
      voice.lang.startsWith(this.selectedLanguage.split('-')[0])
    );
    
    // Aplicar la mejor voz disponible
    if (targetMaleVoice) {
      utterance.voice = targetMaleVoice;
      console.log('Usando voz masculina en', this.selectedLanguage, ':', targetMaleVoice.name);
    } else if (baseMaleVoice) {
      utterance.voice = baseMaleVoice;
      console.log('Usando voz masculina en', this.selectedLanguage.split('-')[0], ':', baseMaleVoice.name);
    } else if (targetVoice) {
      utterance.voice = targetVoice;
      console.log('Usando voz en', this.selectedLanguage, ':', targetVoice.name);
    } else if (baseVoice) {
      utterance.voice = baseVoice;
      console.log('Usando voz en', this.selectedLanguage.split('-')[0], ':', baseVoice.name);
    } else {
      console.log('Usando voz por defecto del sistema para', this.selectedLanguage);
    }
  }

  stopSpeaking() {
    if (this.speechSynthesis.speaking) {
      this.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.hideSpeakingIndicator();
  }

  showSpeakingIndicator() {
    // Crear indicador visual de que el agente está hablando
    const indicator = document.createElement('div');
    indicator.id = 'speaking-indicator';
    indicator.className = 'fixed top-20 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2';
    indicator.innerHTML = `
      <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      <span class="text-sm font-medium">Agente Cricker está hablando...</span>
    `;
    
    document.body.appendChild(indicator);
    
    // Auto-remover después de 10 segundos como fallback
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.remove();
      }
    }, 10000);
  }

  hideSpeakingIndicator() {
    const indicator = document.getElementById('speaking-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  // Método para que el usuario pueda activar/desactivar el TTS
  toggleAgentSpeech() {
    if (this.isSpeaking) {
      this.stopSpeaking();
    } else {
      // Si hay un mensaje reciente del agente, repetirlo
      const lastAgentMessage = this.messages
        .filter(msg => msg.user === 'Agente Cricker')
        .pop();
      
      if (lastAgentMessage) {
        this.speakAsAgent(lastAgentMessage.message);
      }
    }
  }

  // Cambiar idioma de la voz
  changeVoiceLanguage(language) {
    this.selectedLanguage = language;
    console.log('Idioma de voz cambiado a:', language);
    
    // Si hay un mensaje reciente del agente, repetirlo con el nuevo idioma
    const lastAgentMessage = this.messages
      .filter(msg => msg.user === 'Agente Cricker')
      .pop();
    
    if (lastAgentMessage && this.ttsEnabled) {
      // Detener cualquier speech actual
      this.stopSpeaking();
      // Repetir el último mensaje con el nuevo idioma
      setTimeout(() => {
        this.speakAsAgent(lastAgentMessage.message);
      }, 500);
    }
  }
}

// Inicializar chat cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new VideoCallChat();
});

