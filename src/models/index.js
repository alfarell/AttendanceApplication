const Staff = require('./staff.model');
const Employee = require('./employee.model');
const Present = require('./present.model');
const Address = require('./address.model');
const PersonalInfo = require('./personal.info.model');
const ContactInfo = require('./contact.info.model');
const WorkInfo = require('./work.info.model');
const History = require('./history.model');
const Tanggal = require('./tanggal.model');
const Admin = require('./admin.model');

const dbAssociation = function dbAssociation(){
    Present.belongsTo(Employee);
    Employee.hasMany(Present);

    Employee.belongsTo(PersonalInfo);
    Employee.belongsTo(ContactInfo);
    Employee.belongsTo(WorkInfo);
    History.belongsTo(Employee);
    History.belongsTo(Tanggal);
    Tanggal.hasMany(History);
    
    Staff.belongsTo(PersonalInfo);
    Staff.belongsTo(ContactInfo);
    Staff.belongsTo(WorkInfo);
    Admin.belongsTo(Staff);

    PersonalInfo.belongsTo(Address);
    Address.hasMany(PersonalInfo);

}

module.exports = dbAssociation;
