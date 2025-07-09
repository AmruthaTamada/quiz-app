// src/components/ScoreTracker.js
import React from 'react';
// Ensure you have created ScoreTracker.css in src/components/
// and that this import statement is present.
import './ScoreTracker.css'; 

/**
 * ScoreTracker Component
 * 
 * Displays the current score and the user's progress (e.g., Question X of Y).
 * 
 * @param {object} props - The properties passed to the component.
 * @param {number} props.score - The user's current score.
 * @param {number} props.currentQuestionNumber - The number of the current question (1-based).
 * @param {number} props.totalQuestions - The total number of questions in the quiz.
 */
function ScoreTracker(props) {
  // Destructure props for easier access
  const { score, currentQuestionNumber, totalQuestions } = props;

  return (
    <div className="score-tracker-container">
      <div className="score-display-item">
        <span className="score-label">Score:</span>
        <span className="score-value">{score}</span>
      </div>
      <div className="question-progress-item">
        <span className="question-label">Question:</span>
        <span className="question-value">
          {currentQuestionNumber} / {totalQuestions}
        </span>
      </div>
    </div>
  );
}

export default ScoreTracker;