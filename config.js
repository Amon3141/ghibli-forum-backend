const path = require('path');
const fs = require('fs');

/**
 * Environment variables management
 * .env - shared variables
 * .env.dev - development variables
 * .env.prod - production variables
 */

const NODE_ENV = process.env.NODE_ENV || 'development';

function loadEnvFile(filePath) {
  if (fs.existsSync(filePath)) {
    require('dotenv').config({ path: filePath });
    console.log(`> Loaded environment variables from: ${filePath}`);
  }
}

loadEnvFile(path.join(__dirname, '.env'));

if (NODE_ENV === 'production') {
  loadEnvFile(path.join(__dirname, '.env.prod'));
} else if (NODE_ENV === 'development') {
  loadEnvFile(path.join(__dirname, '.env.dev'));
}

const config = {
  NODE_ENV,
  PORT: process.env.PORT || 8080,
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL || 'https://ghibli-forum.vercel.app',
  AZURE_STORAGE_ACCOUNT_NAME: process.env.AZURE_STORAGE_ACCOUNT_NAME,
  AZURE_STORAGE_ACCOUNT_KEY: process.env.AZURE_STORAGE_ACCOUNT_KEY,
  AZURE_STORAGE_CONTAINER_NAME: process.env.AZURE_STORAGE_CONTAINER_NAME,
  BREVO_USER: process.env.BREVO_USER,
  BREVO_PASSWORD: process.env.BREVO_PASSWORD,
  BREVO_FROM_EMAIL: process.env.BREVO_FROM_EMAIL
};

module.exports = config;