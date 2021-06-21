import TodoInterface from "../interfaces/todo.interface";
import { TodoDao } from "../model/todo-dao";
class TodoController{

      getAllTodos = async () : Promise<TodoInterface[]>  => {
        const todos = await TodoDao.find();
        // if (todos.length == 0) throw Error(`No any todos found`);
        return todos;
      }

      createTodo = async (data: TodoInterface) : Promise<TodoInterface>  => {
        const todoDao = new TodoDao(data);
        const todos = await todoDao.save();
        return todos;
      }

}

export default new TodoController();