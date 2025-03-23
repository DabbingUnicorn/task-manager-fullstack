const express = require('express');     // imports the express framework to handle routing (API endpoints) 
const cors = require('cors');           // enables cross-origin requests - so your frontend can talk to this backend
const { default: mongoose } = require('mongoose');  // allows your server to connect to MongoDB and define schemas
require('dotenv').config();             // loads environment variables from a .env frile (e.g. your MongoDB URI)

const app = express();                  // creates an express app instance - this becomes your server
app.use(cors());                        // allows requests from your frontend (localhost) to access this backend (on a different port)
app.use(express.json());                // tells express to automatically parse JSON in incoming requests - very important for post and patch requests 

// connects to your MongoDB Atlas database using the URI stored in your .env file
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.error("DB connection error:", err));

// this defines what a task looks like in the db
const TaskSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});
const Task = mongoose.model('Task', TaskSchema);

// handles Get /tasks - fetches all tasks from the DB and return them as JSON
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// handles post /tasks - creates a new task using data from the requested by, saves it to MongoDB, and returns the new task
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
});

// handles delete /tasks/:id - deletes a task by its ID from the database.
// sends back a 204 response, meaning "Success, but no content"
app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(204); // No Content
  });

// handles patch /tasks/:id 
app.patch('/tasks/:id', async (req, res) => {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});
  

app.listen(3001, () => console.log("API running on port 3001"));
  
  








