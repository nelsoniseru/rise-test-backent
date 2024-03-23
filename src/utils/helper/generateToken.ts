import jwt from 'jsonwebtoken';
const generateToken = (user) => {

    const payload = {
      id: user.id,
      username: user.username,
    };
    return jwt.sign(payload, process.env.SECRET, { expiresIn: process.env.EXPIRES_IN });
  };
export {
    generateToken
}