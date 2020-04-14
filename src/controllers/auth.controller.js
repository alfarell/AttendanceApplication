const userAuthentication = async (req, res, service) => {
    const email = req.query.email;
    let user;
    try {
        if (email) {
            user = await service.authenticate(email, req.body.img);
        } else {
            user = await service.authAdmin(req.body);
        }

        if (user) {
            res.status(200);
            res.json(user);
        } else {
            res.status(200);
            res.json({
                message: "Unauthorized"
            })
        }
    } catch (e) {
        res.status(500);
        res.json(e.message)
    }
};

module.exports = { userAuthentication };
