const LikeModel = require('../models/likes-model');

exports.fetchLikesService = async () => {
    try {
        const likes = (await LikeModel.find()).length;
        return { status: true, msg: "Likes fetched successfully.", statusCode: 200, likes: likes };
    } catch (error) {
        console.log(error);
        return { status: false, msg: error, statusCode: 500 };
    }
}