import AsyncWrapper from "../helper/async_wrapper";
import { Request, Response } from "express";
import { prismaDB } from "../data/prisma_connect";
import NotFoundError from "../errors/not_found_error";
import BadRequestError from "../errors/bad_request_error";
import ForbiddenError from "../errors/forbidden_error";

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        email: string;
      };
    }
  }
}

// Create a new todo
const createTodo = AsyncWrapper(async (req: Request, res: Response) => {
    const { title } = req.body;
    const userId = req.user?.id; // Assuming user is attached to request via middleware

    if (!userId) {
        throw new ForbiddenError('User authentication required');
    }

    if (!title || title.trim() === '') {
        throw new BadRequestError('Title is required');
    }

    const newTodo = await prismaDB.todo.create({
        data: {
            title: title.trim(),
            userId: userId,
        },
        select: {
            id: true,
            title: true,
            completed: true,
            createdAt: true,
        },
    });

    res.status(201).json({
        message: "Todo created successfully",
        status: "success",
        data: newTodo,
    });
});

// Get all todos for authenticated user
const getTodos = AsyncWrapper(async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new ForbiddenError('User authentication required');
    }

    const todos = await prismaDB.todo.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            title: true,
            completed: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    res.status(200).json({
        message: "Todos retrieved successfully",
        status: "success",
        data: todos,
    });
});

// Get a specific todo by ID
const getTodoById = AsyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
        throw new ForbiddenError('User authentication required');
    }

    const todoId = parseInt(id);
    if (isNaN(todoId)) {
        throw new BadRequestError('Invalid todo ID');
    }

    const todo = await prismaDB.todo.findFirst({
        where: {
            id: todoId,
            userId: userId,
        },
        select: {
            id: true,
            title: true,
            completed: true,
            createdAt: true,
        },
    });

    if (!todo) {
        throw new NotFoundError('Todo not found');
    }

    res.status(200).json({
        message: "Todo retrieved successfully",
        status: "success",
        data: todo,
    });
});

// Update a todo
const updateTodo = AsyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        throw new ForbiddenError('User authentication required');
    }

    const todoId = parseInt(id);
    if (isNaN(todoId)) {
        throw new BadRequestError('Invalid todo ID');
    }

    // Check if todo exists and belongs to user
    const existingTodo = await prismaDB.todo.findFirst({
        where: {
            id: todoId,
            userId: userId,
        },
    });

    if (!existingTodo) {
        throw new NotFoundError('Todo not found');
    }

    // Prepare update data
    const updateData: any = {};
    if (title !== undefined) {
        if (title.trim() === '') {
            throw new BadRequestError('Title cannot be empty');
        }
        updateData.title = title.trim();
    }
    if (completed !== undefined) {
        if (typeof completed !== 'boolean') {
            throw new BadRequestError('Completed must be a boolean value');
        }
        updateData.completed = completed;
    }

    if (Object.keys(updateData).length === 0) {
        throw new BadRequestError('No valid fields to update');
    }

    const updatedTodo = await prismaDB.todo.update({
        where: {
            id: todoId,
        },
        data: updateData,
        select: {
            id: true,
            title: true,
            completed: true,
            createdAt: true,
        },
    });

    res.status(200).json({
        message: "Todo updated successfully",
        status: "success",
        data: updatedTodo,
    });
});

// Delete a todo
const deleteTodo = AsyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
        throw new ForbiddenError('User authentication required');
    }

    const todoId = parseInt(id);
    if (isNaN(todoId)) {
        throw new BadRequestError('Invalid todo ID');
    }

    // Check if todo exists and belongs to user
    const existingTodo = await prismaDB.todo.findFirst({
        where: {
            id: todoId,
            userId: userId,
        },
    });

    if (!existingTodo) {
        throw new NotFoundError('Todo not found');
    }

    await prismaDB.todo.delete({
        where: {
            id: todoId,
        },
    });

    res.status(200).json({
        message: "Todo deleted successfully",
        status: "success",
        data: {},
    });
});

// Toggle todo completion status
const toggleTodo = AsyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
        throw new ForbiddenError('User authentication required');
    }

    const todoId = parseInt(id);
    if (isNaN(todoId)) {
        throw new BadRequestError('Invalid todo ID');
    }

    // Check if todo exists and belongs to user
    const existingTodo = await prismaDB.todo.findFirst({
        where: {
            id: todoId,
            userId: userId,
        },
    });

    if (!existingTodo) {
        throw new NotFoundError('Todo not found');
    }

    const updatedTodo = await prismaDB.todo.update({
        where: {
            id: todoId,
        },
        data: {
            completed: !existingTodo.completed,
        },
        select: {
            id: true,
            title: true,
            completed: true,
            createdAt: true,
        },
    });

    res.status(200).json({
        message: "Todo status toggled successfully",
        status: "success",
        data: updatedTodo,
    });
});

export { 
    createTodo, 
    getTodos, 
    getTodoById, 
    updateTodo, 
    deleteTodo, 
    toggleTodo 
};
