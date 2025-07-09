// src/components/HighScoresDisplay.js

import React, { useState, useEffect } from 'react';
import './HighScoresDisplay.css';

function HighScoresDisplay() {
  const [highScores, setHighScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("HighScoresDisplay: useEffect - Attempting to fetch high scores...");
    setLoading(true);
    setError(null);

    const fetchHighScores = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
        const response = await fetch(`${API_BASE_URL}/api/highscores`);
        
        if (!response.ok) {
          let errorMessage = `Failed to fetch high scores. Status: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (e) {
            // ignore JSON parsing errors
          }
          throw new Error(errorMessage);
        }
        
        const fetchedScores = await response.json();
        setHighScores(fetchedScores);
      } catch (err) {
        console.error("HighScoresDisplay: Error fetching high scores:", err);
        setError(err.message || 'An unknown error occurred while loading high scores.');
        setHighScores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHighScores();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateString;
    }
  };

  if (loading) {
    return <p className="high-scores-message">Loading high scores...</p>;
  }

  if (error) {
    return <p className="high-scores-message high-scores-error">Error loading high scores: {error}</p>;
  }

  if (highScores.length === 0) {
    return <p className="high-scores-message">No high scores recorded yet. Be the first!</p>;
  }

  return (
    <div className="high-scores-container">
      <h3>Top Scores</h3>
      <ol className="high-scores-list">
        {highScores.map((scoreEntry, index) => (
          <li key={scoreEntry._id || index} className="high-score-item">
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