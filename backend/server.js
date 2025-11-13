import express from "express";
import cors from "cors";
import projectsRouter from "./routes/projects.js";
import skillsRouter from "./routes/skills.js" ;

const app = express() ;
app.use(cors()) ;
app.use(express.json()) ;

app.use("/api/projects", projectsRouter) ;
app.use("/api/skills", skillsRouter) ;

const PORT = 5000 ;
app.listen(PORT, ()=>console.log(`Backend en ligne sur http://localhost:${PORT}`)) ;