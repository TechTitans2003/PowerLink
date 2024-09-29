const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
    const { token } = req.cookies;
    // const token = req.headers.authorization;

    if (!token) {
        return res.status(400)
            .redirect('/');
            // .json({ message: 'Invalid Token' });
    }

    const authToken = token.replace("Bearer", "").trim();

    try {
        const isVerified = jwt.verify(authToken, process.env.JWT_SECRET_KEY);

        const user = await User.findById(isVerified.userId)
            .select({
                password: 0,
            });

        req.user = user;
        req.token = token;
        req.userId = isVerified.userId;
        req.admin = isVerified.isAdmin;

        next();
    } catch (error) {
        // console.error(error);
        const err = {
            status: 500,
            message: "Internal Server Error Cannot Verify User",
            discription: error,
        };

        next(err);
    }
}


module.exports = authMiddleware;