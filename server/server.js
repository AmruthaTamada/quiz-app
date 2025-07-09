// // server/server.js
// require('dotenv').config();

// // 1. Require necessary modules
// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');
// const mongoose = require('mongoose'); // Require Mongoose (installed in the previous task)

// const HighScore = require('./models/HighScore');
// // HighScore model is imported to handle high scores in the future.

// // 2. Create an instance of an Express application
// const app = express();

// // --- Port Definition (Crucial for app.listen) ---
// // 3. Define the port number for the server
// //    process.env.PORT allows the port to be set by the hosting environment (e.g., Heroku, Render).
// //    If not set, it defaults to 3001 for local development.
// const PORT = process.env.PORT || 5000;
// // --- End of Port Definition ---

// // 4. Enable CORS middleware
// app.use(cors());
// app.use(express.json());

// const MONGODB_URI = process.env.MONGODB_URI;

// // Check if the MongoDB URI is provided
// if (!MONGODB_URI) {
//   console.error('Error: MONGODB_URI is not defined. Please set it in your .env file.');
//   process.exit(1); // Exit the process if URI is not found
// }
// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     console.log('✅ Successfully connected to MongoDB Atlas!');
//   })
//   .catch(error => {
//     console.error('❌ Error connecting to MongoDB Atlas:', error.message);
    
//   });

// // Mongoose connection event listeners
// // These listeners provide feedback on the state of the database connection.
// const dbConnection = mongoose.connection;

// // 'error' event is emitted if an error occurs after the initial connection was established
// dbConnection.on('error', (err) => {
//   console.error('❌ MongoDB connection error after initial connection:', err.message);
// });

// // 'disconnected' event is emitted when Mongoose loses connection to MongoDB
// dbConnection.on('disconnected', () => {
//   console.log('MongoDB disconnected.');
// });

// // 'reconnected' event is emitted when Mongoose successfully reconnects
// dbConnection.on('reconnected', () => {
//   console.log('MongoDB reconnected.');
// });

// // Gracefully close the Mongoose connection when the Node.js process is terminated (e.g., by Ctrl+C)
// process.on('SIGINT', async () => {
//   console.log('SIGINT received. Closing MongoDB connection...');
//   try {
//     await mongoose.connection.close();
//     console.log('MongoDB connection closed successfully due to app termination.');
//     process.exit(0);
//   } catch (error) {
//     console.error('Error closing MongoDB connection during app termination:', error);
//     process.exit(1);
//   }
// });
// // --- End of MongoDB Connection ---




// // --- Reading Quiz Data from JSON File ---
// let quizData = [];
// let availableTopics = []; // This will hold unique topic names

// try {
//   const dataFilePath = path.join(__dirname, 'quizData.json');
//   const fileContentString = fs.readFileSync(dataFilePath, 'utf-8');
//   const allQuestions = JSON.parse(fileContentString); // Parse all questions

// //   quizData = JSON.parse(fileContentString);
// //   console.log('Successfully loaded quiz data from quizData.json.');
// // } catch (error) {
// //   console.error('Error loading quiz data from quizData.json:', error.message);
// //   // quizData remains an empty array.
// // }
// // // --- End of Reading Quiz Data ---

// if (Array.isArray(allQuestions)) {
//     quizData = allQuestions; // Store all questions

//     // Extract unique topics
//     // A Set is used to automatically handle uniqueness.
//     const topicsSet = new Set();
//     allQuestions.forEach(question => {
//       if (question.topic && typeof question.topic === 'string') {
//         topicsSet.add(question.topic);
//       }
//     });
//     availableTopics = Array.from(topicsSet); // Convert Set to Array

//     console.log(`Successfully loaded ${quizData.length} questions from quizData.json.`);
//     console.log(`Available topics: ${availableTopics.join(', ')}`);
//   } else {
//     // Handle the case where quizData.json does not contain an array
//     console.error('Error: quizData.json does not contain a valid array of questions.');
//     // quizData will remain an empty array
//     // availableTopics will remain an empty array
//   }

// } catch (error) {
//   console.error('Error loading or parsing quiz data from quizData.json:', error.message);
//   console.error(
//     'Please ensure that quizData.json exists in the server directory, is valid JSON, and contains an array of questions.'
//   );
//   // quizData and availableTopics will remain empty arrays if loading fails.
// }



// // 5. Define API Routes
// app.get('/', (req, res) => {
//   const dataStatus = quizData.length > 0 ? `Quiz data loaded (${quizData.length} questions).` : 'Quiz data failed to load or is empty.';
//   const topicsStatus = availableTopics.length > 0 ? `Topics identified: ${availableTopics.join(', ')}.` : 'No topics identified.';

