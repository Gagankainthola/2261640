const express = require('express');
const app = express();
const shortenerRoutes = require('./routes/shortener.js');
const logger = require('./middleware/logger.js');//it uses the logger we made globally in the prere

app.use(express.json());


//log service
app.use(logger);


app.use('/', shortenerRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
