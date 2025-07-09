// src/data/quizData.js

// This file holds an array of question objects for our quiz.
// Each object represents a single question with its ID, text, options, and correct answer.

const quizQuestions = [
  {
    id: 1, // Unique identifier for the first question
    question: "What does HTML stand for?", // The question text
    options: [ // An array of possible answer strings
      "Hyper Trainer Marking Language",
      "Hyper Text Marketing Language",
      "Hyper Text Markup Language",
      "Hyperlink and Text Markup Language"
    ],
    correctAnswer: "Hyper Text Markup Language" // The correct answer string
  },
  {
    id: 2, // Unique identifier for the second question
    question: "Which CSS property is used to change the text color of an element?",
    options: [
      "font-color",
      "text-color",
      "color",
      "font-style"
    ],
    correctAnswer: "color"
  },
  {
    id: 3, // Unique identifier for the third question
    question: "Which of the following is NOT a JavaScript primitive data type?",
    options: [
      "String",
      "Number",
      "Boolean",
      "Object" // Object is a complex data type, not primitive
    ],
    correctAnswer: "Object"
  },
  {
    id: 4, // Unique identifier for the fourth question
    question: "What is the primary purpose of React?",
    options: [
      "To manage databases",
      "To create server-side applications",
      "To build user interfaces",
      "To style web pages"
    ],
    correctAnswer: "To build user interfaces"
  },
  {
    id: 5, // Unique identifier for the fifth question
    question: "In React, what is used to pass data to a component from outside?",
    options: [
      "state",
      "props", // Props (short for properties) are used for this
      "render",
      "setState"
    ],
    correctAnswer: "props"
  }
  // You can add more questions here following the same structure!
];

// To make this 'quizQuestions' array available for use in other parts of our application
// (like in App.js to display the quiz), we need to export it.
// 'export default' is an ES6 module syntax that allows us to export a single value
// (in this case, our array of questions) from this file.
export default quizQuestions;