import Redis from "ioredis";

// const client = new Redis({
//   host: process.env.REDIS_HOST,
//   port: Number(process.env.REDIS_PORT),
// });

const client = new Redis(process.env.Redis_URL);

client.on("connect", () => {
  console.log("Redis connected");
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

export default client;