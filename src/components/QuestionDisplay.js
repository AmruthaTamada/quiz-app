// src/components/QuestionDisplay.js
import React from 'react';
// Make sure to import the CSS file for this component.
// If it doesn't exist, create an empty QuestionDisplay.css file in the same directory.
import './QuestionDisplay.css';

/**
 * QuestionDisplay Component
 * 
 * Renders the text of the current quiz question.
 * 
 * @param {object} props - The properties passed to the component.
 * @param {object} props.question - The current question object.
 *                                  Expected to have a 'question' property (e.g., props.question.question).
 */
function QuestionDisplay(props) {
  const { question } = props; // Destructure the question object from props

  // Handle cases where the question or question text might not be available
  if (!question || typeof question.question !== 'string') {
    return <p className="loading-question-text">Loading question...</p>;
  }

  return (
    <div className="question-display-container">
      {/* 
        We'll use a <p> tag for the question text for semantic correctness,
        as it represents a paragraph of text. You could also use an <h2> or <h3>
        depending on your desired heading structure.
        The className "question-text" will be used to apply specific styles.
      */}
      <p className="question-text">{question.question}</p>
    </div>
  );
}

export default QuestionDisplay;