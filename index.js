const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 5005
dotenv.config({path:"./backend/.env"});
const path=require("path");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"*"
}));

app.get("/backend",(req,res) => {
    res.sendFile(path.resolve(__dirname,"dist","index.html"))
})

//database connection
require("./db");

app.use("/backend/api/user",require("./modules/routes/routeUser"))
app.use("/backend/api/event",require("./modules/routes/routeEvent"))
app.use("/backend/api/solution",require("./modules/routes/routeSolution"))

//set static folder
app.use(express.static("dist"));

app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname,"dist","index.html"));
})

app.listen(port,() => {
    console.log("Server connected at "+port);
})