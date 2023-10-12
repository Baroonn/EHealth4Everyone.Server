const db = require("../models");
const Vital = db.vitals;
const Patient = db.patients;
const Op = db.Sequelize.Op;
const userExists = async (patient_id)=>{
    var patient = await Patient.findByPk(patient_id);
    console.log(patient);
    return patient != null;
}
// Create and Save a new Tutorial
exports.create = async (req, res) => {

    // if (!req.body.surname || !req.body.first_name || !req.body.gender || !req.body.birth_date || !req.body.patient_id) {
    //     res.status(400).json({
    //         success: false,
    //         status_code: 400,
    //         message: "Some fields are missing!"
    //     });
    //     return;
    // }
    if(!(await userExists(req.params.patient_id))){
        return res.status(404).json({
            success: false,
            status_code: 404,
            message: "Patient not found"});
    }
    var vital = {
        temp: req.body.temp,
        height: req.body.height,
        weight: req.body.weight,
        pulse_rate: req.body.pulse_rate,
        blood_pressure: req.body.blood_pressure,
        patient_id: req.params.patient_id,
        bmi: req.body.bmi
    }

    Vital.create(vital)
        .then(data => {
            res.status(201).json({
                success: true,
                status_code: 201,
                message: "Patient vital created successfully",
                data});
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                status_code: 500,
                message: err.message || "Some error occurred while creating the Patient vital."});
        });
}

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    var patient_id = req.params.patient_id;
    if(!(await userExists(patient_id))){
        return res.status(404).json({
            success: false,
            status_code: 404,
            message: "Patient not found"});
    }

    var condition = patient_id ? { patient_id: { [Op.eq]: `${patient_id}` } } : null;
    Vital.findAll({where: condition})
        .then(data => {
            res.status(200).json({
                success: true,
                status_code: 200,
                message:"Patient vitals retrieved successfully",
                data});
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                status_code: 500,
                message: err.message || "Some error occurred while retrieving vitals."});
        });
}