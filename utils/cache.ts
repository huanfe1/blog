import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export function Cache(path: string) {
    if (!existsSync(path)) mkdirSync(path, { recursive: true });

    let cache = this;

    cache.get = (name: string) => {
        if (existsSync(join(path, `${name}.json`))) {
            return JSON.parse(readFileSync(join(path, `${name}.json`), 'utf-8'));
        }
        return null;
    };

    cache.set = (name: string, data: any) => {
        writeFileSync(join(path, `${name}.json`), JSON.stringify(data));
    };
}
