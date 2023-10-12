module.exports = app => {
    const { authJwt } = require("../middleware");
    const vitals = require("../controllers/vital.controller");
  
    var router = require("express").Router({ mergeParams: true });
    // Create a new Tutorial
    router.post("/",[authJwt.verifyToken, authJwt.isNurse], vitals.create);
  
    // Retrieve all Tutorials
    router.get("/", [authJwt.verifyToken, authJwt.isNurse], vitals.findAll);

    app.use('/api/patients/:patient_id/vitals', router);
  };