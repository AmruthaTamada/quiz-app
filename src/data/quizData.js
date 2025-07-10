// src/data/quizData.js

// This file holds an array of question objects for our quiz.
// Each object represents a single question with its ID, text, options, correct answer, and topic.

const quizQuestions = [
  {
    id: 1,
    question: "Which HTML tag is used to define an unordered list?",
    options: ["<ul>", "<ol>", "<li>", "<list>"],
    correctAnswer: "<ul>",
    topic: "Web development"
  },
  {
    id: 2,
    question: "Which protocol is used to send emails?",
    options: ["SMTP", "HTTP", "FTP", "SNMP"],
    correctAnswer: "SMTP",
    topic: "Networks"
  },
  {
    id: 3,
    question: "Which sorting algorithm has the best average-case performance?",
    options: ["Merge Sort", "Bubble Sort", "Insertion Sort", "Selection Sort"],
    correctAnswer: "Merge Sort",
    topic: "Algorithms"
  },
  {
    id: 4,
    question: "Which library is used for deep learning in Python?",
    options: ["TensorFlow", "Pandas", "Flask", "Selenium"],
    correctAnswer: "TensorFlow",
    topic: "Machine Learning"
  },
  {
    id: 5,
    question: "Which keyword is used to define a class in Python?",
    options: ["function", "class", "def", "object"],
    correctAnswer: "class",
    topic: "Python"
  },
  {
    id: 6,
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Sequential Query Language", "Stylish Query Logic", "Simple Query List"],
    correctAnswer: "Structured Query Language",
    topic: "Databases"
  },
  {
    id: 7,
    question: "Which OS component schedules CPU usage?",
    options: ["Compiler", "Assembler", "Scheduler", "Dispatcher"],
    correctAnswer: "Scheduler",
    topic: "Operating Systems"
  },
  {
    id: 8,
    question: "Which data structure uses FIFO?",
    options: ["Stack", "Queue", "Heap", "Tree"],
    correctAnswer: "Queue",
    topic: "Data Structures"
  },
  {
    id: 9,
    question: "Which of these is a JavaScript framework?",
    options: ["Flask", "React", "Laravel", "Django"],
    correctAnswer: "React",
    topic: "Web development"
  },
  {
    id: 10,
    question: "Which function is used to get the length of a list in Python?",
    options: ["count()", "size()", "length()", "len()"],
    correctAnswer: "len()",
    topic: "Python"
  },
  {
    id: 11,
    question: "Which of these is a NoSQL database?",
    options: ["PostgreSQL", "Oracle", "MongoDB", "MySQL"],
    correctAnswer: "MongoDB",
    topic: "Databases"
  },
  {
    id: 12,
    question: "Which of the following is NOT an HTTP method?",
    options: ["GET", "PUT", "SEND", "DELETE"],
    correctAnswer: "SEND",
    topic: "Web development"
  },
  {
    id: 13,
    question: "Which of these algorithms is used for classification?",
    options: ["K-Means", "Naive Bayes", "Apriori", "DFS"],
    correctAnswer: "Naive Bayes",
    topic: "Machine Learning"
  },
  {
    id: 14,
    question: "Which file extension is used for Python files?",
    options: [".java", ".html", ".py", ".js"],
    correctAnswer: ".py",
    topic: "Python"
  },
  {
    id: 15,
    question: "What is the default port for MySQL?",
    options: ["3306", "8080", "1433", "5432"],
    correctAnswer: "3306",
    topic: "Databases"
  },
  {
    id: 16,
    question: "Which of the following is NOT a JavaScript primitive data type?",
    options: ["String", "Number", "Boolean", "Object"],
    correctAnswer: "Object",
    topic: "Web development"
  },
  {
    id: 17,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctAnswer: "O(log n)",
    topic: "Data Structures"
  },
  {
    id: 18,
    question: "Which symbol is used for comments in Python?",
    options: ["//", "/*", "#", "--"],
    correctAnswer: "#",
    topic: "Python"
  },
  {
    id: 19,
    question: "What does ACID stand for in databases?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Access, Control, Integrity, Durability",
      "Atomicity, Concurrency, Isolation, Dependency",
      "Access, Consistency, Indexing, Durability"
    ],
    correctAnswer: "Atomicity, Consistency, Isolation, Durability",
    topic: "Databases"
  },
  {
    id: 20,
    question: "Which scheduling algorithm gives the minimum average waiting time?",
    options: ["FCFS", "Shortest Job First", "Round Robin", "Priority Scheduling"],
    correctAnswer: "Shortest Job First",
    topic: "Operating Systems"
  },
  {
    id: 21,
    question: "What is overfitting in machine learning?",
    options: [
      "Model performs well on new data but poorly on training data",
      "Model performs well on training data but poorly on new data",
      "Model cannot train at all",
      "Model is perfectly balanced"
    ],
    correctAnswer: "Model performs well on training data but poorly on new data",
    topic: "Machine Learning"
  },
  {
    id: 22,
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheet",
      "Creative Style System",
      "Control Style Syntax"
    ],
    correctAnswer: "Cascading Style Sheets",
    topic: "Web development"
  },
  {
    id: 23,
    question: "Which method can be used to insert a node in a binary tree?",
    options: ["InsertNode()", "Add()", "put()", "None of these"],
    correctAnswer: "InsertNode()",
    topic: "Data Structures"
  },
  {
    id: 24,
    question: "Which Python library is used for data manipulation?",
    options: ["TensorFlow", "NumPy", "Keras", "Pandas"],
    correctAnswer: "Pandas",
    topic: "Python"
  },
  {
    id: 25,
    question: "What is the primary purpose of React?",
    options: [
      "To manage databases",
      "To create server-side applications",
      "To build user interfaces",
      "To style web pages"
    ],
    correctAnswer: "To build user interfaces",
    topic: "Web development"
  },
  {
    id: 26,
    question: "Which data structure is used in recursion?",
    options: ["Queue", "Array", "Stack", "Tree"],
    correctAnswer: "Stack",
    topic: "Data Structures"
  },
  {
    id: 27,
    question: "Which method is used to start a thread in Java?",
    options: ["run()", "init()", "start()", "begin()"],
    correctAnswer: "start()",
    topic: "Java"
  },
  {
    id: 28,
    question: "Which of these is a Python web framework?",
    options: ["Flask", "React", "Laravel", "Spring"],
    correctAnswer: "Flask",
    topic: "Python"
  },
  {
    id: 29,
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Core Power Unit", "Control Panel Utility", "Compute Process Unit"],
    correctAnswer: "Central Processing Unit",
    topic: "Operating Systems"
  },
  {
    id: 30,
    question: "Which of the following is a supervised learning algorithm?",
    options: ["K-Means", "Apriori", "Decision Tree", "PCA"],
    correctAnswer: "Decision Tree",
    topic: "Machine Learning"
  },
  {
    id: 31,
    question: "Which of the following is used for version control?",
    options: ["Git", "Node.js", "Docker", "Jenkins"],
    correctAnswer: "Git",
    topic: "Web development"
  },
  {
    id: 32,
    question: "What is the output of 3 ** 2 in Python?",
    options: ["6", "9", "8", "Error"],
    correctAnswer: "9",
    topic: "Python"
  },
  {
    id: 33,
    question: "Which command is used to initialize a new Git repository?",
    options: ["git start", "git init", "git new", "git create"],
    correctAnswer: "git init",
    topic: "Web development"
  },
  {
    id: 34,
    question: "Which of these is a frontend framework?",
    options: ["Django", "Express", "Angular", "Spring"],
    correctAnswer: "Angular",
    topic: "Web development"
  },
  {
    id: 35,
    question: "Which SQL clause is used to sort data?",
    options: ["ORDER BY", "GROUP BY", "SORT", "ARRANGE BY"],
    correctAnswer: "ORDER BY",
    topic: "Databases"
  },
  {
    id: 36,
    question: "Which machine learning technique is used for dimensionality reduction?",
    options: ["SVM", "PCA", "KNN", "Logistic Regression"],
    correctAnswer: "PCA",
    topic: "Machine Learning"
  },
  {
    id: 37,
    question: "Which part of the OS manages memory?",
    options: ["Shell", "Compiler", "Memory Manager", "File System"],
    correctAnswer: "Memory Manager",
    topic: "Operating Systems"
  },
  {
    id: 38,
    question: "Which method is used to add an element at the end of a list in Python?",
    options: ["insert()", "append()", "add()", "push()"],
    correctAnswer: "append()",
    topic: "Python"
  },
  {
    id: 39,
    question: "Which component renders views in React?",
    options: ["Controller", "Service", "Component", "Model"],
    correctAnswer: "Component",
    topic: "Web development"
  },
  {
    id: 40,
    question: "Which of the following best describes normalization?",
    options: ["Organizing data to reduce redundancy", "Increasing storage", "Encrypting data", "Deleting unnecessary files"],
    correctAnswer: "Organizing data to reduce redundancy",
    topic: "Databases"
  },
  {
    id: 41,
    question: "What is the full form of GUI?",
    options: ["Graphic User Interface", "General User Interface", "Graphical User Interface", "Great User Interaction"],
    correctAnswer: "Graphical User Interface",
    topic: "Operating Systems"
  },
  {
    id: 42,
    question: "Which Python function returns the data type of a variable?",
    options: ["typeof()", "type()", "datatype()", "class()"],
    correctAnswer: "type()",
    topic: "Python"
  },
  {
    id: 43,
    question: "Which method is used to combine two arrays in JavaScript?",
    options: ["merge()", "concat()", "combine()", "join()"],
    correctAnswer: "concat()",
    topic: "Web development"
  },
  {
    id: 44,
    question: "Which one is a relational database?",
    options: ["MongoDB", "Redis", "Cassandra", "PostgreSQL"],
    correctAnswer: "PostgreSQL",
    topic: "Databases"
  },
  {
    id: 45,
    question: "Which of the following is used for containerization?",
    options: ["Git", "Docker", "Jenkins", "Nginx"],
    correctAnswer: "Docker",
    topic: "DevOps"
  },
  {
    id: 46,
    question: "Which sorting algorithm is the fastest in most cases?",
    options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Merge Sort"],
    correctAnswer: "Quick Sort",
    topic: "Algorithms"
  },
  {
    id: 47,
    question: "Which HTTP status code means 'Not Found'?",
    options: ["200", "301", "404", "500"],
    correctAnswer: "404",
    topic: "Web development"
  },
  {
    id: 48,
    question: "Which operator is used for logical AND in Python?",
    options: ["&", "&&", "and", "AND"],
    correctAnswer: "and",
    topic: "Python"
  },
  {
    id: 49,
    question: "Which command is used to install a package in Node.js?",
    options: ["node install", "npm install", "install package", "npm get"],
    correctAnswer: "npm install",
    topic: "Web development"
  },
  {
    id: 50,
    question: "Which property is used to change text color in CSS?",
    options: ["font-color", "text-color", "color", "style-color"],
    correctAnswer: "color",
    topic: "Web development"
  }
];

// Exporting for use in other components
export default quizQuestions;
