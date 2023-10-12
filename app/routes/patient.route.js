module.exports = app => {
    const { authJwt } = require("../middleware");
    const patients = require("../controllers/patient.controller");
  
    var router = require("express").Router({ mergeParams: true });
  
    // Create a new Tutorial
    router.post("/",[authJwt.verifyToken, authJwt.isClerk], patients.create);
  
    // Retrieve all Tutorials
    router.get("/", [authJwt.verifyToken, authJwt.isClerkOrNurse], patients.findAll);

    app.use('/api/patients', router);
  };