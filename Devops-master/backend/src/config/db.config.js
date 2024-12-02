
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  local: {
    localUrlDatabse: process.env.DB_URI,
    //   secret: 'password',
  },
};