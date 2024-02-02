import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import memory from 'memory-cache';
import { join } from 'path';

const IsVercel: boolean = !!process.env.VERCEL_REGION;
const cacheDirectory = process.env.TEMP_DIR || '.temp';
if (!IsVercel && !existsSync(cacheDirectory)) mkdirSync(cacheDirectory, { recursive: true });

const cache = {
    get: (name: string) => {
        if (IsVercel) return memory.get(name);
        const filePath = join(cacheDirectory, `${name}.json`);
        return existsSync(filePath) ? JSON.parse(readFileSync(filePath, 'utf-8')) : null;
    },
    set: (name: string, data: any, time?: number): void => {
        if (IsVercel) {
            memory.put(name, data, time || 0);
        } else {
            const filePath = join(cacheDirectory, `${name}.json`);
            writeFileSync(filePath, JSON.stringify(data));
            if (time) setTimeout(() => unlinkSync(filePath), time);
        }
    },
};

export default cache;
