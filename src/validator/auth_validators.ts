import { body } from 'express-validator';

export const registerValidationRules = [
    body('email')
        .isEmail()
        .withMessage('Email is not valid'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    body('username')
        .notEmpty()
        .withMessage('Username is required').isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),
];

export const loginValidationRules = [
    body('email')
        .isEmail()
        .withMessage('Email is not valid'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

];

export const refreshTokenValidationRules = [
    body('token')
        .notEmpty()
        .withMessage('Refresh token is required'),
];
