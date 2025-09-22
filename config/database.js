const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_URI);
    console.log(`Database Connected: ${connection.host}:${connection.port}`);
    console.log(`Connected on: ${connection.name}`);
  } catch (err) {
    console.error(`Database Error: ${err.message}`);
  }
};

module.exports = dbConnection;
