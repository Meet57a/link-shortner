const { fetchLikesService, fetchUrlService, getLongUrlService } = require('../services/fetch-service')

exports.fetchLikes = async (req, res) => {
    try {
        const result = await fetchLikesService();
        res.status(result.statusCode).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: error, statusCode: 500 });
    }
}

exports.fetchUrl = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        const tokenSplited = token.split(' ')[1];

        if (token !== null) {
            const result = await fetchUrlService(tokenSplited);
            res.status(result.statusCode).json(result);
        } else {
            res.status(400).json({ status: false, msg: 'Invalid request', statusCode: 400 });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: error, statusCode: 500 });
    }
}

exports.getLongUrl = async (req, res) => {
    try {
        const shortUrl = req.params.shortUrl;
        
        
        const result = await getLongUrlService(shortUrl);
        res.status(result.statusCode).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: error, statusCode: 500 });
    }
}