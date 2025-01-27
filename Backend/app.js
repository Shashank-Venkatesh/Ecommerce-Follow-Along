const express=require("express")
const app =express()

if(process.env.NODE_ENV !=="PRODUCTION"){
    require("dotenv").config({
        path:"Backend/config/.env"

    });
};

//app.use(ErrorHandler);
module.exports=app;