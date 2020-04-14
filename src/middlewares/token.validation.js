const ContactInfo = require('../models/contact.info.model');

const tokenValidation = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const checking = await ContactInfo.findOne({
            where: { email: authorization }
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
