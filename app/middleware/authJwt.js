const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token,
    config.secret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    });
};

isClerk = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "clerk") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Clerk Role!"
      });
      return;
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

isNurse = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "nurse") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Nurse Role!"
      });
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

isClerkOrNurse = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "clerk") {
          next();
          return;
        }

        if (roles[i].name === "nurse") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Clerk or Nurse Role!"
      });
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isNurse: isNurse,
  isClerk: isClerk,
  isClerkOrNurse: isClerkOrNurse
};
module.exports = authJwt;