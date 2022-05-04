module.exports = (sequelize, DataTypes) => {
    const Airports = sequelize.define("Airports", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        airlines: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Airports;
};