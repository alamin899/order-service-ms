import { body } from 'express-validator';

export const orderValidator = [
    body('products').isArray().withMessage('Input must be an array'),

    body('products.*.product_id')
        .isInt({ gt: 0 })
        .withMessage('Each product_id must be an integer greater than 0'),

    body('products.*.quantity')
        .isInt({ gt: 0 })
        .withMessage('Each quantity must be an integer greater than 0'),
];
