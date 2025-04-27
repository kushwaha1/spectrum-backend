// module.exports = (err, req, res, next) => {
//     console.error(err);
//     res.status(500).json({ message: 'Something went wrong', error: err.message });
// };

module.exports = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong!';
    res.status(statusCode).json({
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};