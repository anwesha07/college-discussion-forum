const mongoose = require('mongoose');

const startDb = () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.log('FATAL ERROR: MONGO_URI not defined in env');
    process.exit(1);
  }

  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.error('Could not connect to mongoDB'));
};

module.exports = startDb;
