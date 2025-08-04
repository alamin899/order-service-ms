import pool from '../config/db.js';

export const orderList = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection(); // <-- manually get a connection

        const { userId } = req.user;

        const [orders] = await connection.execute(`
            SELECT
                o.id AS order_id,
                o.user_id,
                o.total,
                o.status,
                op.product_id,
                op.quantity,
                op.price,
                o.created_at
            FROM orders o
                     JOIN order_products op ON o.id = op.order_id
            WHERE o.user_id = ?
            ORDER BY o.id DESC
        `, [userId]);

        const grouped = {};
        for (const row of orders) {
            const { order_id, user_id, total, status, created_at, product_id, quantity, price } = row;

            if (!grouped[order_id]) {
                grouped[order_id] = {
                    order_id,
                    user_id,
                    total,
                    status,
                    created_at,
                    products: []
                };
            }

            grouped[order_id].products.push({ product_id, quantity, price });
        }

        const result = Object.values(grouped);

        res.json({
            message: "success",
            data: result,
            error: null,
        });
    } catch (err) {
        console.error('Fetch products error:', err.message);
        res.status(500).json({
            message: "Server error",
            data: null,
            error: err.message,
        });
    } finally {
        if (connection) connection.release();
    }
};
