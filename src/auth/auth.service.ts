import User from '../users/users.model'
import { hashPassword } from '../utils/helper/passwordHash'
import { generateToken } from '../utils/helper/generateToken'
import bcrypt from 'bcryptjs';
import {redis} from '../utils/configuration/redis'

class AuthService {

  async PostRegister(email:string,name:string,password:string) {
    if(await User.findOne({where:{email}})) throw new Error('username already exist');
    const hash = await hashPassword(password)
    const newUser = await User.create({ 
      email,
      name,
      password:String(hash),
  });
  return generateToken(newUser)
  }


  async PostLogin(email:string,password:string) {
    const user = await User.findOne({where:{email}})
    if (!user) throw new Error('Invalid email or password..');
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password..');
    }    
   let token = generateToken(user)
  redis.set("userToken", token,'EX',process.env.REDIS_EXPIRE_IN);
  return token
  }
}

export default new AuthService() ;
