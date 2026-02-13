import dotenv from "dotenv";
import app from "./app.js"
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

// connecting the DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
