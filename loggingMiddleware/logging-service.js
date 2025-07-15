  const axios = require('axios');

  const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';

  async function Log(stack, level, package, message, authToken) {
    // Input validation
    const allowedStacks = ['backend', 'frontend'];
    const allowedLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
    
    if (!allowedStacks.includes(stack)) {
      throw new Error(`Invalid stack. Allowed values: ${allowedStacks.join(', ')}`);
    }

    if (!allowedLevels.includes(level)) {
      throw new Error(`Invalid level. Allowed values: ${allowedLevels.join(', ')}`);
    }

    try {
      const response = await axios.post(
        LOG_API_URL,
        { stack, level, package, message },
        {
          headers: {
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJnYWdhbnN1cDIwMDNAZ21haWwuY29tIiwiZXhwIjoxNzUyNTU5MTQ4LCJpYXQiOjE3NTI1NTgyNDgsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI2N2Y1Mzc0Ni1mMjczLTQ3YjEtOGM2Mi1lZTAxMzc3YzA5MjEiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJnYWdhbiBrYWludGhvbGEiLCJzdWIiOiI0Zjc2NjU5Mi0yZjExLTRiZjMtYTI4OC0yZjg2ZDlmZWYxNzkifSwiZW1haWwiOiJnYWdhbnN1cDIwMDNAZ21haWwuY29tIiwibmFtZSI6ImdhZ2FuIGthaW50aG9sYSIsInJvbGxObyI6IjIyNjE2NDAiLCJhY2Nlc3NDb2RlIjoiUUFoRFVyIiwiY2xpZW50SUQiOiI0Zjc2NjU5Mi0yZjExLTRiZjMtYTI4OC0yZjg2ZDlmZWYxNzkiLCJjbGllbnRTZWNyZXQiOiJnZGVUdU53a2NHYUtGZlZ4In0.UMlOEHtJYM_8pLeLd38As81OSkPUmAf8AHgskDvFOIE"}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Logging failed:', error.response?.data || error.message);
      throw error;
    }
  }

  module.exports = Log;