const { signUpService, signInService, sessionService, signOutService } = require('../services/auth-service');

exports.signUp = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);

        if (body !== null) {
            const result = await signUpService(body);
            res.status(result.statusCode).json(result);
        } else {
            res.status(400).json({ status: false, msg: 'Invalid request', statusCode: 400 });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: error, statusCode: 500 });
    }
}

exports.signIn = async (req, res) => {
    try {
        const body = req.body;

        if (body !== null) {
            const result = await signInService(body);
            res.status(result.statusCode).json(result);
        } else {
            res.status(400).json({ status: false, msg: 'Invalid request', statusCode: 400 });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: error, statusCode: 500 });
    }
}

exports.session = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        const tokenSplited = token.split(' ')[1];


        if (token !== null) {
            const result = await sessionService(tokenSplited);


            res.status(result.statusCode).json(result);
        } else {
            res.status(400).json({ status: false, msg: 'Invalid request', statusCode: 400 });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: error, statusCode: 500 });
    }
}

exports.signOut = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        const tokenSplited = token.split(' ')[1];

        if (token !== null) {
            const result = await signOutService(tokenSplited);
            res.status(result.statusCode).json(result);
        } else {
            res.status(400).json({ status: false, msg: 'Invalid request', statusCode: 400 });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: error, statusCode: 500 });
    }
}