//   res.send(`Hello from your Interactive Quiz API Server! CORS is enabled. ${dataStatus} ${topicsStatus}`);
// });


// app.get('/api/questions', (req, res) => {
//   // req.query is an object containing the query string parameters.
//   // e.g., for /api/questions?topic=Geography, req.query would be { topic: 'Geography' }
//   const requestedTopic = req.query.topic;

//   let questionsToReturn = quizData; // Default to all questions

//   if (requestedTopic) {
//     // If a topic is specified in the query string, filter the questions.
//     // The .filter() method creates a new array with all elements that pass the test
//     // implemented by the provided function.
//     questionsToReturn = quizData.filter(
//       // For each question, check if its 'topic' property (case-sensitive)
//       // matches the requestedTopic.
//       question => question.topic === requestedTopic
//     );
//     console.log(`Filtering questions for topic: "${requestedTopic}". Found ${questionsToReturn.length} questions.`);
//   } else {
//     console.log(`No topic specified, returning all ${questionsToReturn.length} questions.`);
//   }

//   // Send the (potentially filtered) array of questions as a JSON response.
//   res.json(questionsToReturn);
//   console.log(`Sent ${questionsToReturn.length} questions in response to GET /api/questions (Topic: ${requestedTopic || 'All'})`);
// });
// // --- End of /api/questions route ---

// // --- New GET route for /api/topics ---
// // This endpoint returns a list of all unique topic names available.
// app.get('/api/topics', (req, res) => {
//   // 'availableTopics' was populated when the server started by reading quizData.json.
//   res.json(availableTopics);
//   console.log(`Sent ${availableTopics.length} topics in response to GET /api/topics: [${availableTopics.join(', ')}]`);
// });

// // --- New GET route for /api/highscores ---
// // This endpoint retrieves high scores from the database.
// // It sorts them by score in descending order and limits the result to the top 10.
// app.get('/api/highscores', async (req, res) => {
//   console.log('GET /api/highscores: Received request to fetch high scores.');
//   console.log('➡️ /api/highscores endpoint hit');

//   try {
//     // Use the HighScore model to interact with the database.
//     // .find({}) - retrieves all documents from the 'highscores' collection.
//     // .sort({ score: -1 }) - sorts the documents by the 'score' field in descending order (highest first).
//     // .limit(10) - limits the number of returned documents to 10.
//     // .select('name score date') - selects only the 'name', 'score', and 'date' fields to be returned.
//     //   This helps to keep the response payload lean and avoid sending unnecessary data like __v or updatedAt.
//     //   The 'date' field here refers to the field defined in your highScoreSchema (defaulting to Date.now).
//     const highScores = await HighScore.find({})
//                                       .sort({ score: -1 })
//                                       .limit(10)
//                                       .select('name score date'); // Select specific fields

//     // Log the fetched scores for debugging on the server side.
//     console.log(`GET /api/highscores: Found ${highScores.length} high scores.`);
    
//     // Send the array of high scores as a JSON response.
//     // If no scores are found, an empty array [] will be sent, which is appropriate.
//     res.json(highScores);

//   } catch (error) {
//     // If an error occurs during the database query or processing:
//     console.error('GET /api/highscores: Error fetching high scores:', error.message);
//     // Send a 500 Internal Server Error status code and a JSON error message.
//     res.status(500).json({ message: 'Failed to retrieve high scores. Please try again later.' });
//   }
// });
// // --- End of /api/highscores GET route ---
// // --- New POST route for /api/highscores ---
// // This endpoint creates a new high score record in the database.
// app.post('/api/highscores', async (req, res) => {
//   console.log('POST /api/highscores: Received request to create a new high score.');
//   console.log('Request body:', req.body); // Log the received body for debugging

//   try {
//     // 1. Extract name and score from the request body
//     // Thanks to app.use(express.json()), req.body contains the parsed JSON data.
//     const { name, score } = req.body;

//     // 2. Basic Input Validation
//     // Check if name and score are provided.
//     if (!name || typeof score !== 'number') {
//       console.warn('POST /api/highscores: Validation failed - Name and score are required, and score must be a number.');
//       // 400 Bad Request: The server cannot or will not process the request due to something
//       // that is perceived to be a client error (e.g., malformed request syntax,
//       // invalid request message framing, or deceptive request routing).
//       return res.status(400).json({ message: 'Name and score are required. Score must be a number.' });
//     }

