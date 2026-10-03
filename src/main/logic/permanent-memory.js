import fs from 'fs';
import path from 'path';
export default function registerPermanentMemory({ ipcMain, app }) {
    const MEMORY_DIR = path.resolve(app.getPath('userData'), 'Memory');
    const FILE_PATH = path.join(MEMORY_DIR, 'saved-user-memory.json');
    if (!fs.existsSync(MEMORY_DIR))
        fs.mkdirSync(MEMORY_DIR, { recursive: true });
    ipcMain.handle('save-core-memory', async (_event, fact) => {
        try {
            let memoryBank = [];
            if (fs.existsSync(FILE_PATH)) {
                const data = fs.readFileSync(FILE_PATH, 'utf-8');
                memoryBank = data ? JSON.parse(data) : [];
            }
            memoryBank.push({
                fact: fact,
                timestamp: new Date().toISOString()
            });
            fs.writeFileSync(FILE_PATH, JSON.stringify(memoryBank, null, 2));
            return true;
        }
        catch (err) {
            return false;
        }
    });
    ipcMain.handle('search-core-memory', async () => {
        try {
            if (fs.existsSync(FILE_PATH)) {
                const data = fs.readFileSync(FILE_PATH, 'utf-8');
                return data ? JSON.parse(data) : [];
            }
            return [];
        }
        catch (err) {
            return [];
        }
    });
}
