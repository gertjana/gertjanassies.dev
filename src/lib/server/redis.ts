import Redis from 'ioredis';
import { dev } from '$app/environment';

export const redis = () => {
    let connection = process.env.REDIS_CONNECTION ?? "redis://192.168.215.2:6379";
    console.log("redis connection", connection);
    return new Redis(connection);    
}