//     // Further validation (like name length, score range) is handled by the Mongoose schema.

//     // 3. Create a new HighScore document
//     // We can use HighScore.create() which is a shorthand for `new HighScore(...).save()`.
//     // Mongoose will automatically apply default values (like for 'date') and timestamps if configured in the schema.
//     const newHighScore = await HighScore.create({
//       name: name,  // or just `name` if key and variable are the same
//       score: score // or just `score`
//     });

//     // Log the newly created high score for debugging on the server side.
//     console.log('POST /api/highscores: New high score saved successfully:', newHighScore);

//     // 4. Send a Success Response
//     // 201 Created: The request has been fulfilled and has resulted in one or more new resources being created.
//     // It's common practice to send back the newly created resource in the response body.
//     res.status(201).json(newHighScore);

//   } catch (error) {
//     // Handle potential errors
//     console.error('POST /api/highscores: Error saving new high score:', error.message);

//     // Check if the error is a Mongoose validation error
//     if (error.name === 'ValidationError') {
//       // Mongoose validation errors (e.g., 'name' is required as per schema, or maxlength exceeded)
//       // Extract meaningful error messages from error.errors
//       const messages = Object.values(error.errors).map(val => val.message);
//       return res.status(400).json({ message: 'Validation Error', errors: messages });
//     }

//     // For other types of errors (e.g., database connection issue during save)
//     res.status(500).json({ message: 'Failed to save high score. Please try again later.' });
//   }
// });
// // --- End of /api/highscores POST route ---

// // --- This is the current task's focus ---
// // 6. Start the server and make it listen on the specified port
// // The app.listen() method binds and listens for connections on the specified host (implicitly localhost here) and port.
// // This is what makes your Express application accessible as an HTTP server.
// app.listen(PORT, () => {
//   // This callback function is executed once the server has successfully started
//   // and is ready to accept connections. It's a common place to log
//   // a confirmation message to the console.
//   console.log(`🎉 Quiz API server is up and running on http://localhost:${PORT}`);
//   console.log('CORS middleware has been enabled.');
//   if (quizData.length > 0) {
//     console.log(`Successfully parsed ${quizData.length} questions from quizData.json.`);
//   if (availableTopics.length > 0) {
//     console.log(`Identified topics: ${availableTopics.join(', ')}`);
//   } else {
//     console.warn('No topics were identified from the quiz data. Ensure questions have a "topic" field.');
//   } } 
//   else {
//     console.warn(
//       'Quiz data is empty. This might be due to an error during loading or an empty quizData.json file.'
//     );
//   }
//   console.log('The server is now ready to serve API requests.');
//   // console.log('Available API endpoints:');
//   // console.log(`  GET http://localhost:${PORT}/api/questions - Fetches all quiz questions.`);
//   // console.log(`  GET http://localhost:${PORT}/api/questions?topic=<topicName> - Fetches questions for a specific topic.`);
//   // console.log(`  GET http://localhost:${PORT}/api/topics - Fetches a list of available topics.`);
//   // console.log(`  GET http://localhost:${PORT}/ - Test route`);

// });
// // --- End of current task's focus ---
// process.on('SIGINT', async () => {
//   console.log('SIGINT received. Closing MongoDB connection...');
//   try {
//     await mongoose.connection.close();
//     console.log('MongoDB connection closed successfully due to app termination.');
//     process.exit(0);
//   } catch (error) {
//     console.error('Error closing MongoDB connection during app termination:', error);
//     process.exit(1);
//   }
// });





// server/server.js
require('dotenv').config();

// 1. Require necessary modules
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const HighScore = require('./models/HighScore');

const app = express();

const PORT = process.env.PORT || 5000;

// --- CORS Configuration ---
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200
};

if (!process.env.CORS_ORIGIN) {
  console.warn("CORS_ORIGIN environment variable not set. CORS might not be configured for production.");
}

app.use(cors(corsOptions));
app.use(express.json());
// --- End CORS Configuration ---

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined. Please set it in your .env file.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas!');
  })
  .catch(error => {
    console.error('❌ Error connecting to MongoDB Atlas:', error.message);
  });

const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => {
  console.error('❌ MongoDB connection error after initial connection:', err.message);
});
dbConnection.on('disconnected', () => {
  console.log('MongoDB disconnected.');
});
dbConnection.on('reconnected', () => {
  console.log('MongoDB reconnected.');
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Closing MongoDB connection...');
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed successfully due to app termination.');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection during app termination:', error);
    process.exit(1);
  }
});

