require('dotenv').config();
import express, {Request,Response, NextFunction} from 'express';
import redis, { ClientOpts } from 'redis';

const REDIS_PORT: any = process.env.PORT || 5000;

const client = redis.createClient(REDIS_PORT);

const cache = (req: Request, res: Response, next: NextFunction) => {
    
}

