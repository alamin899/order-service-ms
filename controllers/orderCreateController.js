import pool from '../config/db.js';

export const createOrder = async (req, res) => {
    let { products } = req.body;
    const { userId } = req.user;

    // Validation
    if (!userId || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({
            message: 'Invalid order data',
            data: null,
            error: 'user_id and products[] are required',
        });
    }

    let connection;  // declare here
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [orderResult] = await connection.execute(
            'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
            [userId, 0, 'pending']
        );

        const orderId = orderResult.insertId;
        let totalAmount = 0;

        for (const item of products) {
            const { product_id, quantity } = item;
            const price = 5;

            if (!product_id || !quantity || !price || quantity <= 0 || price <= 0) {
                throw new Error('Invalid product item in order');
            }

            const itemTotal = quantity * price;
            totalAmount += itemTotal;

            await connection.execute(
                'INSERT INTO order_products (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, product_id, quantity, price]
            );
        }

        await connection.execute(
            'UPDATE orders SET total = ? WHERE id = ?',
            [totalAmount, orderId]
        );

        await connection.commit();
        res.status(201).json({
            message: 'Order created successfully',
            order_id: orderId,
            total: totalAmount,
            error: null,
        });

    } catch (err) {
        if (connection) await connection.rollback();
        console.error('Order transaction failed:', err.message);
        res.status(500).json({
            message: 'Failed to create order',
            data: null,
            error: err.message,
        });
    } finally {
        if (connection) connection.release();   // <-- release it here!
    }
};
