const logEvent = require('../events/myEmitter');
const sequelize = require('../../config/dbConn');
const { Op } = require('sequelize');
const dateFormat = require('dateformat');
const tanggal = dateFormat(new Date(), 'yyyy-mm-dd');

class EmployeeService {
    constructor(employee, personalInfo, contactInfo, workInfo, address, history, tanggal) {
        this.employee = employee;
        this.personalInfo = personalInfo;
        this.contactInfo = contactInfo;
        this.workInfo = workInfo;
        this.address = address;
        this.history = history;
        this.tanggal = tanggal;
    }

    async getAllInformation() {
        let result;
        try {
            result = await this.employee.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                include: [
                    {
                        model: this.personalInfo,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                        include: [
                            {
                                model: this.address,
                                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
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
            });
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-EMPLOYEE-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }

    async getInformationById(id) {
        let result;
        try {
            result = await this.employee.findByPk(id, {
                attributes: { exclude: ['personalInfoId', 'contactInfoId', 'workInfoId', 'createdAt', 'updatedAt', 'deletedAt'] },
                include: [
                    {
                        model: this.personalInfo,
                        attributes: { exclude: ['addressId', 'createdAt', 'updatedAt', 'deletedAt'] },
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
            });
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-EMPLOYEE-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }

    async syncInformation(history) {
        let result;
        try {
            result = await this.tanggal.findAll({
                where: { tanggal: { [Op.gte]: history } },
                include: [
                    {
                        model: this.history,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'employeeId', 'tanggalId'] },
                        include: [
                            {
                                model: this.employee,
                                attributes: { exclude: ['personalInfoId', 'contactInfoId', 'workInfoId', 'createdAt', 'updatedAt', 'deletedAt'] },
                                include: [
                                    {
                                        model: this.personalInfo,
                                        attributes: { exclude: ['addressId', 'createdAt', 'updatedAt', 'deletedAt'] },
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
                            }
                        ]
                    }
                ]
            });
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-EMPLOYEE-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }

    async addNewEmployee(data) {
        const trx = await sequelize.transaction();
        let newEmployee;
        try {
            newEmployee = await this.employee.create({}, { transaction: trx });
            let personalInfo = await this.personalInfo.create(data.personalInfo, { transaction: trx });
            let contactInfo = await this.contactInfo.create(data.contactInfo, { transaction: trx });
            let workInfo = await this.workInfo.create(data.workInfo, { transaction: trx });
            let address = await this.address.create(data.personalInfo.address, { transaction: trx });

            newEmployee.setPersonalInfo(personalInfo);
            newEmployee.setContactInfo(contactInfo);
            newEmployee.setWorkInfo(workInfo);
            personalInfo.setAddress(address);


            let last = await this.tanggal.findOne(
                {
                    where: { tanggal: tanggal }
                }
            );

            let history = await this.history.create({ status: "Post" }, { transaction: trx });
            if (last) {
                history.setTanggal(last)
            } else {
                let newLast = await this.tanggal.create({ tanggal: tanggal }, { transaction: trx });
                history.setTanggal(newLast);
            }

            history.setEmployee(newEmployee);
            trx.commit();
        } catch (e) {
            await trx.rollback();
            logEvent.emit('APP-ERROR', {
                logTitle: 'POST-EMPLOYEE-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return newEmployee;
    }

    async updateEmployeeProfile(id, data) {
        let personalId;
        let contactId;
        let workId;
        let addressId;

        const employee = await this.employee.findByPk(id, { include: [{ model: this.personalInfo, attributes: ['addressId'] }] });
        if (employee) {
            personalId = employee.personalInfoId;
            contactId = employee.contactInfoId;
            workId = employee.workInfoId;
            if (personalId) {
                addressId = employee.personalInfo.addressId;
            }

            const trx = await sequelize.transaction();
            let result;
            try {
                if (data.personalInfo) {
                    await this.personalInfo.update(data.personalInfo, { where: { id: personalId }, transaction: trx });

                    if (data.personalInfo.address) {
                        await this.address.update(data.personalInfo.address, { where: { id: addressId }, transaction: trx });
                    }
                }

                if (data.contactInfo) {
                    await this.contactInfo.update(data.contactInfo, { where: { id: contactId }, transaction: trx, });
                }

                if (data.workInfo) {
                    await this.workInfo.update(data.workInfo, { where: { id: workId }, transaction: trx });
                }


                let last = await this.tanggal.findOne(
                    {
                        where: { tanggal: tanggal }
                    }
                );

                let notify = { id: id }
                result = await this.employee.update(notify, { where: { id: id } });
                let history = await this.history.create({ status: "Update" }, { transaction: trx });
                if (last) {
                    history.setTanggal(last)
                } else {
                    let newLast = await this.tanggal.create({ tanggal: tanggal }, { transaction: trx });
                    history.setTanggal(newLast);
                }


                history.setEmployee(employee);

                await trx.commit();

            } catch (e) {
                await trx.rollback();
                logEvent.emit('APP-ERROR', {
                    logTitle: 'UPDATE-EMPLOYEE-SERVICE-FAILED',
                    logMessage: e
                });
                throw new Error(e);
            }
            return result;
        } else {
            throw new Error("No Employee Found");
        }
    }

    async deleteAnEmployee(id) {
        try {
            await this.employee.destroy({ where: { id: id } });
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'DELETE-EMPLOYEE-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return;
    }
}

module.exports = EmployeeService;
