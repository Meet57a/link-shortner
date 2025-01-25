const UserModel = require('../models/user-model');
const ProfileModel = require('../models/profile-model');
const { tokenGenerate, verifyToken } = require('../utils/token-utils');

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        const tokenSplited = token.split(' ')[1];

        console.log(tokenSplited);


        if (token !== null) {
            const result = verifyToken(tokenSplited);

            if (result) {
                const profile = await ProfileModel.findOne({ token: tokenSplited });
                if (profile) {
                    const user = await UserModel.findById(profile.user);
                    if (user) {
                        req.user = user;
                        next();
                    } else {
                        res.status(404).json({ status: false, msg: 'User not found', statusCode: 404, data: { user: { name: "", email: "", _id: "" } } });
                    }
                } else {
                    res.status(404).json({ status: false, msg: 'Profile not found', statusCode: 404, data: { user: { name: "", email: "", _id: "" } } });
                }
            } else {
                res.status(401).json({ status: false, msg: 'Unauthorized', statusCode: 401, data: { user: { name: "", email: "", _id: "" } } });
            }
        } else {
            res.status(400).json({ status: false, msg: 'Invalid request', statusCode: 400, data: { user: { name: "", email: "", _id: "" } } });
        }
    } catch (error) {
        if (error.message === "jwt expired") {
            return res.status(401).json({ status: false, msg: 'Unauthorized', statusCode: 401, data: { user: { name: "", email: "", _id: "" } } });
        }
        console.log(error);
        res.status(500).json({ status: false, msg: error, statusCode: 500, data: { user: { name: "", email: "", _id: "" } } });
    }
}