import { DataTypes, Model, Sequelize } from 'sequelize';
import Comment from '../comments/comments.model'; 
import DatabaseService from '../utils/configuration/db'
const sequelize = DatabaseService.getSequelizeInstance();

class Post extends Model {}
Post.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
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
  modelName: 'Post',
  freezeTableName:true
});
Post.hasMany(Comment, { foreignKey: 'postId' ,onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId',onDelete: 'CASCADE'  });

export default Post;