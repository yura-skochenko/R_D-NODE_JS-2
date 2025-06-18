import fs from 'fs';
import path from 'path';

export function loadEnv() {
    const envPath = path.resolve(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) return;
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const [key, ...vals] = trimmed.split('=');
        if (!key) return;
        const value = vals.join('=').trim();
        process.env[key.trim()] = value;
    });
}
