import TodoInterface from "../interfaces/todo.interface";
import { TodoDao } from "../model/todo-dao";
class TodoController {
  getAllTodos = async (): Promise<TodoInterface[]> => {
    const todos = await TodoDao.find();
    // if (todos.length == 0) throw Error(`No any todos found`);
    return todos;
  };

  createTodo = async (
    data: TodoInterface
  ): Promise<TodoInterface | Boolean> => {
    try {
      const todoDao = new TodoDao(data);
      const todos = await todoDao.save();
      return todos;
    } catch (err) {
      return false;
    }
  };

  updateActiveState = async (
    id: String,
    activeState: string
  ): Promise<TodoInterface | any> => {
    try {
      const todo = await TodoDao.findByIdAndUpdate(
        id,
        { state: activeState },
        { new: true }
      );
      return todo;
    } catch (err) {
      return false;
    }
  };
}

export default new TodoController();
