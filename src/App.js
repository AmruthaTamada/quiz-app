import React, { useState, useEffect } from 'react';
import './App.css';

import TopicSelector from './components/TopicSelector';
import QuestionDisplay from './components/QuestionDisplay';
import OptionsList from './components/OptionsList';
import ScoreTracker from './components/ScoreTracker';
import ResultsScreen from './components/ResultsScreen';

function App() {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userSelection, setUserSelection] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      setError(null);

      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      const apiUrl = selectedTopic
        ? `${API_BASE_URL}/api/questions?topic=${encodeURIComponent(selectedTopic)}`
        : `${API_BASE_URL}/api/questions`;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          let serverMessage = '';
          try {
            const errorData = await response.json();
            if (errorData.message) serverMessage = errorData.message;
          } catch (jsonErr) {
            console.warn("Error parsing server error response:", jsonErr);
          }

          const message = serverMessage || (
            response.status >= 500
              ? `Server error (${response.status}). Try again later.`
              : response.status === 404
              ? `No questions found (Error ${response.status}).`
              : `Unexpected error (${response.status}).`
          );
          throw new Error(message);
        }

        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
          setQuizData([]);
          setError("No quiz questions available. Try another topic or check back later.");
        } else {
          setQuizData(data);
        }

      } catch (err) {
        const fallbackMessage =
          err.name === 'TypeError' && err.message.toLowerCase().includes('fetch')
            ? 'Could not connect to server. Check your internet or backend.'
            : err.message || 'Unknown error occurred.';
        setError(fallbackMessage);
        setQuizData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [selectedTopic]);

  // ✅ Log number of questions fetched
  useEffect(() => {
    console.log("📦 Total questions fetched:", quizData.length);
  }, [quizData]);

  const totalQuestions = quizData.length;
  const currentQuestionData = (totalQuestions > 0 && currentQuestionIndex < totalQuestions)
    ? quizData[currentQuestionIndex]
    : null;

  const handleAnswerOptionClick = (selectedOption) => {
    if (!currentQuestionData) return;
    if (selectedOption === currentQuestionData.correctAnswer) {
      setScore(prev => prev + 1);
    }
    setUserSelection(selectedOption);
  };

  const handleNextQuestion = () => {
    setUserSelection(null);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleTopicSelection = (topic) => {
    setSelectedTopic(topic);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setUserSelection(null);
    setError(null);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setUserSelection(null);
    setError(null);
    setSelectedTopic(null);
  };

  if (loading) {
    return (
      <div className="app-status-container">
        <p className="loading-message">Loading quiz questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-status-container">
        <h1>Quiz App</h1>
        <p className="error-message">
          <strong>Error:</strong> {error}
          <br />
          (Ensure the backend server is running and the `quizData.json` is accessible.)
        </p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (!quizData || quizData.length === 0) {
    return (
      <div className="app-status-container">
        <h1>Quiz App</h1>
        <p className="info-message">
          No quiz questions available for {selectedTopic ? `"${selectedTopic}"` : 'the selected criteria'}.
          Please try another topic or check back later.
        </p>
        <button onClick={handleRestartQuiz}>Select Different Topic</button>
      </div>
    );
  }

  return (
    <div className="app fade-in">
      <h1>Quizzzy</h1>

      {!showResults && (
        <TopicSelector
          onTopicSelect={handleTopicSelection}
          currentSelectedTopic={selectedTopic}
        />
      )}

      {showResults ? (
        <ResultsScreen
          score={score}
          totalQuestions={totalQuestions}
          onRestartQuiz={handleRestartQuiz}
        />
      ) : (
        currentQuestionData ? (
          <div className="quiz-interface">
            <div key={currentQuestionIndex} className="quiz-content-area">
              <ScoreTracker
                score={score}
                currentQuestionNumber={currentQuestionIndex + 1}
                totalQuestions={totalQuestions}
              />
              <QuestionDisplay question={currentQuestionData} />
              <OptionsList
                options={currentQuestionData.options}
                onOptionClick={handleAnswerOptionClick}
                userSelectedOption={userSelection}
                correctAnswer={currentQuestionData.correctAnswer}
                isAttempted={!!userSelection}
              />
              {userSelection && (
                <button
                  className="next-question-button action-button"
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Show Results'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="info-message">Preparing question...</p>
        )
      )}
    </div>
  );
}

export default App;
