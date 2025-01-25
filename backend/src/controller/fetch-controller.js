const { fetchLikesService } = require('../services/fetch-service')

exports.fetchLikes = async (req, res) => {
    try {
        const result = await fetchLikesService();
        res.status(result.statusCode).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: error, statusCode: 500 });
    }
}