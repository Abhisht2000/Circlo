import app from "../backend/app.js";
import connectDB from "../backend/utils/db.js";

let databaseConnection;

export default async function handler(req, res) {
  databaseConnection ??= connectDB();
  await databaseConnection;
  return app(req, res);
}
