require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

/* ----- Route Imports ----- */
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const threadRoutes = require('./routes/threadRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');
const sasRoutes = require('./routes/sasRoutes');

const server = express();
server.use(express.json());
server.use(cookieParser());

/* ----- CORS Configuration ----- */
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        process.env.FRONTEND_URL || 'https://ghibli-forum.vercel.app',
        'https://your-frontend-domain.vercel.app' // Update this with your actual frontend URL
      ]
    : 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
};

server.use(cors(corsOptions));

/* ----- API Routes ----- */
server.use('/movies', movieRoutes);
server.use('/threads', threadRoutes);
server.use('/comments', commentRoutes);
server.use('/users', userRoutes);
server.use('/auth', authRoutes);
server.use('/sas', sasRoutes);

/* ----- Health Check Endpoint ----- */
server.get('/', (req, res) => {
  res.json({ 
    message: 'Ghibli Forum API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

/* ----- Error Handling Middleware ----- */
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

/* ----- Start Server ----- */
const port = process.env.PORT || 8080;
server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Backend server is running on http://localhost:${port}`);
});