const connection = require('./dbConn');
const dateFormat = require('dateformat');

const Staff = require('../src/models/staff.model');
const Employee = require('../src/models/employee.model');
const Address = require('../src/models/address.model');
const Present = require('../src/models/present.model');
const PersonalInfo = require('../src/models/personal.info.model');
const ContactInfo = require('../src/models/contact.info.model');
const WorkInfo = require('../src/models/work.info.model');


const dbAssociation = require('../src/models/index');
const tanggal = dateFormat(new Date(), 'yyyy-mm-dd');
const jam = dateFormat(new Date(), 'HH:MM:ss');

async function migration() {
    dbAssociation();
    await connection.sync({ force: true });
    await dataDummy();
}

async function dataDummy() {
    let address01 = await Address.create({
        village: "Kampung Sawah",
        street: "Ursula",
        district: "Jatisampurna",
        province: "West Java"
    });

    let address02 = await Address.create({
        village: "Lebak Bulus",
        street: "Majapahit",
        district: "Cilandak",
        province: "Jakarta"
    });

    let address03 = await Address.create({
        village: "Sukadarma",
        street: "Rambutan",
        district: "Pinangranti",
        province: "Jakarta"
    });

    let address04 = await Address.create({
        village: "Gempura",
        street: "Setu",
        district: "Cipayung",
        province: "Jakarta"
    });

    let address05 = await Address.create({
        village: "Puri Gading",
        street: "Puri Gading Raya",
        district: "Jatimelati",
        province: "Jawa Barat"
    });

    let address06 = await Address.create({
        village: "Tambakrejo",
        street: "WR Supratman",
        district: "Purworejo",
        province: "Jawa Tengah"
    });

    let personalInfo01 = await PersonalInfo.create({
        name: "Agam Herlambang",
        birthPlace: "Bandung",
        birthDate: "2000-04-30",
        bloodType: "AB",
    });

    let contactInfo01 = await ContactInfo.create({
        phoneNumber: "089712341235",
        email: "employee01@gmail.com",
        familyContact: "089898981234"
    });

    let workInfo01 = await WorkInfo.create({
        qrId: "6868",
        nfcId: "A0353400E200001965170049",
        salary: 4500000,
        dept: "Perikanan",
        simperIdCard: 'abba',
        title: "Karyawan"
    })


    let employee01 = await Employee.create();
    employee01.setPersonalInfo(personalInfo01);
    employee01.setContactInfo(contactInfo01);
    employee01.setWorkInfo(workInfo01);
    personalInfo01.setAddress(address01);

    let personalInfo02 = await PersonalInfo.create({
        name: "Bagus Hendrawan",
        birthDate:"2000-06-21",
        birthPlace: "Bekasi",
        bloodType: "O"
    });

    let contactInfo02 = await ContactInfo.create({
        phoneNumber: "081281718585",
        email: "employee02@gmail.com",
        familyContact: "089712340897"
    });

    let workInfo02 = await WorkInfo.create({
        qrId: '6865',
        nfcId: '97E03400E200001965170239',
        salary: 3000000,
        dept: "Perhutanan",
        simperIdCard: 'aaca',
        title: "Karyawan"
    });

    let employee02 = await Employee.create();
    employee02.setPersonalInfo(personalInfo02);
    employee02.setContactInfo(contactInfo02);
    employee02.setWorkInfo(workInfo02);
    personalInfo02.setAddress(address02);

    let personalInfo03 = await PersonalInfo.create({
        name: "Philips Frank",
        birthDate:"1999-11-21",
        birthPlace: "Jakarta",
        bloodType: "A"
    });

    let contactInfo03 = await ContactInfo.create({
        phoneNumber: "089876765454",
        email: "employee03@gmail.com",
        familyContact: "087817176464"
    });

    let workInfo03 = await WorkInfo.create({
        qrId: '321',
        nfcId: 'B06C3000E200001965170151',
        salary: 3500000,
        dept: "Perhutanan",
        simperIdCard: 'aada',
        title: "Karyawan"
    });

    let employee03 = await Employee.create();
    employee03.setPersonalInfo(personalInfo03);
    employee03.setContactInfo(contactInfo03);
    employee03.setWorkInfo(workInfo03);
    personalInfo03.setAddress(address03);

    let personalInfo04 = await PersonalInfo.create({
        name: "Kevin Gunawan",
        birthDate: "1997-10-15",
        birthPlace: "Sumatra Barat",
        bloodType: "AB"
    });

    let contactInfo04 = await ContactInfo.create({
        phoneNumber: "087913134141",
        email: "employee04@gmail.com",
        familyContact: "081287875252"
    });

    let workInfo04 = await WorkInfo.create({
        qrId: '612',
        nfcId: 'A4543400E200001965170147',
        salary: 4000000,
        dept: "Perikanan",
        simperIdCard: 'aaea',
        title: "Karyawan"
    });

    let employee04 = await Employee.create();
    employee04.setPersonalInfo(personalInfo04);
    employee04.setContactInfo(contactInfo04);
    employee04.setWorkInfo(workInfo04);
    personalInfo04.setAddress(address04);

    let personalInfo05 = await PersonalInfo.create({
        name: "Jodi Ferniawan",
        birthDate: "2001-12-12",
        birthPlace: "Kalimantan Timur",
        bloodType: "O"
    });

    let contactInfo05 = await ContactInfo.create({
        phoneNumber: "081375754774",
        email: "employee05@gmail.com",
        familyContact: "089752517372"
    });

    let workInfo05 = await WorkInfo.create({
        qrId: '341',
        nfcId: '218A3000E200001965170273',
        salary: 4200000,
        dept: "Pertambangan",
        simperIdCard: 'aeea',
        title: "Karyawan"
    });

    let employee05 = await Employee.create();
    employee05.setPersonalInfo(personalInfo05);
    employee05.setContactInfo(contactInfo05);
    employee05.setWorkInfo(workInfo05);
    personalInfo05.setAddress(address05);

    let personalInfo06 = await PersonalInfo.create({
        name: "Alfarell Muchamad Yuwanto",
        birthDate: "2000-03-15",
        birthPlace: "Purworejo",
        bloodType: "B"
    });

    let contactInfo06 = await ContactInfo.create({
        phoneNumber: "081286411234",
        email: "malfarell@gmail.com",
        familyContact: "087976549876"
    });

    let workInfo06 = await WorkInfo.create({
        qrId: null,
        nfcId: null,
        salary: 7000000,
        dept: "Perhutanan",
        simperIdCard: 'simper',
        title: "Staff"
    });

    let staff01 = await Staff.create(
        {
            "googleId": "ygEqFhOT0fN9g695UUa3JtLOrQ52",
        }
    );
    staff01.setPersonalInfo(personalInfo06);
    staff01.setContactInfo(contactInfo06);
    staff01.setWorkInfo(workInfo06);
    personalInfo06.setAddress(address06);

    let present01 = await Present.create({ tanggal: tanggal, jamMasuk: jam });
    present01.setEmployee(employee01);

    let present02 = await Present.create({ tanggal: tanggal, jamMasuk: jam });
    present02.setEmployee(employee02);
}

migration();