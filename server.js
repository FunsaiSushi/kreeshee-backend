import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectToMongoDB from "./config/database.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
// import characterRoutes from "./routes/character.routes.js";
// import postRoutes from "./routes/post.routes.js";
// import friendRequestRoutes from "./routes/friendRequest.routes.js";
// import notificationRoutes from "./routes/notification.routes.js";
// import recentSearches from "./routes/recentSearch.routes.js";

const app = express();

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware setup
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const server = http.createServer(app);
// const io = initSocket(server);

// Socket.io middleware
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
// app.use("/api/characters", characterRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/friends", friendRequestRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/search", recentSearches);

const PORT = process.env.PORT || 5000;
dotenv.config();

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
