import jwt from 'jsonwebtoken';
import {redis} from '../configuration/redis'
const authenticateToken = async(req, res, next) => {
    if (!req.header('Authorization')) return res.status(401).send('Access denied. Token not provided.');
    
    const headerToken = req.header('Authorization').split(' ')[1];
    const cachedToken = await redis.get("userToken")
    const token = headerToken || cachedToken
    if (!token)  return res.status(401).send('Access denied. Token not provided.');

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) return res.status(401).send('Access denied. Invalid token.');
      
      req.user = user;
      return next();
    });
    return undefined;
  };

  export {
    authenticateToken
  }