const { createUrlService, deleteUrlService, clickUrlService } = require('../services/url-services');

exports.createUrl = async (req, res) => {
    try {
        const body = req.body;

        const token = req.headers['authorization'];
        const tokenSplited = token.split(' ')[1];

        if (body !== null) {
            const result = await createUrlService(body, tokenSplited);
            res.status(result.statusCode).json(result);
        } else {
            res.status(400).json({ status: false, msg: 'Invalid request', statusCode: 400 });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: error, statusCode: 500 });
    }
}

exports.deleteUrl = async (req, res) => {
    try {
        const id = req.params.id;
        const token = req.headers['authorization'];
        const tokenSplited = token.split(' ')[1];

        if (id !== null) {
            const result = await deleteUrlService(id, tokenSplited);
            res.status(result.statusCode).json(result);
        } else {
            res.status(400).json({ status: false, msg: 'Invalid request', statusCode: 400 });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: error, statusCode: 500 });
    }
}

exports.clickUrl = async (req, res) => {
    try {
        const body = req.body;
        const ipAdd = req.ip.split(':').pop();


        const { country_name, city } = fetch(`https://ipapi.co/${ipAdd}/json/`);


        if (body !== null) {
            const result = await clickUrlService(body, ipAdd, country_name, city);
            res.status(result.statusCode).json(result);
        } else {
            res.status(400).json({ status: false, msg: 'Invalid request', statusCode: 400 });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: error, statusCode: 500 });
    }
}

