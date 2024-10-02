const JWT = require("jsonwebtoken");

const secret = "$trickytech";

function createtokenforuser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL, // Use camelCase for consistency
        role: user.role,
   fullname:user.fullname
    };
    const token = JWT.sign(payload, secret);
    return token;
}

function validatetoken(token) {
    try {
        const payload = JWT.verify(token, secret);
        return payload;
    } catch (error) {
        console.error("Token validation failed:", error);
        return null; // Return null or handle the error as necessary
    }
}

module.exports = {
    createtokenforuser,
    validatetoken
};
