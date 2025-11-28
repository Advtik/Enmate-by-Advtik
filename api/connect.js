import express from "express";
import client from "pg";
const {Client}=client;
import dotenv from "dotenv";
 dotenv.config();
export const db= new Client({
    host:"localhost",
    user:"postgres",
    port: 5432,
    password:`${process.env.DB_PASS}`,
    database: "Enmate"
})

db.connect().then(()=>{console.log("db is connected")});