// var express = require('express')
import express, { Request, Response } from "express";

var router = express.Router();
import TodoController from "../controllers/todo.controller";
import TodoInterface from "../interfaces/todo.interface";
// middleware that is specific to this router
router.use(function timeLog(req: any, res: any, next: () => void) {
  console.log("Time: ", Date.now());
  next();
});

// define the home page route
router.get("/", async function (req: Request, res: Response) {
  const todos = await TodoController.getAllTodos();
  console.log(todos);
  res.send(todos);
});

module.exports = router;
