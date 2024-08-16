import app from "./app";
import connect from "./lib/connect";
import * as dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;

connect()
  .then(() => {
    app.listen(port, () => {
      console.log("The server is running of localhost:" + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
