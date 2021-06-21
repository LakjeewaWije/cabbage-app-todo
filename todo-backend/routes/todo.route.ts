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

/**
 * Get all todos
 */
router.get("/", async function (req: Request, res: Response) {
  const todos = await TodoController.getAllTodos();
  console.log(todos);
  res.send(todos);
});

/**
 * Add new todo
 */
 router.post("/", async function (req: Request, res: Response) {
     const data : TodoInterface  = req.body;
    const todo = await TodoController.createTodo(data);
    console.log("creating this record",data);
    res.send(todo);
  });

module.exports = router;
