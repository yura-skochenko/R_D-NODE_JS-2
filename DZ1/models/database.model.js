import { readFileSync, writeFileSync } from 'fs';

const DB_PATH = './database.json';

export function readDatabase () {
    const data = readFileSync(DB_PATH, 'utf8');

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading database: ${error}`);

        return [];
    }
}

export function writeDatabase (data) {
    try {
        const json = JSON.stringify(data);

        writeFileSync(DB_PATH, json, 'utf8');
    } catch (error) {
        console.error(`Error writing database: ${error}`);
    }

}