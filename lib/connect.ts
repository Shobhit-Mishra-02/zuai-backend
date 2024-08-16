import mongoose from "mongoose";

async function connect() {
  const mongodbUrl =
    process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/test";

  await mongoose.connect(mongodbUrl);
}

export default connect;
