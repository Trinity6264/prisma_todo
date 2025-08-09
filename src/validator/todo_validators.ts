import { body, param } from 'express-validator';

// Validation for creating a new todo
export const createTodoValidationRules = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 1, max: 255 })
        .withMessage('Title must be between 1 and 255 characters')
        .trim()
        .escape(),
];

// Validation for updating a todo
export const updateTodoValidationRules = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('Todo ID must be a positive integer'),
    
    body('title')
        .optional()
        .isLength({ min: 1, max: 255 })
        .withMessage('Title must be between 1 and 255 characters')
        .trim()
        .escape(),
    
    body('completed')
        .optional()
        .isBoolean()
        .withMessage('Completed must be a boolean value'),
];

// Validation for getting, deleting, or toggling a specific todo
export const todoIdValidationRules = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('Todo ID must be a positive integer'),
];

// Validation for toggle todo (only needs ID)
export const toggleTodoValidationRules = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('Todo ID must be a positive integer'),
];

// Validation for query parameters (optional filters for getTodos)
export const getTodosValidationRules = [
    body('completed')
        .optional()
        .isBoolean()
        .withMessage('Completed filter must be a boolean value'),
    
    body('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
    
    body('offset')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Offset must be a non-negative integer'),
];
