const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const status = err.status || 'error';

    console.error(`[Error] ${statusCode} - ${message}`, err);

    res.status(statusCode).json({
        status: status,
        statusCode,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

module.exports = errorMiddleware;
