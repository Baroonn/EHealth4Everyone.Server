const db = require("../models");
const Patient = db.patients;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

    // if (!req.body.surname || !req.body.first_name || !req.body.gender || !req.body.birth_date || !req.body.patient_id) {
    //     res.status(400).json({
    //         success: false,
    //         status_code: 400,
    //         message: "Some fields are missing!"
    //     });
    //     return;
    // }
    var patient = {
        surname: req.body.surname,
        middle_name: req.body.middle_name,
        first_name: req.body.first_name,
        gender: req.body.gender,
        birth_date: req.body.birth_date,
        patient_no: req.body.patient_no,
        phone_no: req.body.phone_no
    }

    Patient.create(patient)
        .then(data => {
            res.status(201).json({
                success: true,
                status_code: 201,
                message: "Patient created successfully",
                data});
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                status_code: 500,
                message: err.message || "Some error occurred while creating the Patient."});
        });
}

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    Patient.findAll()
        .then(data => {
            res.status(200).json({
                success: true,
                status_code: 200,
                message:"Patients retrieved successfully",
                data});
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                status_code: 500,
                message: err.message || "Some error occurred while retrieving patients."});
        });
}