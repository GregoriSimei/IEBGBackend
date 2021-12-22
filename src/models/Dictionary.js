const { Model, DataTypes } = require('sequelize');

class Dictionary extends Model {
    static init(sequelize) {
        super.init({
            table_name: DataTypes.STRING,
        }, {
            sequelize,
        });
    }

    static associate(models) {
        this.hasMany(models.DictionaryLabels, { foreignKey: 'dictionary_id', as: 'labels' });
    }
}

module.exports = Dictionary;
