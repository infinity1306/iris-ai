import fs from 'fs';
import path from 'path';
export default function registerIpcHandlers({ ipcMain, app }) {
    const CHAT_DIR = path.resolve(app.getPath('userData'), 'Chat');
    const FILE_PATH = path.join(CHAT_DIR, 'iris_memory.json');
    ipcMain.removeHandler('add-message');
    ipcMain.removeHandler('get-history');
    ipcMain.handle('add-message', async (_event, msg) => {
        try {
            if (!fs.existsSync(CHAT_DIR))
                fs.mkdirSync(CHAT_DIR, { recursive: true });
            let history = [];
            if (fs.existsSync(FILE_PATH)) {
                const data = fs.readFileSync(FILE_PATH, 'utf-8');
                history = data ? JSON.parse(data) : [];
            }
            const newEntry = {
                role: msg.role,
                content: msg.parts[0].text,
                timestamp: new Date().toISOString()
            };
            history.push(newEntry);
            if (history.length > 20)
                history = history.slice(-20);
            fs.writeFileSync(FILE_PATH, JSON.stringify(history, null, 2));
            return true;
        }
        catch (err) {
            return false;
        }
    });
    ipcMain.handle('get-history', async () => {
        try {
            if (fs.existsSync(FILE_PATH)) {
                const data = fs.readFileSync(FILE_PATH, 'utf-8');
                const raw = JSON.parse(data);
                return raw.map((m) => ({
                    role: m.role === 'iris' ? 'model' : m.role,
                    parts: [{ text: m.content }]
                }));
            }
        }
        catch (err) { }
        return [];
    });
}
