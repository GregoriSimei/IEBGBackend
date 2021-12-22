const { Model, DataTypes } = require('sequelize');

class DictionaryLabels extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            type: DataTypes.STRING,
            ref: DataTypes.STRING,
            required: DataTypes.BOOLEAN,
            edit: DataTypes.BOOLEAN,
            hidden: DataTypes.BOOLEAN,
        }, {
            sequelize,
        });
    }

    static associate(models) {
        this.belongsTo(models.Dictionary, { foreignKey: 'dictionary_id', as: 'dictionary' });
    }
}

module.exports = DictionaryLabels;
