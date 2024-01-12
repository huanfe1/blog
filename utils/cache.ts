import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export function Cache(cachePath: string) {
    const cacheDirectory = join(cachePath, '/');
    !existsSync(cacheDirectory) && !process.env.VERCEL_REGION && mkdirSync(cacheDirectory, { recursive: true });
    return {
        get: (name: string): any => {
            const filePath = join(cacheDirectory, `${name}.json`);
            return existsSync(filePath) ? JSON.parse(readFileSync(filePath, 'utf-8')) : null;
        },
        set: (name: string, data: any): void => {
            writeFileSync(join(cacheDirectory, `${name}.json`), JSON.stringify(data));
        },
    };
}
