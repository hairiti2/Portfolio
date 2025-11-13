import express from "express";
import fs from "fs";
import path from "path";

const routerProj = express.Router() ;
const filePathProj = path.resolve("./data/projects.json") ;

routerProj.get("/", (req, res) =>{
    const dataProj = fs.readFileSync(filePathProj, "utf-8") ;
    const projects = JSON.parse(dataProj) ;
    res.json(projects) ;
}) ;

export default routerProj;