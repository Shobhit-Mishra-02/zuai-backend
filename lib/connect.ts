import mongoose from "mongoose";

async function connect() {
  let mongodbUrl =
    process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/zuaibackend";

  if (process.env.NODE_ENV === "test") {
    mongodbUrl = process.env.MONGODB_URL_TEST as string;
  }

  console.log("Connecting to MongoDB at", mongodbUrl);

  await mongoose.connect(mongodbUrl);
}

export default connect;
