// src/components/TopicSelector.js

import React, { useState, useEffect } from 'react';
import './TopicSelector.css'; // We'll create this CSS file for basic styling

// The TopicSelector component receives two props:
// 1. onTopicSelect: A function passed from the parent component (App.js)
//    that will be called when a user clicks on a topic.
//    It will pass the selected topic name (string) or null (for 'All Topics') as an argument.
// 2. currentSelectedTopic: The currently active topic, so we can style it differently.
function TopicSelector({ onTopicSelect, currentSelectedTopic }) {
  // State for storing the list of topics fetched from the API
  const [topics, setTopics] = useState([]);
  // State for managing the loading status of the topics fetch operation
  const [loadingTopics, setLoadingTopics] = useState(true);
  // State for storing any error that occurs during topics fetching
  const [errorTopics, setErrorTopics] = useState(null);

  // useEffect hook to fetch topics when the component mounts
  useEffect(() => {
    console.log("TopicSelector: useEffect - Fetching topics...");
    setLoadingTopics(true); // Set loading to true at the start of the fetch
    setErrorTopics(null);   // Clear any previous errors

    // Fetch topics from the backend API endpoint /api/topics
    fetch('http://localhost:3006/api/topics')
      .then(response => {
        // Check if the HTTP response is successful (status code 200-299)
        if (!response.ok) {
          // If not okay, construct an error message and throw it
          throw new Error(`Failed to fetch topics. Status: ${response.status} ${response.statusText}`);
        }
        // If response is okay, parse the response body as JSON
        // response.json() returns a Promise that resolves with the parsed data
        return response.json();
      })
      .then(fetchedTopics => {
        // This .then() block executes when the JSON parsing is successful
        // 'fetchedTopics' will be the array of topic strings from your API
        console.log("TopicSelector: Topics fetched successfully:", fetchedTopics);
        setTopics(fetchedTopics); // Update the 'topics' state with the fetched data
      })
      .catch(error => {
        // This .catch() block executes if any error occurred in the fetch chain
        console.error("TopicSelector: Error fetching topics:", error.message);
        setErrorTopics(error.message); // Update the 'errorTopics' state
      })
      .finally(() => {
        // The .finally() block executes after the Promise settles (either resolved or rejected)
        // It's a good place to set loading to false
        setLoadingTopics(false);
        console.log("TopicSelector: Topics fetch sequence complete.");
      });
  }, []); // The empty dependency array [] ensures this effect runs only once when the component mounts

  // --- Rendering Logic ---

  // If topics are still loading, display a loading message
  if (loadingTopics) {
    return <p className="topic-selector-message">Loading topics...</p>;
  }

  // If there was an error fetching topics, display an error message
  if (errorTopics) {
    return <p className="topic-selector-message topic-selector-error">Error loading topics: {errorTopics}</p>;
  }

  // If topics loaded but the array is empty
  if (topics.length === 0) {
    return <p className="topic-selector-message">No topics available at the moment.</p>;
  }

  // If topics are loaded successfully, render the list of topic buttons
  return (
    <div className="topic-selector-container">
      <h3>Select a Quiz Topic:</h3>
      <div className="topic-buttons">
        {/* Button for "All Topics" - selecting this might mean no topic filter */}
        <button
          key="all-topics"
          onClick={() => onTopicSelect(null)} // Passing null for "All Topics"
          className={`topic-button ${currentSelectedTopic === null ? 'active' : ''}`}
        >
          All Topics
        </button>

        {/* Map over the fetched 'topics' array to create a button for each topic */}
        {topics.map(topic => (
          <button
            key={topic} // React needs a unique 'key' prop for list items
            onClick={() => onTopicSelect(topic)} // Call onTopicSelect with the topic name
            // Add 'active' class if this topic is the currently selected one
            className={`topic-button ${currentSelectedTopic === topic ? 'active' : ''}`}
          >
            {topic} {/* Display the topic name on the button */}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TopicSelector;