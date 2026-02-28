import dotenv from 'dotenv';
import { resolve } from 'node:path';

dotenv.config({ path: resolve(process.cwd(), '../.env') });

interface Config {
    port: number;
    nodeEnv: string;
}

const config: Config = {
    port: Number(process.env['SERVER_PORT']) || 3000,
    nodeEnv: process.env['SERVER_NODE_ENV'] || 'development',
};

export default config;