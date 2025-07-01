import axios from 'axios';

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://product-service:3000';

export const productListFromProductMS = async (req, res) => {
    try {
        const response = await axios.get(`${PRODUCT_SERVICE_URL}/api/products`);

        const { data, error } = response.data;

        if (error) {
            return res.status(500).json({
                message: "Failed to fetch products from product service",
                data: null,
                error
            });
        }

        return res.status(200).json({
            message: "Products fetched successfully",
            data,
            error: null
        });
    } catch (err) {
        console.error('Fetch products error:', err.message);
        return res.status(500).json({
            message: "Server error while fetching products",
            data: null,
            error: err.message,
        });
    }
};
