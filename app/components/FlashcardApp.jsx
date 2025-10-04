"use client";

import React, { useState, useEffect } from 'react';
import { Upload, BookOpen, Brain, Trash2, ChevronLeft, ChevronRight, Check, X, Save, FolderOpen, Calendar, HelpCircle, FilePlus } from 'lucide-react';
import * as mammoth from 'mammoth';
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";

function FlashcardApp({ onDocumentChange }) {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState(null); // 'flashcards' or 'quiz'
  const [activeTab, setActiveTab] = useState('upload');
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [savedSessions, setSavedSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Ensure we're on the client side before accessing localStorage
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Notify parent component when file changes
  useEffect(() => {
    if (onDocumentChange) {
      onDocumentChange(file?.name || null);
    }
  }, [file, onDocumentChange]);

  // Load saved sessions from PostgreSQL on mount
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      loadSavedSessions();
    }
  }, [isClient]);

  // Fetch sessions from API
  const loadSavedSessions = async () => {
    try {
      const response = await fetch('/api/sessions');
      const data = await response.json();
      if (data.sessions) {
        setSavedSessions(data.sessions);
      }
    } catch (error) {
      console.error('Error loading saved sessions:', error);
    }
  };

  // Close modal with ESC key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && showHelp) {
        setShowHelp(false);
      }
    };

    if (showHelp) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showHelp]);

  // Save session to PostgreSQL via API
  const saveSession = async (sessionData) => {
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });
      
      const data = await response.json();
      if (data.session) {
        // Update local state
        const sessions = [...savedSessions];
        const existingIndex = sessions.findIndex(s => s.id === sessionData.id);
        
        if (existingIndex >= 0) {
          sessions[existingIndex] = data.session;
        } else {
          sessions.push(data.session);
        }
        
        setSavedSessions(sessions);
      }
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  // Auto-save when flashcards or quiz are generated
  useEffect(() => {
    if (file && extractedText && (flashcards.length > 0 || quiz.length > 0)) {
      const sessionId = currentSessionId || `session-${Date.now()}`;
      // Find existing session to preserve createdAt
      const existingSession = savedSessions.find(s => s.id === sessionId);
      
      const sessionData = {
        id: sessionId,
        fileName: file.name,
        fileType: file.type,
        extractedText: extractedText,
        flashcards: flashcards,
        quiz: quiz,
        createdAt: existingSession?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setCurrentSessionId(sessionId);
      saveSession(sessionData);
    }
  }, [flashcards, quiz]);

  // Load a saved session
  const loadSession = (session) => {
    setFile({ name: session.fileName, type: session.fileType });
    setExtractedText(session.extractedText);
    setFlashcards(session.flashcards || []);
    setQuiz(session.quiz || []);
    setCurrentSessionId(session.id);
    setActiveTab('upload');
    setCurrentCard(0);
    setFlipped(false);
    setQuizAnswers({});
    setShowResults(false);
  };

  // Delete a saved session from PostgreSQL via API
  const deleteSession = async (sessionId) => {
    try {
      const response = await fetch(`/api/sessions?id=${sessionId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        const sessions = savedSessions.filter(s => s.id !== sessionId);
        setSavedSessions(sessions);
        
        if (currentSessionId === sessionId) {
          resetApp();
        }
      }
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  // Disponibilizar o texto do documento para o Copilot
  useCopilotReadable({
    description: "O texto extraído do documento carregado pelo usuário",
    value: extractedText,
  });

  // Ação do Copilot para gerar flashcards
  useCopilotAction({
    name: "generateFlashcards",
    description: "Gera flashcards a partir do texto do documento. Cada flashcard deve ter uma pergunta (front) e uma resposta (back) baseada no conteúdo.",
    parameters: [
      {
        name: "flashcards",
        type: "object[]",
        description: "Array de flashcards gerados",
        attributes: [
          {
            name: "id",
            type: "number",
            description: "ID único do flashcard",
          },
          {
            name: "front",
            type: "string",
            description: "Pergunta ou conceito (frente do flashcard)",
          },
          {
            name: "back",
            type: "string",
            description: "Resposta ou explicação (verso do flashcard)",
          },
        ],
      },
    ],
    handler: async ({ flashcards }) => {
      setFlashcards(flashcards);
      setActiveTab('flashcards');
      setCurrentCard(0);
      setFlipped(false);
    },
  });

  // Ação do Copilot para gerar quiz
  useCopilotAction({
    name: "generateQuiz",
    description: "Gera um quiz de múltipla escolha a partir do texto do documento. Cada questão deve ter 4 opções e indicar qual é a correta.",
    parameters: [
      {
        name: "questions",
        type: "object[]",
        description: "Array de questões do quiz",
        attributes: [
          {
            name: "id",
            type: "number",
            description: "ID único da questão",
          },
          {
            name: "question",
            type: "string",
            description: "A pergunta",
          },
          {
            name: "options",
            type: "string[]",
            description: "Array com 4 opções de resposta",
          },
          {
            name: "correctAnswer",
            type: "number",
            description: "Índice da resposta correta (0-3)",
          },
        ],
      },
    ],
    handler: async ({ questions }) => {
      setQuiz(questions);
      setActiveTab('quiz');
      setQuizAnswers({});
      setShowResults(false);
    },
  });

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setLoading(true);

    try {
      if (uploadedFile.type === 'application/pdf') {
        // Send PDF to server for processing
        const formData = new FormData();
        formData.append('file', uploadedFile);
        
        const response = await fetch('/api/extract-pdf', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Erro ao processar PDF');
        }
        
        const data = await response.json();
        setExtractedText(data.text);
        setLoading(false);
      } else if (uploadedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const arrayBuffer = await uploadedFile.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setExtractedText(result.value);
        setLoading(false);
      } else {
        const text = await uploadedFile.text();
        setExtractedText(text);
        setLoading(false);
      }
    } catch (error) {
      console.error('Erro ao processar arquivo:', error);
      alert('Erro ao processar o arquivo: ' + error.message);
      setFile(null);
      setLoading(false);
    }
  };

  const generateFlashcards = async () => {
    if (!extractedText) {
      alert('Por favor, carregue um documento primeiro!');
      return;
    }
    
    setLoading(true);
    setLoadingType('flashcards');
    
    try {
      // Call the API to generate flashcards
      const response = await fetch('/api/generate-flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: extractedText }),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar flashcards');
      }

      const data = await response.json();
      setFlashcards(data.flashcards);
      setActiveTab('flashcards');
      setCurrentCard(0);
      setFlipped(false);
    } catch (error) {
      console.error('Erro ao gerar flashcards:', error);
      alert('Erro ao gerar flashcards. Você também pode usar o assistente IA no canto inferior direito!');
    } finally {
      setLoading(false);
      setLoadingType(null);
    }
  };

  const generateQuiz = async () => {
    if (!extractedText) {
      alert('Por favor, carregue um documento primeiro!');
      return;
    }
    
    setLoading(true);
    setLoadingType('quiz');
    
    try {
      // Call the API to generate quiz
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: extractedText }),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar quiz');
      }

      const data = await response.json();
      setQuiz(data.questions);
      setActiveTab('quiz');
      setQuizAnswers({});
      setShowResults(false);
    } catch (error) {
      console.error('Erro ao gerar quiz:', error);
      alert('Erro ao gerar quiz. Você também pode usar o assistente IA no canto inferior direito!');
    } finally {
      setLoading(false);
      setLoadingType(null);
    }
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: quiz.length, percentage: Math.round((correct / quiz.length) * 100) };
  };

  const resetApp = () => {
    setFile(null);
    setExtractedText('');
    setFlashcards([]);
    setQuiz([]);
    setActiveTab('upload');
    setQuizAnswers({});
    setShowResults(false);
    setCurrentSessionId(null);
  };

  // Start a new session (clear everything)
  const startNewSession = () => {
    if (file || flashcards.length > 0 || quiz.length > 0) {
      if (confirm('Deseja iniciar uma nova sessão? Os dados não salvos serão perdidos.')) {
        resetApp();
      }
    } else {
      resetApp();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 flex flex-col">
      <div className="max-w-6xl mx-auto flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar - Saved Sessions */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl p-4 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                <FolderOpen className="w-5 h-5 mr-2" />
                Sessões Salvas
              </h2>
            </div>
            
            {!isClient ? (
              <p className="text-gray-500 text-sm text-center py-8">
                Carregando...
              </p>
            ) : savedSessions.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">
                Nenhuma sessão salva ainda
              </p>
            ) : (
              <div className="space-y-2">
                {savedSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      currentSessionId === session.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div onClick={() => loadSession(session)}>
                      <div className="font-medium text-sm text-gray-800 truncate">
                        {session.fileName}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <BookOpen className="w-3 h-3" />
                        <span>{session.flashcards?.length || 0} cards</span>
                        <Brain className="w-3 h-3 ml-1" />
                        <span>{session.quiz?.length || 0} quiz</span>
                      </div>
                      {isClient && (
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(session.updatedAt).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                          {' '}
                          {new Date(session.updatedAt).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Deseja excluir esta sessão permanentemente?')) {
                          deleteSession(session.id);
                        }
                      }}
                      className="mt-2 w-full text-xs text-red-600 hover:text-red-800 py-1"
                    >
                      Excluir
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Gerador de Flashcards e Quiz com IA</h1>
                <p className="text-purple-100">Faça upload de um documento e gere conteúdo de estudo automaticamente</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={startNewSession}
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors"
                  title="Nova Sessão"
                >
                  <FilePlus className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowHelp(true)}
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors"
                  title="Ajuda"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
                {file && (
                  <button
                    onClick={() => {
                      if (currentSessionId) {
                        // Se há uma sessão carregada, perguntar se quer excluí-la
                        if (confirm('Deseja excluir esta sessão permanentemente?')) {
                          deleteSession(currentSessionId);
                        }
                      } else {
                        // Se não há sessão salva, apenas resetar
                        resetApp();
                      }
                    }}
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors"
                    title={currentSessionId ? "Excluir sessão" : "Recomeçar"}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          {file && (
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-4 px-6 font-medium transition-colors ${
                  activeTab === 'upload'
                    ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Upload className="w-5 h-5 inline mr-2" />
                Documento
              </button>
              <button
                onClick={() => setActiveTab('flashcards')}
                className={`flex-1 py-4 px-6 font-medium transition-colors ${
                  activeTab === 'flashcards'
                    ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <BookOpen className="w-5 h-5 inline mr-2" />
                Flashcards ({flashcards.length})
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex-1 py-4 px-6 font-medium transition-colors ${
                  activeTab === 'quiz'
                    ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Brain className="w-5 h-5 inline mr-2" />
                Quiz ({quiz.length})
              </button>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Upload Section */}
            {activeTab === 'upload' && (
              <div className="space-y-6">
                {loading && !extractedText ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Processando documento...</p>
                  </div>
                ) : !file ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-purple-400 transition-colors">
                    <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Faça upload do seu documento
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Suporta PDF, DOCX, TXT (máx. 10MB)
                    </p>
                    <label className="inline-block">
                      <input
                        type="file"
                        accept=".pdf,.docx,.txt"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <span className="bg-purple-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors inline-block">
                        Selecionar Arquivo
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-800">Arquivo carregado: {file.name}</span>
                      </div>
                    </div>

                    {extractedText && (
                      <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                        <h4 className="font-semibold text-gray-700 mb-2">Prévia do conteúdo:</h4>
                        <p className="text-gray-600 text-sm whitespace-pre-wrap">{extractedText.substring(0, 500)}...</p>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <button
                        onClick={generateFlashcards}
                        disabled={loading}
                        className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                      >
                        {loadingType === 'flashcards' ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Gerando Flashcards...</span>
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-5 h-5" />
                            <span>Gerar Flashcards</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={generateQuiz}
                        disabled={loading}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                      >
                        {loadingType === 'quiz' ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Gerando Quiz...</span>
                          </>
                        ) : (
                          <>
                            <Brain className="w-5 h-5" />
                            <span>Gerar Quiz</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Flashcards Section */}
            {activeTab === 'flashcards' && (
              <div className="space-y-6">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Gerando flashcards com IA...</p>
                  </div>
                ) : flashcards.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">Clique em "Gerar Flashcards" para começar</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <span className="text-sm text-gray-600">
                        Flashcard {currentCard + 1} de {flashcards.length}
                      </span>
                    </div>

                    <div
                      className="relative h-80 cursor-pointer perspective-1000"
                      onClick={() => setFlipped(!flipped)}
                    >
                      <div className={`absolute inset-0 transition-transform duration-500 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-xl p-8 flex items-center justify-center backface-hidden">
                          <div className="text-center text-white">
                            <h3 className="text-2xl font-bold mb-4">{flashcards[currentCard].front}</h3>
                            <p className="text-purple-100">Clique para ver a resposta</p>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-white rounded-xl shadow-xl p-8 flex items-center justify-center backface-hidden rotate-y-180">
                          <div className="text-center">
                            <p className="text-gray-800 text-lg">{flashcards[currentCard].back}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => {
                          setCurrentCard(Math.max(0, currentCard - 1));
                          setFlipped(false);
                        }}
                        disabled={currentCard === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Anterior
                      </button>
                      <button
                        onClick={() => {
                          setCurrentCard(Math.min(flashcards.length - 1, currentCard + 1));
                          setFlipped(false);
                        }}
                        disabled={currentCard === flashcards.length - 1}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Próximo
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quiz Section */}
            {activeTab === 'quiz' && (
              <div className="space-y-6">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Gerando quiz com IA...</p>
                  </div>
                ) : quiz.length === 0 ? (
                  <div className="text-center py-12">
                    <Brain className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">Clique em "Gerar Quiz" para começar</p>
                  </div>
                ) : showResults ? (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 text-center">
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">
                        Resultado Final
                      </h3>
                      <div className="text-6xl font-bold text-green-600 mb-4">
                        {calculateScore().percentage}%
                      </div>
                      <p className="text-xl text-gray-700">
                        Você acertou {calculateScore().correct} de {calculateScore().total} questões
                      </p>
                    </div>

                    {quiz.map((q) => (
                      <div key={q.id} className="bg-white border-2 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">{q.question}</h4>
                        <div className="space-y-2">
                          {q.options.map((option, idx) => {
                            const isCorrect = idx === q.correctAnswer;
                            const isSelected = quizAnswers[q.id] === idx;
                            
                            return (
                              <div
                                key={idx}
                                className={`p-3 rounded-lg border-2 ${
                                  isCorrect
                                    ? 'bg-green-50 border-green-500'
                                    : isSelected
                                    ? 'bg-red-50 border-red-500'
                                    : 'border-gray-200'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{option}</span>
                                  {isCorrect && <Check className="w-5 h-5 text-green-600" />}
                                  {isSelected && !isCorrect && <X className="w-5 h-5 text-red-600" />}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        setQuizAnswers({});
                        setShowResults(false);
                      }}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Refazer Quiz
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {quiz.map((q) => (
                      <div key={q.id} className="bg-white border-2 border-gray-200 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-800 mb-4">
                          {q.id}. {q.question}
                        </h4>
                        <div className="space-y-2">
                          {q.options.map((option, idx) => (
                            <label
                              key={idx}
                              className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                                quizAnswers[q.id] === idx
                                  ? 'bg-blue-50 border-blue-500'
                                  : 'border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${q.id}`}
                                checked={quizAnswers[q.id] === idx}
                                onChange={() => handleQuizAnswer(q.id, idx)}
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="ml-3">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={submitQuiz}
                      disabled={Object.keys(quizAnswers).length !== quiz.length}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                    >
                      Enviar Respostas
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Help Modal */}
      {showHelp && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowHelp(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Como Usar a Aplicação</h2>
                <button
                  onClick={() => setShowHelp(false)}
                  className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Upload Section */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Upload className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">1. Upload de Documento</h3>
                  <p className="text-gray-600">
                    Faça upload de um arquivo PDF, DOCX ou TXT contendo o conteúdo que você deseja estudar. 
                    A aplicação irá extrair o texto automaticamente.
                  </p>
                </div>
              </div>

              {/* Generation Section */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">2. Geração com IA</h3>
                  <p className="text-gray-600 mb-2">
                    Após o upload, você pode gerar:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                    <li><strong>Flashcards:</strong> Cartões de estudo com perguntas e respostas</li>
                    <li><strong>Quiz:</strong> Questões de múltipla escolha para testar seus conhecimentos</li>
                  </ul>
                </div>
              </div>

              {/* Flashcards Section */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">3. Estudar com Flashcards</h3>
                  <p className="text-gray-600">
                    Clique nos flashcards para revelar a resposta. Use as setas para navegar entre os cartões. 
                    Ideal para memorização e revisão rápida.
                  </p>
                </div>
              </div>

              {/* Quiz Section */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Check className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">4. Responder Quiz</h3>
                  <p className="text-gray-600">
                    Selecione as respostas clicando nas opções. Após responder todas as questões, 
                    clique em "Ver Resultados" para conferir seu desempenho.
                  </p>
                </div>
              </div>

              {/* Save Session Section */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Save className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">5. Salvar Sessões</h3>
                  <p className="text-gray-600">
                    Clique em "Salvar Sessão" para guardar seu progresso. As sessões salvas aparecem 
                    no menu lateral e podem ser carregadas a qualquer momento. Use o botão de lixeira 
                    para excluir sessões.
                  </p>
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border-2 border-purple-200">
                <h3 className="font-bold text-lg text-gray-800 mb-2">💡 Dicas</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                  <li>Use documentos com conteúdo bem estruturado para melhores resultados</li>
                  <li>Os flashcards são ideais para conceitos e definições</li>
                  <li>Os quizzes são perfeitos para testar compreensão</li>
                  <li>Suas sessões são salvas no navegador e persistem entre visitas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-8 pt-6 pb-4 border-t border-white/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 flex-wrap text-sm text-gray-600">
            <span>Esta aplicação utiliza o</span>
            <a 
              href="https://www.copilotkit.ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-purple-600 hover:text-purple-800 transition-colors"
              title="CopilotKit"
            >
              CopilotKit
            </a>
            <span>conectada à API do</span>
            <a 
              href="https://openai.com/index/gpt-4/"
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-green-600 hover:text-green-800 transition-colors"
              title="GPT-4o"
            >
              GPT-4o
            </a>
            <span>• Desenvolvido em</span>
            <a 
              href="https://code.visualstudio.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              title="Visual Studio Code"
            >
              VS Code
            </a>
            <span>com</span>
            <a 
              href="https://github.com/features/copilot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-purple-600 hover:text-purple-800 transition-colors"
              title="GitHub Copilot"
            >
              GitHub Copilot
            </a>
            <span>e</span>
            <a 
              href="https://www.anthropic.com/claude/sonnet" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-orange-600 hover:text-orange-800 transition-colors"
              title="Claude Sonnet 4.5 (Preview)"
            >
              Claude Sonnet 4.5
            </a>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            <span>v2025.10.03 (CalVer)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default FlashcardApp;
