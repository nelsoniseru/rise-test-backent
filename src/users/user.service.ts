import User from './users.model'
import Post from '../posts/posts.model'
import Comment from '../comments/comments.model'
import { Sequelize, Op,QueryTypes } from 'sequelize';
import DatabaseService from '../utils/configuration/db';
const sequelize = DatabaseService.getSequelizeInstance();
class UserService {

  async GetUsers() {
    return await User.findAll({})
  }
  async GetUser(user) {
    return await User.findOne({where:{id:user.id}})
  }
  async GetTopUserWithMostComment(){
    const topUsersQuery = await User.findAll({
      attributes: ['id', 'name'], 
      include: [
        {
          model: Post,
          attributes: ['title'], 
          // include: [
          //   {
          //     model: Comment,
          //     attributes: ['content'],

          //     separate: true, // Retrieve comments in separate rows
          //     order: [['createdAt', 'DESC']],
          //     limit: 1
          //   }
          // ]
        }
      ],
      order: [[sequelize.literal('(SELECT COUNT(*) FROM "Post" WHERE "Post"."userId" = "User"."id")'), 'DESC']], // Order by count of posts in descending order
      limit: 3 // Limit the results to top 3 users
    });
    // Execute the query and return the result
    return topUsersQuery;
  }
}

export default new UserService() ;
