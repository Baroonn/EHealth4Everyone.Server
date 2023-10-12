module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define("patient", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        patient_no: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        middle_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn:{
                    args: [["Male", "Female"]],
                    msg: "Invalid gender"
                },             
            }  
        },
        birth_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        phone_no: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return Patient;
};