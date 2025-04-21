export const errorHandler = (error, req, res, next) => {
    console.error('Error:', error.message);

    if (error.message.includes('not found')) {
        return res.status(404).json({ error: error.message });
    }

    if (error.message.includes('required')) {
        return res.status(400).json({ error: error.message });
    }

    res.status(500).json({
        error: error.message || 'Internal Server Error',
    });
};
