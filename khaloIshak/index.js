const express = require("express");

const sequelize = require("./models/connection");

const userRouter = require("./routes/router");
const cors = require('cors');

const app = express();
const PORT = 4000;

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);


app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server is running on port " + PORT);
  } else {
    console.log("Error while starting the server : ", error);
  }
});
