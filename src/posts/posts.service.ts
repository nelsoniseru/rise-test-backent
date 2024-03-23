import Post from './posts.model'
import User from '../users/users.model'
import Comment from '../comments/comments.model'


class PostService {

  async PostCreateNewPost(title:string,content:string,user:any) {
   let newPost = await Post.create({
    title,
    content,
    userId:user.id
   })
   return newPost
  }

  async GetPosts(user) {
   return await Post.findAll({
        where:{userId:user.id},
    include: [{
        model: Comment,
    }],
})
   }
   async PostCreateComment(content:string,postId:number) {
   let post = await  Post.findOne({where:{id:postId}})
     if(!post) throw new Error("post not found")
    let newComment = await Comment.create({
        content,
        postId
       })
       return newComment
    }

}

export default new PostService() ;
