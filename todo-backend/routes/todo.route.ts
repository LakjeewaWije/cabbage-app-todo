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

  if (todos) {
    // res.send(todo);
    res.status(200).send({ success: todos });
  } else {
    res.status(500).send({ error: `fetching all todos failed`, data: [] });
  }
});

/**
 * Filter todos by endDate and insertion order
 */
 router.get("/filter/:type", async function (req: Request, res: Response) {
  const type = req.params.type;
  const todos = await TodoController.fliterTodos(type);
  console.log("Filter Type ",type);

  if (todos) {
    // res.send(todo);
    res.status(200).send({ success: todos });
  } else {
    res.status(500).send({ error: `fetching sorted todos failed`, data: [] });
  }
});

/**
 * Add new todo
 */
router.post("/", async function (req: Request, res: Response) {
  const data: TodoInterface = req.body;
  const todo = await TodoController.createTodo(data);
  console.log("creating this record", data);
  if (todo) {
    // res.send(todo);
    res.status(200).send({ data: todo });
  } else {
    res
      .status(500)
      .send({ error: `Todo creation failed for data `, data: data });
  }
});

/**
 * Change active state
 */
router.patch("/:id/:state", async function (req: Request, res: Response) {
  const id = req.params.id;
  const state = req.params.state;
  const todo = await TodoController.updateActiveState(id, state);
  console.log("creating this record", id, state);
  if (todo) {
    // res.send(todo);
    res.status(200).send({ data: todo });
  } else {
    res.status(404).send({ error: `Todo not found for id : ${id}` });
  }
});

/**
 * Delete a todo
 */
 router.delete("/:id", async function (req: Request, res: Response) {
    const id = req.params.id;
    const todo = await TodoController.deleteTodo(id);
    console.log("deleting this record", id);
    if (todo) {
      res.status(200).send({ data: todo });
    } else {
      res.status(500).send({ error: `Todo cannot be deleted for Id : ${id}` });
    }
  });

module.exports = router;
