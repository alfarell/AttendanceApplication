const dotenv = require('dotenv');
const logEvent = require('../events/myEmitter');

dotenv.config();

class AuthService {
    constructor(staff, personalInfo, contactInfo, workInfo, address) {
        this.staff = staff
        this.personalInfo = personalInfo
        this.contactInfo = contactInfo
        this.workInfo = workInfo
        this.address = address
    }

    async authenticate(id, img) {
        let authUser;
        try {
            let profileData = await this.staff.findByPk(id);
            if (!profileData) {
                authUser = null;
            } else {
                let profileImage = await this.personalInfo.findByPk(profileData.personalInfoId);
                if (!profileImage.photo) {
                    profileImage.photo = img;
                    await profileImage.save();
                }

                authUser = await this.staff.findByPk(id, {
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
}

module.exports = AuthService;
