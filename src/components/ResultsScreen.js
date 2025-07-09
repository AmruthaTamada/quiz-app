// src/components/ResultsScreen.js
import React, { useState } from 'react';
import './ResultsScreen.css'; // Make sure to create or update this CSS file
import HighScoresDisplay from './HighScoresDisplay'; // 1. Import HighScoresDisplay

const QUALIFICATION_THRESHOLD_PERCENTAGE = 0.3; // e.g., 30% of total questions
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function ResultsScreen({ score, totalQuestions, onRestartQuiz }) {
  // In a subsequent task, we will add state here to manage the player's name input.
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [highScoresRefreshKey, setHighScoresRefreshKey] = useState(0);
  
  const minQualifyingScore = totalQuestions > 0 
                             ? Math.ceil(totalQuestions * QUALIFICATION_THRESHOLD_PERCENTAGE)
                             : 1; // Default to 1 if totalQuestions is 0 or less, though unlikely

  // Determine if the current score qualifies
  const doesScoreQualify = score >= minQualifyingScore && score > 0; // Also ensure score is positive


  // 3. Create an event handler for the input field's onChange event
  const handleNameChange = (event) => {
    setPlayerName(event.target.value);
    if (submissionMessage) {
      setSubmissionMessage('');
    }
  };

  // src/components/ResultsScreen.js
// ... (imports and other component code) ...

  const handleScoreSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior (page reload)

    // Client-side validation before attempting submission.
    // This provides immediate feedback and avoids unnecessary API calls.
    if (!doesScoreQualify) {
      setSubmissionMessage(`Error: Your score of ${score} does not meet the minimum of ${minQualifyingScore} to be submitted.`);
      return;
    }
    if (playerName.trim() === '') {
      setSubmissionMessage('Error: Please enter your name to submit the score.');
      return;
    }

    // Update UI to indicate submission is in progress.
    // Disables form elements to prevent multiple submissions or changes.
    setIsSubmitting(true);
    setSubmissionMessage(''); // Clear any previous submission messages

    const scoreData = {
      name: playerName.trim(),
      score: score,
    };

    // Asynchronous API call to POST the score data to the backend.
    // This block handles the full lifecycle: request, success, and various error states.
    try {
        const response = await fetch(`${API_BASE_URL}/api/highscores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Important for the backend to parse the body correctly
        },
        body: JSON.stringify(scoreData), // Convert JS object to JSON string for the request body
      });

      // The Fetch API doesn't throw an error for HTTP error statuses (e.g., 4xx, 5xx).
      // We must explicitly check `response.ok` to determine if the request was successful.
      if (!response.ok) {
        // Attempt to parse a JSON error response from the server, which might contain
        // a specific message (e.g., from backend validation or custom error handling).
        let specificMessageFromServer = '';
        try {
          const errorData = await response.json();
          // Prioritize backend-provided messages for better error context.
          if (errorData.message) {
            specificMessageFromServer = errorData.message;
          } else if (errorData.errors && Array.isArray(errorData.errors)) {
            // Handle cases where backend sends an array of error strings (e.g., Mongoose validation)
            specificMessageFromServer = errorData.errors.join('; ');
          }
        } catch (jsonError) {
          // If parsing the error response fails (e.g., it's not JSON),
          // log it for debugging but don't let it break user-facing error reporting.
          console.warn("Could not parse server error response as JSON:", jsonError);
        }
        
        // Construct a user-friendly error message based on the server's response.
        // Use the specific message if available, otherwise fallback to generic HTTP status messages.
        let finalUserErrorMessage = specificMessageFromServer;
        if (!finalUserErrorMessage) {
            if (response.status >= 500) {
              finalUserErrorMessage = `A server error occurred (Status: ${response.status}). Please try again later.`;
            } else if (response.status === 400) {
              finalUserErrorMessage = `There was a problem with your submission (Status: ${response.status}). Please check your input.`;
            } else {
              // General fallback for other client/server errors.
              finalUserErrorMessage = `An unexpected error occurred (Status: ${response.status} ${response.statusText || ''}).`.trim();
            }
        }
        // Propagate the error to the main catch block for consistent error state handling in the UI.
        throw new Error(finalUserErrorMessage);
      }

      // If the request was successful (response.ok is true):
      const savedScore = await response.json(); // Backend should return the saved score object
      console.log('Score submitted successfully! Server response:', savedScore);
      setSubmissionMessage(`Score for ${savedScore.name} submitted successfully!`);
      setPlayerName(''); // Clear input field for better UX post-submission.
      
      // Trigger a refresh of the HighScoresDisplay component by changing its key.
      // This forces HighScoresDisplay to re-mount and re-fetch the latest high scores.
      setHighScoresRefreshKey(prevKey => prevKey + 1);

    } catch (error) {
      // Centralized catch block for various types of errors:
      // 1. Network errors (e.g., 'TypeError: Failed to fetch' if the server is unreachable).
      // 2. Errors explicitly thrown from the 'if (!response.ok)' block above (HTTP errors).
      // 3. Any other unexpected JavaScript errors that occur within the 'try' block.
      console.error('Full error object during score submission:', error); // Log the full error for dev debugging.

      let displayMessage;
      // Differentiate network errors from other errors for more specific user feedback.
      if (error.name === 'TypeError' && error.message.toLowerCase().includes('failed to fetch')) {
        displayMessage = 'Could not connect to the server. Please check your internet connection and try again.';
      } else {
        // Use the message from the error object (which should be user-friendly if thrown from the !response.ok block).
        displayMessage = error.message || 'An unknown error occurred during submission.';
      }
      
      setSubmissionMessage(`Error: ${displayMessage}`); // Update UI with the error.
    } finally {
      // This block ensures that `isSubmitting` state is reset regardless of success or failure,
      // re-enabling the form for further attempts if necessary and hiding loading indicators.
      setIsSubmitting(false);
    }
  };
  return (
    <div className="results-screen">
      <div className="results-main-content">
        <h2>Quiz Completed!</h2>
        <p className="final-score">
          You scored {score} out of {totalQuestions}!
        </p>
        
        {/* --- Conditionally render the Score Submission Form --- */}
        {doesScoreQualify ? (
          <div className="score-submission-form">
            <h3>Save Your High Score:</h3>
            <form onSubmit={handleScoreSubmit}>
              <div className="form-group">
                <label htmlFor="playerName">Enter Your Name:</label>
                <input
                  type="text"
                  id="playerName"
                  placeholder="Your Name"
                  maxLength={50} 
                  value={playerName}
                  onChange={handleNameChange}
                  disabled={isSubmitting} 
                  required 
                />
              </div>
              {submissionMessage && (
                <p className={`submission-message ${submissionMessage.toLowerCase().includes('failed') || submissionMessage.toLowerCase().includes('please enter') || submissionMessage.toLowerCase().includes('does not meet') ? 'error' : 'success'}`}>
                  {submissionMessage}
                </p>
              )}
              <button 
                type="submit" 
                className="submit-score-button action-button"
                disabled={isSubmitting || playerName.trim() === ''}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Score'}
              </button>
            </form>
          </div>
        ) : (
          // Message to display if the score does not qualify
          <div className="qualification-message">
            <p>Your score of {score} is great, but you need at least {minQualifyingScore} points to save it to the leaderboard this time.</p>
            <p>Keep practicing!</p>
          </div>
        )}
        {/* --- End of Conditional Score Submission Form --- */}

        <button 
          onClick={onRestartQuiz} 
          className="restart-button action-button"
          disabled={isSubmitting} // isSubmitting is false if form isn't shown, but good for consistency
        >
          Restart Quiz
        </button>
      </div>

      <div className="high-scores-section-on-results">
        <HighScoresDisplay key={highScoresRefreshKey} />
      </div>
    </div>
  );
}

export default ResultsScreen;