module.exports = (sequelize, DataTypes) => {
    const Airlines = sequelize.define("Airlines", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Airlines;
};