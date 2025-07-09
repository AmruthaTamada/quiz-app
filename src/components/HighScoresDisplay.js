// src/components/HighScoresDisplay.js

import React, { useState, useEffect } from 'react';
import './HighScoresDisplay.css'; // We'll create this CSS file for styling

function HighScoresDisplay() {
  // State to store the array of high score objects fetched from the API
  const [highScores, setHighScores] = useState([]);
  // State to manage the loading status while fetching data
  const [loading, setLoading] = useState(true);
  // State to store any error that occurs during the fetch operation
  const [error, setError] = useState(null);

  // useEffect hook to fetch high scores when the component mounts
  useEffect(() => {
    console.log("HighScoresDisplay: useEffect - Attempting to fetch high scores...");
    setLoading(true); // Indicate that data fetching has started
    setError(null);   // Clear any previous errors

    // Fetch high scores from the backend API endpoint
    // This endpoint was created in your Node.js/Express backend (Task 11.4)
    fetch('http://localhost:5000/api/highscores')
      .then(response => {
        // Check if the HTTP response is successful (status code 200-299)
        if (!response.ok) {
          // If not okay, construct an error message including the status
          // and throw it to be caught by the .catch() block
          throw new Error(`Failed to fetch high scores. Server responded with ${response.status}: ${response.statusText}`);
        }
        // If the response is okay, parse the response body as JSON
        // response.json() returns a Promise that resolves with the parsed data
        return response.json();
      })
      .then(fetchedScores => {
        // This .then() block executes when JSON parsing is successful
        // 'fetchedScores' will be the array of high score objects from your API
        // e.g., [{ name: 'Player1', score: 100, date: '...' }, ...]
        console.log("HighScoresDisplay: High scores fetched successfully:", fetchedScores);
        setHighScores(fetchedScores); // Update the 'highScores' state
      })
      .catch(err => {
        // This .catch() block executes if any error occurred in the fetch chain
        // (e.g., network error, server error response, JSON parsing error)
        console.error("HighScoresDisplay: Error fetching high scores:", err.message);
        setError(err.message); // Update the 'error' state with the error message
      })
      .finally(() => {
        // The .finally() block executes after the Promise settles (either resolved or rejected)
        // It's a good place to set loading to false, indicating the fetch attempt is complete
        setLoading(false);
        console.log("HighScoresDisplay: Fetch sequence complete. Loading set to false.");
      });

    // The empty dependency array [] ensures this effect runs only once
    // when the component mounts, and not on subsequent re-renders.
  }, []);

  // Helper function to format the date string into a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateString; // Return original if formatting fails
    }
  };
  
  // --- Conditional Rendering Logic ---

  // If data is still loading, display a loading message
  if (loading) {
    return <p className="high-scores-message">Loading high scores...</p>;
  }

  // If an error occurred during fetching, display an error message
  if (error) {
    return <p className="high-scores-message high-scores-error">Error loading high scores: {error}</p>;
  }

  // If fetching is complete, no error, but no high scores are available
  if (highScores.length === 0) {
    return <p className="high-scores-message">No high scores recorded yet. Be the first!</p>;
  }

  // If high scores are successfully fetched and available, render them
  return (
    <div className="high-scores-container">
      <h3>Top Scores</h3>
      <ol className="high-scores-list">
        {/* Map over the 'highScores' array to create a list item for each score */}
        {/* The backend already sorts and limits the scores (e.g., top 10) */}
        {highScores.map((scoreEntry, index) => (
          <li key={scoreEntry._id || index} className="high-score-item">
            {/* React needs a unique 'key' prop for list items.
                Using scoreEntry._id (from MongoDB) is ideal.
                Fallback to index if _id is somehow missing, though unlikely. */}
            <span className="rank">{index + 1}.</span>
            <span className="name">{scoreEntry.name}</span>
            <span className="score">{scoreEntry.score} pts</span>
            <span className="date">{formatDate(scoreEntry.date)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default HighScoresDisplay;