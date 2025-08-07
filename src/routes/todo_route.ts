import { Router } from "express";
import { 
    createTodo, 
    getTodos, 
    getTodoById, 
    updateTodo, 
    deleteTodo, 
    toggleTodo 
} from "../controllers/todo_controller";
import { validateRequest } from "../validator/validation_request";
import { 
    createTodoValidationRules,
    updateTodoValidationRules,
    todoIdValidationRules,
    toggleTodoValidationRules,
    getTodosValidationRules
} from "../validator/todo_validators";
import { authCheck } from "../middleware/auth_check";

const todoRouter = Router();

// Apply authentication middleware to all todo routes
todoRouter.use(authCheck);

// GET /todos - Get all todos for authenticated user
todoRouter.get('/', getTodosValidationRules, validateRequest, getTodos);

// POST /todos - Create a new todo
todoRouter.post('/', createTodoValidationRules, validateRequest, createTodo);

// GET /todos/:id - Get a specific todo by ID
todoRouter.get('/:id', todoIdValidationRules, validateRequest, getTodoById);

// PUT /todos/:id - Update a todo (title and/or completed status)
todoRouter.put('/:id', updateTodoValidationRules, validateRequest, updateTodo);

// DELETE /todos/:id - Delete a todo
todoRouter.delete('/:id', todoIdValidationRules, validateRequest, deleteTodo);

// PATCH /todos/:id/toggle - Toggle todo completion status
todoRouter.patch('/:id/toggle', toggleTodoValidationRules, validateRequest, toggleTodo);

export default todoRouter;
