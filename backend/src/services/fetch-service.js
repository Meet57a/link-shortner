const UrlModel = require('../models/url-model');
const LikeModel = require('../models/likes-model');
const { verifyToken } = require('../utils/token-utils')


exports.fetchLikesService = async () => {
    try {
        const likes = (await LikeModel.find()).length;
        return { status: true, msg: "Likes fetched successfully.", statusCode: 200, likes: likes, urls: [] };
    } catch (error) {
        console.log(error);
        return { status: false, msg: error, statusCode: 500 };
    }
}

exports.fetchUrlService = async (token) => {
    try {
        const user = verifyToken(token);
        console.log(user);

        const urls = await UrlModel.find({ userId: user.userid });
        if (urls) {
            return { status: true, msg: "URL fetched successfully.", statusCode: 200, urls: urls };
        } else {
            return { status: false, msg: "URL not fetched.", statusCode: 400 };
        }
    } catch (error) {
        console.log(error);
        return { status: false, msg: error, statusCode: 500 };
    }
}
exports.getLongUrlService = async (shortUrl) => {
    try {
        const url = await UrlModel.findOne({ shortUrl: shortUrl });
        if (url) {
            return { status: true, msg: "URL fetched successfully.", statusCode: 200, longUrl: url.longUrl };
        } else {
            return { status: false, msg: "URL not found.", statusCode: 404 };
        }
    } catch (error) {
        console.log(error);
        return { status: false, msg: error, statusCode: 500 };
    }
}