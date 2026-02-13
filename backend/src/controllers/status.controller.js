import mongoose from "mongoose";

// to check the status or health of the mongo DB
export const getStatus = (req, res) => {
  const dbState = mongoose.connection.readyState;

  let databaseStatus = "disconnected";

  if (dbState === 1) {
    databaseStatus = "connected";
  } else if (dbState === 2) {
    databaseStatus = "connecting";
  }

  res.status(200).json({
    backend: "okay",
    database: databaseStatus,
  });
};
