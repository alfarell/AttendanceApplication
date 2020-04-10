const submitAbsen = async (req,res,service) => {
    const listData = req.body;
    try{
        await service.submitAbsensi(listData);
        res.status(200);
        res.json('Submit Absen Berhasil');
    }catch(e){
        res.status(500);
        res.json(e.message);
    }
}

module.exports = {submitAbsen}
