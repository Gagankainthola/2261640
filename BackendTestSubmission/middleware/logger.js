const jwt = require('jsonwebtoken');
const Log = require('../../loggingMiddleware/logging-service.js')

const PACKAGE = 'url-shortener';
const STACK = 'backend';
const JWT_SECRET = 'your-secret'; //i will keep it in env in production offcourse

async function logger(req, level, message) {
  try {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    await Log(STACK, level, PACKAGE, message, token);
  } catch (err) {
    console.error(`Logger error [${level}]: ${message} — ${err.message}`);
  }
}

module.exports = logger;
