import { Sequelize, DataTypes, Model } from 'sequelize'
import DatabaseService from '../utils/configuration/db'
const sequelize = DatabaseService.getSequelizeInstance();

class Comment extends Model { }

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }

}, {
    sequelize,
    modelName: 'Comment',
    freezeTableName:true
})


export default Comment