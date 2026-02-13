import express from "express"
import cors from "cors"
import statusRoutes from "./routes/status.routes.js";
import extractRoutes from "./routes/extract.routes.js";
import taskRoutes from "./routes/task.routes.js";
import historyRoutes from "./routes/history.routes.js";

const app = express()

// Middlewares
app.use(cors());
app.use(express.json());

// Test routes
app.get("/", (req, res) => {
    res.json({ message: "Backend is running" })
})

app.use("/api/status", statusRoutes);

// extract transcript
app.use("/api/extract", extractRoutes)

// task routes
app.use("/api/tasks", taskRoutes);

// history route
app.use("/api/history", historyRoutes);


export default app