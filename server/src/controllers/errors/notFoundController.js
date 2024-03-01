const notFoundController = (req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Route not found',
    });
};

export default notFoundController;