// --- Reading Quiz Data from JSON File ---
let quizData = [];
let availableTopics = [];

try {
  const dataFilePath = path.join(__dirname, 'quizData.json');
  const fileContentString = fs.readFileSync(dataFilePath, 'utf-8');
  const allQuestions = JSON.parse(fileContentString);

  if (Array.isArray(allQuestions)) {
    quizData = allQuestions;
    const topicsSet = new Set();
    allQuestions.forEach(question => {
      if (question.topic && typeof question.topic === 'string') {
        topicsSet.add(question.topic);
      }
    });
    availableTopics = Array.from(topicsSet);

    console.log(`Successfully loaded ${quizData.length} questions from quizData.json.`);
    console.log(`Available topics: ${availableTopics.join(', ')}`);
  } else {
    console.error('Error: quizData.json does not contain a valid array of questions.');
  }

} catch (error) {
  console.error('Error loading or parsing quiz data from quizData.json:', error.message);
  console.error('Please ensure that quizData.json exists in the server directory, is valid JSON, and contains an array of questions.');
}

// 5. Define API Routes
app.get('/', (req, res) => {
  const dataStatus = quizData.length > 0 ? `Quiz data loaded (${quizData.length} questions).` : 'Quiz data failed to load or is empty.';
  const topicsStatus = availableTopics.length > 0 ? `Topics identified: ${availableTopics.join(', ')}.` : 'No topics identified.';
  res.send(`Hello from your Interactive Quiz API Server! CORS is enabled. ${dataStatus} ${topicsStatus}`);
});

app.get('/api/questions', (req, res) => {
  const requestedTopic = req.query.topic;
  let questionsToReturn = quizData;

  if (requestedTopic) {
    questionsToReturn = quizData.filter(question => question.topic === requestedTopic);
    console.log(`Filtering questions for topic: "${requestedTopic}". Found ${questionsToReturn.length} questions.`);
  } else {
    console.log(`No topic specified, returning all ${questionsToReturn.length} questions.`);
  }

  res.json(questionsToReturn);
  console.log(`Sent ${questionsToReturn.length} questions in response to GET /api/questions (Topic: ${requestedTopic || 'All'})`);
});

app.get('/api/topics', (req, res) => {
  res.json(availableTopics);
  console.log(`Sent ${availableTopics.length} topics in response to GET /api/topics: [${availableTopics.join(', ')}]`);
});

app.get('/api/highscores', async (req, res) => {
  console.log('GET /api/highscores: Received request to fetch high scores.');

  try {
    const highScores = await HighScore.find({})
      .sort({ score: -1 })
      .limit(10)
      .select('name score date');

    console.log(`GET /api/highscores: Found ${highScores.length} high scores.`);
    res.json(highScores);
  } catch (error) {
    console.error('GET /api/highscores: Error fetching high scores:', error.message);
    res.status(500).json({ message: 'Failed to retrieve high scores. Please try again later.' });
  }
});

app.post('/api/highscores', async (req, res) => {
  console.log('POST /api/highscores: Received request to create a new high score.');
  console.log('Request body:', req.body);

  try {
    const { name, score } = req.body;

    if (!name || typeof score !== 'number') {
      console.warn('POST /api/highscores: Validation failed - Name and score are required, and score must be a number.');
      return res.status(400).json({ message: 'Name and score are required. Score must be a number.' });
    }

    const newHighScore = await HighScore.create({ name, score });
    console.log('POST /api/highscores: New high score saved successfully:', newHighScore);
    res.status(201).json(newHighScore);
  } catch (error) {
    console.error('POST /api/highscores: Error saving new high score:', error.message);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Validation Error', errors: messages });
    }
    res.status(500).json({ message: 'Failed to save high score. Please try again later.' });
  }
});

// 6. Start the server
app.listen(PORT, () => {
  console.log(`🎉 Quiz API server is up and running on http://localhost:${PORT}`);
  console.log('CORS middleware has been enabled.');
  if (quizData.length > 0) {
    console.log(`Successfully parsed ${quizData.length} questions from quizData.json.`);
    if (availableTopics.length > 0) {
      console.log(`Identified topics: ${availableTopics.join(', ')}`);
    } else {
      console.warn('No topics were identified from the quiz data. Ensure questions have a "topic" field.');
    }
  } else {
    console.warn('Quiz data is empty. This might be due to an error during loading or an empty quizData.json file.');
  }
  console.log('The server is now ready to serve API requests.');
});
