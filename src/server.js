import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "../src/config/db.js";
import userRoutes from "../src/routes/user.routes.js";
import taskRoutes from "../src/routes/task.routes.js";
import healthCheckRoutes from "../src/routes/healthCheck.js";
import "dotenv/config";

//* Initialize app
const app = express();

//* Connect to database
connectDB()
  .then(() => {
    console.log("Server ready to receive requests");
  })
  .catch((error) => {
    console.error(`Connection error to MongoDB: ${error.message}`);
    process.exit(1);
  })

//* Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   console.log(`Request received: ${req.method} ${req.url}`);
//   next();
// });

app.use("/api", healthCheckRoutes);

//* Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

//* Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});