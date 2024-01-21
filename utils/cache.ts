import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const IsVercel: boolean = !!process.env.VERCEL_REGION;
const cacheDirectory = process.env.TEMP_DIR || '.temp';
export function cache() {
    if (!IsVercel && !existsSync(cacheDirectory)) mkdirSync(cacheDirectory, { recursive: true });
    return {
        get: (name: string): any => {
            if (IsVercel) {
                console.log(`get ${name}`);
                return;
            }
            const filePath = join(cacheDirectory, `${name}.json`);
            return existsSync(filePath) ? JSON.parse(readFileSync(filePath, 'utf-8')) : null;
        },
        set: (name: string, data: any): void => {
            if (IsVercel) return;
            writeFileSync(join(cacheDirectory, `${name}.json`), JSON.stringify(data));
        },
    };
}
