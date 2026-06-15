import express from "express";
import cors from "cors";
import projectsRouter from "./routes/projects.js";
import skillsRouter from "./routes/skills.js" ;

const ALLOWED_ORIGINS = [
  "https://sachapitalot.dev",
  "http://localhost:5173",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.options("/{*path}", cors(corsOptions));
app.use(express.json()) ;

app.use("/api/projects", projectsRouter) ;
app.use("/api/skills", skillsRouter) ;

const PORT = 5000 ;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`) ;
}) ;