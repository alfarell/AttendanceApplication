const getList = async (req, res, service) => {
    let result;
    let tanggal = req.query.tanggal;
    let id = req.query.id;
    try {
        if (tanggal&&id) {
            result = await service.getAbsensiByIdAndDate(id,tanggal);
        } else if (tanggal) {
            result = await service.getListAbsensiByDate(tanggal);
        } else if (id) {
            result = await service.getEmployeeAbsensi(id);
        } else {
            result = await service.getAllList();
        }
        res.status(200);
        res.json(result);
    } catch (e) {
        res.status(500);
        res.json(e.message);
    }
}

module.exports = { getList }
