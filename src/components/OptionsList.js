// src/components/OptionsList.js
import React from 'react';
import './OptionsList.css'; // Ensure this CSS file is updated

function OptionsList({
  options,
  onOptionClick,
  correctAnswer,
  userSelectedOption,
  isAttempted,
}) {
  return (
    <div className="options-container">
      {options.map((optionText, index) => {
        // Determine the class for feedback styles
        let feedbackClass = '';
        if (isAttempted) {
          if (optionText === correctAnswer) {
            // This option is the correct answer
            feedbackClass = 'correct';
          } else if (optionText === userSelectedOption) {
            // This option was selected by the user and it's not the correct one
            feedbackClass = 'incorrect';
          }
          // Other options (not selected by user, not correct) will not get a specific feedback class,
          // but will be disabled. Their appearance will be controlled by the :disabled state.
        }

        return (
          <button
            key={index}
            className={`option-button ${feedbackClass}`} // Apply base class and feedback class
            onClick={() => onOptionClick(optionText)}
            // Disable the button if an answer has been attempted for the current question
            // or if the feedbackClass is set (which implies isAttempted is true)
            disabled={isAttempted}
          >
            {optionText}
          </button>
        );
      })}
    </div>
  );
}

export default OptionsList;