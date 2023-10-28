//0CXHMRc9IhHpmbnG : password
// link : mongodb+srv://cooderherou:0CXHMRc9IhHpmbnG@authmern.eziaei5.mongodb.net/

import express from "express";
import router from "./routes/userRoutes.js";
import { notFound,errorHandler } from "./middlware/errorMidllware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
  dotenv.config();



const PORT=process.env.PORT||3000;
const app=express();


// connect to mongo db
connectDB();
//
app.use(express.json());

// cookieParser befor router
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use('/api/users',router);


app.use(notFound);
app.use(errorHandler);





app.listen(PORT,()=>{
  console.log("Listening to Port  ",PORT);
})

