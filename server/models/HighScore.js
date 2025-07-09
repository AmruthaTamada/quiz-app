// server/models/HighScore.js

// 1. Import Mongoose
// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
// It provides a schema-based solution to model your application data.
const mongoose = require('mongoose');

// 2. Define the Schema
// A Mongoose Schema defines the structure of the document, default values, validators, etc.
// For our HighScore, we want to store the player's name, their score, and the date they achieved it.
const highScoreSchema = new mongoose.Schema({
  // 'name' field:
  name: {
    type: String,       // The data type is String.
    required: true,     // This field is mandatory. An error will occur if a document is saved without it.
    trim: true,         // Automatically removes leading/trailing whitespace from the name.
    maxlength: 50       // Optional: Enforce a maximum length for the name.
  },
  // 'score' field:
  score: {
    type: Number,       // The data type is Number.
    required: true,     // This field is mandatory.
    min: 0              // Optional: Enforce a minimum value for the score (e.g., scores can't be negative).
  },
  // 'date' field:
  date: {
    type: Date,         // The data type is Date.
    default: Date.now   // Sets a default value to the current date and time when a new high score document is created.
                        // If a date is not provided upon creation, this default will be used.
  }
  // You can add more fields later if needed, e.g., 'topic' if scores are per topic.
}, {
  // Schema Options (optional)
  timestamps: true      // This option automatically adds 'createdAt' and 'updatedAt' fields (both of type Date)
                        // to your schema. 'createdAt' stores when the document was created, and
                        // 'updatedAt' stores when it was last updated.
                        // While we have a 'date' field for when the score was achieved,
                        // 'createdAt' can be useful for auditing or internal tracking.
                        // If your 'date' field sufficiently covers this, you might omit 'timestamps: true'.
                        // For this example, let's include it to see its effect.
});

// 3. Compile the Schema into a Model
// A Mongoose Model is a constructor compiled from a Schema definition.
// An instance of a model is called a document. Models are responsible for creating and reading documents from MongoDB.
// The first argument to mongoose.model() is the singular name of the collection your model is for.
// Mongoose automatically looks for the plural, lowercased version of your model name.
// Thus, for a model named 'HighScore', Mongoose will target a collection named 'highscores' in MongoDB.
const HighScore = mongoose.model('HighScore', highScoreSchema);

// 4. Export the Model
// This makes the HighScore model available for use in other parts of your application,
// particularly in your server.js file where you'll define API routes for handling high scores.
module.exports = HighScore;