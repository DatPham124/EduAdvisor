const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config({ path: "config.env" });

// Modify the path to your model file as needed
const model = require("./app/models/dualMajor.model.js");
const file = "data/dualMajor.data.json";

async function importFromFile() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const existingCount = await model.countDocuments();
    if (existingCount > 0) {
      console.log(
        `Database already contains ${existingCount} records. Aborting import.`
      );
      return;
    }

    const rawData = fs.readFileSync(file, "utf8");
    const data = JSON.parse(rawData);

    await model.insertMany(data);
    console.log(`Imported ${data.length} records from ${file}`);
  } catch (err) {
    console.error("Import error:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

importFromFile();
