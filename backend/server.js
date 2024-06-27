const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb+srv://Sandiematt:asdf123@todolist.s6lxawf.mongodb.net/';

MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db('todolist');
    const tasksCollection = db.collection('tasks');
    const usersCollection = db.collection('users');

    app.use(express.json());

    app.post('/tasks', async (req, res) => {
      try {
        const task = req.body;
        const result = await tasksCollection.insertOne(task);
        console.log('Insertion Result:', result);
        res.status(201).json({ message: 'Task created successfully' });
      } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.post('/login', async (req, res) => {
      try { 
        const { username, password } = req.body;
        console.log({ username, password });
        const filter = { username: username };
        const user = await usersCollection.findOne(filter);
        console.log(user);

        if (!user) {
          return res.status(401).json({ error: 'User not found' });
        }

        if (user.password.toString() !== password) {
          return res.status(401).json({ error: 'Incorrect Password' });
        } else {
          res.status(200).json({ message: 'Login successful' });
        }

      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.post('/register', async (req, res) => {
      try {
        const { username, password } = req.body;
        const result = await usersCollection.insertOne({ username, password });
        console.log('Insertion Result:', result);
        res.status(201).json({ message: 'Registration successful' });
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.delete('/tasks', async (req, res) => {
      try {
        const { task } = req.body;
        await tasksCollection.deleteOne({ task });
        res.status(204).end();
      } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
