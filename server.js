const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
db.sequelize.sync({ alter: true }).then(() => {
    //console.log("Drop and re-sync db.");
    initial();
});
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to EHealth4Everyone application." });
});

require('./app/routes/auth.route')(app);
require("./app/routes/patient.route")(app);
require("./app/routes/vital.route")(app);
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

async function initial() {

    Role.findOrCreate({
        where: {
            name: "clerk"
        }
    });

    Role.findOrCreate({
        where: {
            name: "nurse"
        }
    });
}