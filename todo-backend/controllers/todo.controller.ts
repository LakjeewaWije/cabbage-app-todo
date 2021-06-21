import TodoInterface from "../interfaces/todo.interface";
import { TodoDao } from "../model/todo-dao";
class TodoController {
  /**
   * get all todos
   * @returns todos list
   */
  getAllTodos = async (): Promise<TodoInterface[]> => {
    const todos = await TodoDao.find();
    // if (todos.length == 0) throw Error(`No any todos found`);
    return todos;
  };

  /**
   * Create a new todo
   * @param data
   * @returns created todo
   */
  createTodo = async (
    data: TodoInterface
  ): Promise<TodoInterface | Boolean> => {
    try {
      const todoDao = new TodoDao(data);
      const todo = await todoDao.save();
      return todo;
    } catch (err) {
      return false;
    }
  };

  /**
   * Update the state of the todo
   * @param id
   * @param activeState
   * @returns updated todo
   */
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

  /**
   * Delete a todo
   * @param id
   * @returns deleted todo
   */
  deleteTodo = async (id: String): Promise<TodoInterface | any> => {
    try {
      const todo = await TodoDao.findByIdAndDelete(id);
      return todo;
    } catch (err) {
      return false;
    }
  };
}

export default new TodoController();
