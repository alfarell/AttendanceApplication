const dateFormat = require('dateformat');
const logEvent = require('../events/myEmitter');

class SubmitAbsenService {
    constructor(present) {
        this.present = present;
    }

    async submitAbsensi(listData) {
        try {
            for (const data of listData) {

                let employeePresent = await this.present.findOne({
                    where:
                        { employeeId: data.employeeId, tanggal: data.tanggal },

                });

                if (employeePresent) {
                    if (employeePresent.jamKeluar) {
                        throw new Error("Sudah Absen Keluar");
                    } else {
                        data.jamKeluar = data.jam || dateFormat(new Date(), 'HH:MM:ss');
                        if (employeePresent.jamMasuk < data.jamKeluar) {
                            await this.present.update(data, { where: { id: employeePresent.id } })
                        } else {
                            throw new Error('Invalid Jam Keluar');
                        }
                    }
                } else {
                    data.jamMasuk = data.jam || dateFormat(new Date(), 'HH:MM:ss');
                    await this.present.create(data);
                }
            }
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'POST-ATTENDANCE-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return;
    }
}

module.exports = SubmitAbsenService;
