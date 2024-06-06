const redis = require("redis");

const client = redis.createClient({
  url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

const connectRedis = async () => {
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  console.log("Redis Connected!");
  client.quit()
};

const storage = async (userID, token) => {
  await client.connect();
  client.set(userID, token, "EX", 60 * 60 * 24, (err, reply) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      console.log("Token added to Redis:", reply);
      resolve(reply);
    }
  });
  client.quit()
};

const get = async (userID) => {
  await client.connect();
  const value = await client.get(userID, (err, reply) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      console.log("Token fetched from Redis:", reply);
      resolve(reply);
    }
  });
  client.quit()
  return value;
}

const del = async (userID) => {
  await client.connect();
  client.del(userID, (err, reply) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      console.log("Token deleted from Redis:", reply);
      resolve(reply);
    }
  });
  client.quit()

}

module.exports = {
  connectRedis,
  storage,
  get,
  del,
};
