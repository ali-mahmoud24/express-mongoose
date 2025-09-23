const dotenv = require('dotenv');

const app = require('./app');
const dbConnection = require('./config/database');

dotenv.config();
const PORT = process.env.PORT || 3000;

(async () => {
  await dbConnection();

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
})();
