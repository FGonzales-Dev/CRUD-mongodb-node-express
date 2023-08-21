require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/task');

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

const conn_str = 'mongodb+srv://francisgonzalesprivate:BQB9Q4ciiiEPoquX@cluster0.logmotq.mongodb.net/?retryWrites=true&w=majority'
// Connect to MongoDB Atlas
mongoose.connect(conn_str, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// routes
app.use('/api/tasks', taskRoutes)

// listen for requests
app.listen(process.env.PORT, () => {
  console.log('Listening in port', process.env.PORT)
})