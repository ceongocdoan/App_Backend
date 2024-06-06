const ErrorHandler = require('./errors');

module.exports = errorFunction => (req, res, next) => {
    Promise.resolve(errorFunction(req, res, next))
        .catch(err => {
            console.error('Error caught in catchAsync:', err);
            if (err instanceof ErrorHandler) {
                res.status(err.statusCode || 500).json({ error: err.message }); // Trả về JSON với mã trạng thái từ ErrorHandler hoặc mặc định 500
            } else {
                res.status(500).json({ error: 'Internal Server Error' }); // Trả về JSON lỗi mặc định
            }
        });
}