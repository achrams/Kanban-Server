'use strict';

const { generate } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {

    const { Model } = sequelize.Sequelize

    class User extends Model {}

    User.init({
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                isEmail: true,
                unique: true
            }
        },
        password: {
            type: DataTypes.STRING,
            notEmpty: true
        }
    }, {
        hooks: {
            beforeCreate: (User, options) => {
                User.password = generate(User.password)
            }
        },
        sequelize
    });
    User.associate = function(models) {
        User.hasMany(models.Kanban, { foreignKey: 'userId' })
    };
    return User;
};