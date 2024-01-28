const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [
  { id: 1, task: "Buy groceries" },
  { id: 2, task: "Read a book" },
  { id: 3, task: "Exercise" },
];

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Get a specific todo by ID
app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((item) => item.id === id);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// Create a new todo
app.post("/todos", (req, res) => {
  const { task } = req.body;
  const newTodo = { id: todos.length + 1, task };
  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// Update a todo by ID
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { task } = req.body;
  const todo = todos.find((item) => item.id === id);

  if (todo) {
    todo.task = task;
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// Delete a todo by ID
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((item) => item.id !== id);

  res.json({ message: "Todo deleted successfully" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
