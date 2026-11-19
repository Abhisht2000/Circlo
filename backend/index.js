import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import app from "./app.js";

dotenv.config({});

const PORT = process.env.PORT || 8000;
await connectDB();
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
