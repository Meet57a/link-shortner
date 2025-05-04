const UrlModel = require('../models/url-model');
const ClickModel = require('../models/clicks-model');
const { verifyToken } = require('../utils/token-utils')

exports.createUrlService = async (body, token) => {
    try {
        console.log(token);
        const now = new Date();
        const currentDate = now.toISOString().split('T')[0];
        const currentTime = now.toTimeString().split(' ')[0];
        


        var { title, longUrl, customUrl } = body;
        console.log(body);

        const existCustomUrl = await UrlModel.findOne({ customUrl: customUrl });
        let shortUrl;
        let existShortUrl;
        const user = verifyToken(token);




        if (existCustomUrl) {
            console.log(existCustomUrl.customUrl);
            return { status: false, msg: "Custom URL already exist. Please write new", statusCode: 400 };
        } else {
            do {
                shortUrl = Math.random().toString(36).substring(2, 8);
                existShortUrl = await UrlModel.findOne({ shortUrl: shortUrl });
            } while (existShortUrl);
            if (customUrl === "") {
                customUrl = shortUrl;
            }else {
                shortUrl = customUrl;
            }

            const saveData = await UrlModel.create({ title: title, longUrl: longUrl, shortUrl: shortUrl, customUrl: customUrl, userId: user.userid, currentDate: currentDate, currentTime: currentTime });
            if (saveData) {
                const urls = await UrlModel.find({ userId: user.userid });
                return { status: true, msg: "URL created successfully.", statusCode: 200, urls: urls };
            } else {
                return { status: false, msg: "URL not created.", statusCode: 400 };
            }

        }



    } catch (error) {
        console.log(error);
        return { status: false, msg: error, statusCode: 500 };
    }
}


exports.deleteUrlService = async (id, token) => {
    try {
        const user = verifyToken(token);
        const url = await UrlModel.findOne({ _id: id });
        if (url) {
            if (url.userId == user.userid) {
                const deleteUrl = await UrlModel.deleteOne({ _id: id });
                if (deleteUrl) {
                    return { status: true, msg: "URL deleted successfully.", statusCode: 200, _id: id };
                } else {
                    return { status: false, msg: "URL not deleted.", statusCode: 400 };
                }
            } else {
                return { status: false, msg: "You are not authorized to delete this URL.", statusCode: 403 };
            }
        } else {
            return { status: false, msg: "URL not found.", statusCode: 404 };
        }
    } catch (error) {
        console.log(error);
        return { status: false, msg: error, statusCode: 500 };
    }
}


exports.clickUrlService = async (body, ipAdd, country_name, city) => {
    try {
        const { shortUrl, device } = body;
        const now = new Date();
        const currentDate = now.toISOString().split('T')[0];
        const currentTime = now.toTimeString().split(' ')[0];


        const url = await UrlModel.findOne({ shortUrl: shortUrl });
        if (url) {
            const click = await ClickModel.create({ urlId: url._id, ip: ipAdd, country: country_name, city: city, device: device, timestamp: currentDate + "T" + currentTime + "Z" });
            if (click) {
                const updateUrl = await UrlModel.updateOne({ shortUrl: shortUrl }, { $inc: { clicks: 1 } });
                if (updateUrl) {
                    return { status: true, msg: "URL clicked successfully.", statusCode: 200 };
                } else {
                    return { status: false, msg: "URL not clicked.", statusCode: 400 };
                }
            } else {
                return { status: false, msg: "Click not recorded.", statusCode: 400 };
            }
        } else {
            return { status: false, msg: "URL not found.", statusCode: 404 };
        }

    } catch (error) {
        console.log(error);
        return { status: false, msg: error, statusCode: 500 };
    }

}