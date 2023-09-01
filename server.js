require("dotenv").config();
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
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
