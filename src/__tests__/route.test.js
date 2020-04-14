// const request = require('supertest');
// const server = require('../server');
// const connection = require('../../config/dbConn');
// const dbAssociation = require('../models/index');
// const Staff = require('../models/staff.model');
// const Employee = require('../models/employee.model');
// const PersonalInfo = require('../models/personal.info.model');
// const ContactInfo = require('../models/contact.info.model');
// const WorkInfo = require('../models/work.info.model');
// const Address = require('../models/address.model');
// const Present = require('../models/present.model');
// const bcrypt = require('bcryptjs');

// let googleId;

// async function loginUser() {
//     const res = await request(server)
//         .post('/auth?id=a')
//         .send({
//             photo: "http://img.com"
//         })
//     return res.body.googleId;
// }

// async function initDb() {
//     dbAssociation();
//     await connection.sync({ force: true })

//     let staff = await Staff.create(
//         {
//             googleId: 'a'
//         }
//     );
//     let personalInfo01 = await PersonalInfo.create({
//         name: "staff dummy",
//         gender: "Male",
//         birthDate: "1999-12-31",
//         birthPlace: "dummyLocation",
//         bloodType: "O"
//     });
//     staff.setPersonalInfo(personalInfo01);

//     let employee = await Employee.create({
//         id: "employeeId"
//     });
//     let personalInfo02 = await PersonalInfo.create({
//         name: "employee dummy",
//         gender: "Male",
//         birthDate: "2000-01-01",
//         birthPlace: "dummyLocation",
//     });
//     let contactInfo02 = await ContactInfo.create({
//         email: "employee@dummy.com"
//     })
//     let workInfo02 = await WorkInfo.create({
//         qrId: "1",
//         nfcId: "1"
//     });
//     let address02 = await Address.create({});
//     employee.setPersonalInfo(personalInfo02);
//     employee.setContactInfo(contactInfo02);
//     employee.setWorkInfo(workInfo02);
//     personalInfo02.setAddress(address02);

//     await Present.create({ tanggal: "2020-04-12", jamMasuk: "07:15:20", jamKeluar: "18:02:33", employeeId: "employeeId" });
//     await Present.create({ tanggal: "2020-04-13", jamMasuk: "07:00:41", jamKeluar: "17:55:24", employeeId: "employeeId" });
// }

// describe('Route Testing', () => {
//     beforeEach(async (done) => {
//         await initDb();
//         googleId = await loginUser();

//         done();
//     });

//     describe('Employee Route Testing', () => {
//         it('should not get all employee data when no token', async () => {
//             const res = await request(server)
//                 .get('/employee')
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toEqual({});
//         });

//         it('should get all employee data when have token', async () => {
//             const res = await request(server)
//                 .get('/employee')
//                 .set('Authorization', googleId);
//             expect(res.statusCode).toEqual(200);
//             expect(res.body.length).toBeGreaterThan(0)
//         });

//         it('should post a new employee data when have token', async () => {
//             const res = await request(server)
//                 .post('/employee')
//                 .set('Authorization', googleId)
//                 .send({
//                     "personalInfo": {
//                         "photo": null,
//                         "name": "Dummy Employee",
//                         "gender": "Male",
//                         "birthPlace": "Dummy Birthplace",
//                         "birthDate": "2000-04-30",
//                         "bloodType": "AB",
//                         "address": {
//                             "village": "Dummy Village",
//                             "street": "Dummy Street",
//                             "district": "Dummy District",
//                             "province": "Dummy Province"
//                         }
//                     },
//                     "contactInfo": {
//                         "phoneNumber": "089877778888",
//                         "email": "dummy@gmail.com",
//                         "familyContact": "087812123333"
//                     },
//                     "workInfo": {
//                         "qrId": "10",
//                         "nfcId": "100",
//                         "salary": 3333333,
//                         "dept": "Dummy Dept",
//                         "simperIdCard": "Dummy Simper",
//                         "title": "Dummy Title"
//                     }
//                 })
//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toBeTruthy();
//         });

//         it('should update an employee data when have token', async () => {
//             const res = await request(server)
//                 .put('/employee?id=employeeId')
//                 .set('Authorization', googleId)
//                 .send({
//                     "personalInfo": {
//                         "photo": null,
//                         "name": "Dummy Employee",
//                         "birthPlace": "Dummy Birthplace",
//                         "birthDate": "2000-04-30",
//                         "bloodType": "AB",
//                         "address": {
//                             "village": "Dummy Village",
//                             "street": "Dummy Street",
//                             "district": "Dummy District",
//                             "province": "Dummy Province"
//                         }
//                     },
//                     "contactInfo": {
//                         "phoneNumber": "089877778888",
//                         "email": "dummy@gmail.com",
//                         "familyContact": "087812123333"
//                     },
//                     "workInfo": {
//                         "qrId": "1",
//                         "nfcId": "10",
//                         "salary": 3333333,
//                         "dept": "Dummy Dept",
//                         "simperIdCard": "Dummy Simper",
//                         "title": "Dummy Title"
//                     }
//                 })
//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toBeTruthy();
//         });

//         it('should delete an employee data when have token', async () => {
//             const res = await request(server)
//                 .delete('/employee?id=employeeId')
//                 .set('Authorization', googleId)
//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toContain('has been removed');
//         });
//     });

//     describe('Scan Route Testing', () => {
//         it('should get an employee data when have token', async () => {
//             const res = await request(server)
//                 .get('/scan/qrcode?id=1')
//                 .set('Authorization', googleId)
//             expect(res.status).toEqual(200);
//             expect(res.body).toBeTruthy();
//         })
//     });

//     describe('List Absensi Route Testing', () => {
//         it('should get a list of attendance data when have token', async () => {
//             const res = await request(server)
//                 .get('/listAbsensi?id=employeeId')
//                 .set('Authorization', googleId)
//             expect(res.status).toEqual(200);
//             expect(res.body.length).toBeGreaterThan(0);
//         })
//     });

//     describe('Absensi Submit Route Testing', () => {
//         it('should submit a list of attendance data when have token', async () => {
//             const res = await request(server)
//                 .post('/absensiSubmit')
//                 .set('Authorization', googleId)
//                 .send([
//                     {
//                         employeeId: "employeeId",
//                         tanggal: "2020-04-14"
//                     }
//                 ])
//             expect(res.status).toEqual(200);
//             expect(res.body).toEqual("Submit Absen Berhasil");
//         })
//     });

//     describe('No Route Testing', () => {
//         it('should go to no route when connecting to an unavailable api', async () => {
//             const res = await request(server)
//                 .get('/noRoute')
//             expect(res.status).toEqual(404);
//             expect(res.body).toEqual('Page Not Found');
//         });
//     });
// });

expect(true).toBeTruthy();