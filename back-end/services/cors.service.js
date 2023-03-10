require("dotenv").config();
module.exports = {
  corsOptions: {
    credentials: true,
    origin: [process.env.CLIENT_URL, process.env.SERVER_URL],
  },
};
