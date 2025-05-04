

class Validation {
    static validateSignUpForm = (req, res, next) => {
        const { name, email, password } = req.body;
        var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        console.log(req.body);
        
        if (!name || !email || !password) {
            return res.status(400).json({ status: false, msg: 'All fields are required', statusCode: 400 });
        }

        if (name.length < 3) {
            return res.status(400).json({ status: false, msg: 'Name must be at least 3 characters', statusCode: 400 });
        } else if (password.length < 6) {
            return res.status(400).json({ status: false, msg: 'Password must be at least 6 characters', statusCode: 400 });
        } else if (!email.match(emailFormat) || !email.match('gmail.com')) {
            return res.status(400).json({ status: false, msg: 'Invalid email address', statusCode: 400 });
        }

        next();
    }

    static validateSignInForm = (req, res, next) => {
        const { email, password } = req.body;
        var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        if (!email || !password) {
            return res.status(400).json({ status: false, msg: 'All fields are required', statusCode: 400 });
        }

        else if (!email.match(emailFormat)) {
            return res.status(400).json({ status: false, msg: 'Invalid email address', statusCode: 400 });
        }

        next();
    }

    static validateUrlForm = (req, res, next) => {
        const { title, longUrl, customUrl } = req.body;
        var urlFormat = /^(ftp|http|https):\/\/[^ "]+$/;

        if (!title || !longUrl) {
            return res.status(400).json({ status: false, msg: 'All fields are required', statusCode: 400 });
        }

        else if (!longUrl.match(urlFormat)) {
            return res.status(400).json({ status: false, msg: 'Invalid URL', statusCode: 400 });
        }

        next();
    }

    static validateClickUrlForm = (req, res, next) => {
        console.log(req.body);
        
        const { shortUrl } = req.body;
        console.log(shortUrl);
        
        if (!shortUrl) {
            return res.status(400).json({ status: false, msg: 'Invalid Short Url', statusCode: 400 });
        }

        next();
    }
}



module.exports = Validation;