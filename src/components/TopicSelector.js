// src/components/TopicSelector.js

import React, { useState, useEffect } from 'react';
import './TopicSelector.css';

function TopicSelector({ onTopicSelect, currentSelectedTopic }) {
  const [topics, setTopics] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [errorTopics, setErrorTopics] = useState(null);

  useEffect(() => {
    console.log("TopicSelector: useEffect - Fetching topics...");
    setLoadingTopics(true);
    setErrorTopics(null);

    const fetchTopics = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
        const response = await fetch(`${API_BASE_URL}/api/topics`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch topics. Status: ${response.status} ${response.statusText}`);
        }
        
        const fetchedTopics = await response.json();
        console.log("TopicSelector: Topics fetched successfully:", fetchedTopics);
        setTopics(fetchedTopics);
      } catch (error) {
        console.error("TopicSelector: Error fetching topics:", error.message);
        setErrorTopics(error.message);
      } finally {
        setLoadingTopics(false);
        console.log("TopicSelector: Topics fetch sequence complete.");
      }
    };

    fetchTopics();
  }, []);

  if (loadingTopics) {
    return <p className="topic-selector-message">Loading topics...</p>;
  }

  if (errorTopics) {
    return <p className="topic-selector-message topic-selector-error">Error loading topics: {errorTopics}</p>;
  }

  if (topics.length === 0) {
    return <p className="topic-selector-message">No topics available at the moment.</p>;
  }

  return (
    <div className="topic-selector-container">
      <h3>Select a Quiz Topic:</h3>
      <div className="topic-buttons">
        <button
          key="all-topics"
          onClick={() => onTopicSelect(null)}
          className={`topic-button ${currentSelectedTopic === null ? 'active' : ''}`}
        >
          All Topics
        </button>

        {topics.map(topic => (
          <button
            key={topic}
            onClick={() => onTopicSelect(topic)}
            className={`topic-button ${currentSelectedTopic === topic ? 'active' : ''}`}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TopicSelector;