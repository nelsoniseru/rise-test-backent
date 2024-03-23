const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS);
export {
    redis
}