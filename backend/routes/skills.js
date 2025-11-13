import express from "express"
import fs from "fs";
import path from "path";

const routerSkill = express.Router() ;
const filePathSkill = path.resolve("./data/skills.json") ;

routerSkill.get("/", (req, res)=>{
    const dataSkill = fs.readFileSync(filePathSkill, 'utf-8') ;
    const skills = JSON.parse(dataSkill) ;
    res.json(skills) ;
}) ;

export default routerSkill ;