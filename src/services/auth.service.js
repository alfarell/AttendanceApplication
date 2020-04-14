const logEvent = require('../events/myEmitter');
const bcrypt = require('bcryptjs');

class AuthService {
    constructor(staff, personalInfo, contactInfo, workInfo, address, admin) {
        this.staff = staff
        this.personalInfo = personalInfo
        this.contactInfo = contactInfo
        this.workInfo = workInfo
        this.address = address
        this.admin = admin
    }

    async authenticate(email, img) {
        let authUser;
        try {
            let profileData = await this.staff.findOne({
                include: [
                    {
                        model: this.contactInfo,
                        where: { email: email }
                    }
                ]
            });
            if (!profileData) {
                authUser = null;
            } else {
                let profileImage = await this.personalInfo.findByPk(profileData.personalInfoId);
                if (!profileImage.photo) {
                    profileImage.photo = img;
                    await profileImage.save();
                }
                authUser = await this.staff.findOne({
                    include: [
                        {
                            model: this.personalInfo,
                            attributes: { exclude: ['id', 'addressId', 'createdAt', 'updatedAt', 'deletedAt'] },
                            include: [
                                {
                                    model: this.address,
                                    attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'deletedAt'] }
                                }
                            ]
                        },
                        {
                            model: this.contactInfo,
                            attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'deletedAt'] },
                            where: { email: email }
                        },
                        {
                            model: this.workInfo,
                            attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'deletedAt'] },
                        }
                    ],
                    attributes: { exclude: ['personalInfoId', 'contactInfoId', 'workInfoId', 'createdAt', 'updatedAt', 'deletedAt'] }
                });
            }
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-TOKEN-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return authUser;
    }

    async authAdmin(user) {
        const { userName, userPassword } = user;
        let authUser;
        try {
            authUser = await this.admin.findOne({
                where: {
                    userName: userName
                }
            });
            const matchPassword = bcrypt.compareSync(userPassword, authUser.userPassword);
            if (matchPassword) {
                authUser = await this.admin.findOne({
                    where: {
                        userName: userName
                    },
                    include: [
                        {
                            model: this.staff,
                            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'personalInfoId', 'contactInfoId', 'workInfoId'] },
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
                    ],
                    attributes: { exclude: ['userPassword', 'createdAt', 'updatedAt', 'deletedAt', 'staffGoogleId'] }
                })
            } else {
                authUser = null;
            }
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-TOKEN-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return authUser;
    }
}

module.exports = AuthService;
