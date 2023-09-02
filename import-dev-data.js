require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");
const Tour = require("./models/tourModel");

const database = process.env.DATABASE.replace(
  "<password>",
  process.env.DBPASSWORD
);

mongoose
  .connect(database, {
    useNewUrlParser: true,
  })
  .then((con) => console.log("Database connection established"));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8")
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
