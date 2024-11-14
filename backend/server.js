import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB(); //connect to MongoDB
connectCloudinary(); //connect to Cloudinary

//middleware
app.use(express.json());
app.use(cors());

//API endpoints
app.use("/api/admin",adminRouter);
app.use("/api/doctor",doctorRouter);

app.get("/", (req, res) => {
  res.send("API Working good");
});

//running the app
app.listen(port, () => console.log("Server Started", port));
