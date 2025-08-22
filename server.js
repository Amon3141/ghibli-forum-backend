const config = require('./config');
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
  origin: function (origin, callback) {
    console.log('Request origin:', origin);
    
    const allowedOrigins = config.NODE_ENV === 'production' 
      ? [config.FRONTEND_URL, 'http://localhost:3000']
      : ['http://localhost:3000'];
    
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Origin not allowed:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  preflightContinue: false,
  optionsSuccessStatus: 204
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
    environment: config.NODE_ENV
  });
});

/* ----- Error Handling Middleware ----- */
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

/* ----- Start Server ----- */
const port = config.PORT;
const baseUrl = config.NODE_ENV === 'production' ? 'ghibli-forum-backend-production.up.railway.app' : `http://localhost:${port}`;
server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Backend server is running on ${baseUrl}`);
});