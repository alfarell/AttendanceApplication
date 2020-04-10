const userAuthentication = async (req, res, service) => {
    const id = req.query.id;
    const img = req.body.img;
    try {
        console.log(id,img);
        const staffInfo = await service.authenticate(id,img);
        res.status(200);
            res.json(staffInfo);
    } catch (e) {
        res.status(500);
        res.json(e.message)
    }
};

module.exports = { userAuthentication };
