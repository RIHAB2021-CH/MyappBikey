const express= require('express');
const connectdb =require('./config/db');
const owner = require("./routes/Owner");
const cors = require("cors");
const app=express();
app.use(cors());

app.use(express.json());
// CONNECT DATA BASE 
connectdb();
app.get('/',(req,res)=>res.send('API RUNNING'));
app.use("/owner", owner);
PORT=process.env.PORT || 5080; 
app.listen(PORT, ()=>console.log(`Server is Running on ${PORT}`));
