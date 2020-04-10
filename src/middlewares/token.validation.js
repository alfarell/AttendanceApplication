// const jwt = require('jsonwebtoken');
const Staff = require('../models/staff.model');

const tokenValidation = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const checking = await Staff.findOne({ 
            where: { googleId: authorization } 
        });
        if (checking) {
            next();
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
};

module.exports = tokenValidation;
