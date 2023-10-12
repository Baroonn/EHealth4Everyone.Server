module.exports = (sequelize, Sequelize) => {
    const Vital = sequelize.define("vital", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        temp: {
            type: Sequelize.STRING,
            allowNull: false
        },
        height: {
            type: Sequelize.STRING,
            allowNull: false
        },
        weight: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pulse_rate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        blood_pressure: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bmi: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Vital;
};