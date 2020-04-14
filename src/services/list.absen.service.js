const logEvent = require('../events/myEmitter');

class ListAbsenService {
    constructor(employee, present, personalInfo, contactInfo, workInfo, address) {
        this.employee = employee;
        this.present = present;
        this.personalInfo = personalInfo;
        this.contactInfo = contactInfo;
        this.workInfo = workInfo;
        this.address = address;
    }

    async getEmployeeAbsensi(id) {
        let result;
        try {
            result = await this.present.findAll({
                where:
                {
                    employeeId: id
                },
            })
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-ATTENDANCE-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }

    async getListAbsensiByDate(tanggal) {
        let result;
        try {
            result = await this.present.findAll({
                where:
                {
                    tanggal: tanggal
                },
                attributes: { exclude: ['employeeId'] },
                include: [
                    {
                        model: this.employee,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                        include: [
                            {
                                model: this.personalInfo,
                                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                include: [
                                    {
                                        model: this.address,
                                        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                                    }
                                ]
                            },
                            {
                                model: this.contactInfo,
                                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                            },
                            {
                                model: this.workInfo,
                                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                            }
                        ]
                    },
                ],
            });
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-ATTENDANCE-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }

    async getAbsensiByIdAndDate(id, tanggal) {
        let result;
        try {
            result = await this.present.findOne({
                where:
                {
                    tanggal: tanggal,
                    employeeId: id
                },
                attributes: { exclude: ['employeeId'] },
                include: [
                    {
                        model: this.employee,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                        include: [
                            {
                                model: this.personalInfo,
                                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                include: [
                                    {
                                        model: this.address,
                                        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                                    }
                                ]
                            },
                            {
                                model: this.contactInfo,
                                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                            },
                            {
                                model: this.workInfo,
                                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                            }
                        ]
                    },
                ],
            });
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-ATTENDANCE-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }

    async getAllList() {
        let result;
        try {
            result = await this.present.findAll({
                attributes: { exclude: ['employeeId'] },
                order: [['tanggal', 'ASC']],
                include: [
                    {
                        model: this.employee,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                        include: [
                            {
                                model: this.personalInfo,
                                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                include: [
                                    {
                                        model: this.address,
                                        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                                    }
                                ]
                            },
                            {
                                model: this.contactInfo,
                                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                            },
                            {
                                model: this.workInfo,
                                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                            }
                        ]
                    },
                ],
            });
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-ATTENDANCE-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }
}

module.exports = ListAbsenService;
