import express from 'express';
import cors from 'cors';

const app= express();
app.use(cors);

app.listen(8000, ()=>{
    console.log("Server Running on Port 8000");
})