import * as fs from 'fs';
import * as path from 'path';

// Function to read input file and return the data
export function readInput(day: string): string {
    console.log(__dirname)
    const filePath = path.join(__dirname, `../inputs/input-${day}.txt`);
    return fs.readFileSync(filePath, 'utf-8');
}