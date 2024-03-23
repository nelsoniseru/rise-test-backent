import { DataTypes, Model, Sequelize } from 'sequelize';
import Post from '../posts/posts.model'; // Import the Post model
import DatabaseService from '../utils/configuration/db'
const sequelize = DatabaseService.getSequelizeInstance();
interface UserAttributes {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public name!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  sequelize,
  modelName: 'User',
  freezeTableName:true
});

User.hasMany(Post, { foreignKey: 'userId',onDelete: 'CASCADE' }); 
Post.belongsTo(User, { foreignKey: 'userId',onDelete: 'CASCADE'  }); 

export default User;