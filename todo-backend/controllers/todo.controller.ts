import TodoInterface from "../interfaces/todo.interface";
import { TodoDao } from "../model/todo-dao";
class TodoController{

    private todos: TodoInterface[] = [
        {
          title: 'Lorem Ipsum',
          state: 'active',
          endDate: new Date(),
        }
      ];

      getAllTodos = async () : Promise<TodoInterface[]>  => {
        const todos = await TodoDao.find();
        return todos;
      }

}

export default new TodoController();