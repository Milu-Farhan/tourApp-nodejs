require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("uncaughtException! Shutting down...");
  process.exit(1);
});

const mongoose = require("mongoose");
const app = require("./app");

const database = process.env.DATABASE.replace(
  "<password>",
  process.env.DBPASSWORD
);

mongoose
  .connect(database, {
    useNewUrlParser: true,
  })
  .then((con) => console.log("Database connection established"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
