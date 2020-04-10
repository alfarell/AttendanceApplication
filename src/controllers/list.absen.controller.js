const getList = async(req,res,service) => {
    let result;
    let tanggal = req.query.tanggal;
    let id = req.query.id;
    try{
        if(tanggal){
            result = await service.getListAbsensi(tanggal);
            res.status(200);
            res.json(result);
        }else if(id){
            result = await service.getEmployeeAbsensi(id);
            res.status(200);
            res.json(result);
        }
    }catch(e){
        res.status(500);
        res.json(e.message);
    }
}

module.exports = {getList}
