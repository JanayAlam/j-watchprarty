// reading environmental variables
require('dotenv').config();

const http = require('http');
const app = require('./app');

const connectDB = require('./api/database/connection');

const init = async (appInstance) => {
  // the port number
  const PORT = process.env.PORT || 8080;
  // creating server instance from the app
  const server = http.createServer(appInstance);
  try {
    // connecting to the mongodb database
    await connectDB();
    console.log('Database connected. The application will be running soon...');
    // listen the server
    await server.listen(PORT);
    console.log(`Server listening on the port ${PORT}`);
  } catch (e) {
    console.log(e.message || 'Something went wrong');
  }
};

init(app);
