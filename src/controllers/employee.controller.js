const getEmployeeInformation = async (req, res, service) => {
    try {
        let result;
        const history = req.query.history;
        const id = req.query.id;
        const name = req.query.name;
        if (id) {
            result = await service.getInformationById(id);
        } else if (history) {
            result = await service.syncInformation(history);
        } else if (name) {
            result = await service.getInformationByName(name);
        } else {
            result = await service.getAllInformation();
        }
        res.status(200);
        res.json(result);
    } catch (e) {
        res.status(500);
        res.json(e.message);
    }
}

const addEmployee = async (req, res, service) => {
    let result;
    let data = req.body;
    try {
        result = await service.addNewEmployee(data);
        res.status(200);
        res.json(result);
    } catch (e) {
        res.status(500);
        res.json(e.message);
    }
}

const updateProfile = async (req, res, service) => {
    let result;
    let id = req.query.id;
    let data = req.body;
    try {
        result = await service.updateEmployeeProfile(id, data);
        res.status(200);
        res.json(result);
    } catch (e) {
        res.status(500);
        res.json(e.message);
    }
}

const deleteEmployee = async (req, res, service) => {
    let id = req.query.id;
    try {
        await service.deleteAnEmployee(id);
        res.status(200);
        res.json(`Employee with id=${id} has been removed`)
    } catch (e) {
        res.status(500);
        res.json(e.message);
    }
}
module.exports = { getEmployeeInformation, addEmployee, updateProfile, deleteEmployee };
