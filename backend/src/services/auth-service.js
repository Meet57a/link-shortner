const bcrypt = require('bcrypt');
const UserModel = require('../models/user-model');
const ProfileModel = require('../models/profile-model');
const { tokenGenerate, verifyToken } = require('../utils/token-utils');

exports.signUpService = async (body) => {
    try {
        console.log(body);

        const exist = await UserModel.findOne({ email: body.email });

        if (exist) {
            return { status: false, msg: "User already exist.", statusCode: 400 };
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(body.password, salt);
            body.password = hash;

            const saveData = await UserModel.create(body);
            const token = await tokenGenerate(saveData);

            if (token) {
                await ProfileModel.create({ user: saveData._id, token: token });
                return { status: true, msg: "User created successfully.", token: token, statusCode: 200, user: { name: saveData.name, email: saveData.email, _id: saveData._id } };
            } else {
                await UserModel.findByIdAndDelete(saveData._id);
                return { status: false, msg: "User not created.", statusCode: 400 };
            }
        }

    } catch (error) {
        console.log(error);

        return { status: false, msg: error, statusCode: 500 };
    }
}

exports.signInService = async (body) => {
    try {
        console.log(body);

        const user = await UserModel.findOne({ email: body.email });

        if (!user) {
            return { status: false, msg: "User not found.", statusCode: 404 };
        }

        const validPassword = await bcrypt.compare(body.password, user.password);

        if (!validPassword) {
            return { status: false, msg: "Invalid password.", statusCode: 400 };
        } else {
            const token = await tokenGenerate(user);
            if (token) {
                await ProfileModel.updateOne({ user: user._id }, { token: token });
                return { status: true, msg: "User logged in successfully.", token: token, statusCode: 200, user: { name: user.name, email: user.email, _id: user._id } };
            }
        }
    } catch (error) {
        console.log(error);
        return { status: false, msg: error, statusCode: 500 };
    }
}

exports.sessionService = async (token) => {
    try {
        console.log(token);

        const profile = await ProfileModel.findOne({ token: token });


        if (profile) {
            const user = await UserModel.findById(profile.user).select('name email');
            const result = verifyToken(token);
            if (result) {
                return { status: true, msg: "User session active.", statusCode: 200, data: { user: { name: user.name, email: user.email, _id: user._id }, token: token } };
            } else {
                await ProfileModel.updateOne({ token: token }, { token: '' });
                return { status: false, msg: "User session expired.", statusCode: 401 };
            }
        } else {
            return { status: false, msg: "User session not found.", statusCode: 404 };
        }

    } catch (error) {
        console.log(error);
        return { status: false, msg: error, statusCode: 500 };
    }
}

exports.signOutService = async (token) => {
    try {
        const profile = await ProfileModel.findOne({ token });
        if (profile) {
            await ProfileModel.updateOne({ token }, { token: '' });
            return { status: true, msg: "User session closed.", statusCode: 200 };
        }
        return { status: false, msg: "User session not found.", statusCode: 404 };
    } catch (error) {
        console.log(error);
        return { status: false, msg: error, statusCode: 500 };

    }
}