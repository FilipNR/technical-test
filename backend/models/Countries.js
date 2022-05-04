module.exports = (sequelize, DataTypes) => {
    const Countries = sequelize.define("Countries", {
        country_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Countries;
};