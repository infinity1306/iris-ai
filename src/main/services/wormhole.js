import { startTunnel } from 'untun';
let activeTunnel = null;
export default function registerWormhole({ ipcMain }) {
    ipcMain.handle('open-wormhole', async (_event, port) => {
        try {
            if (activeTunnel) {
                await activeTunnel.close();
                activeTunnel = null;
            }
            activeTunnel = await startTunnel({
                port,
                acceptCloudflareNotice: true
            });
            const tunnelUrl = await activeTunnel.getURL();
            return {
                success: true,
                url: tunnelUrl,
                password: null
            };
        }
        catch (err) {
            return { success: false, error: String(err) };
        }
    });
    ipcMain.handle('close-wormhole', async () => {
        if (activeTunnel) {
            await activeTunnel.close();
            activeTunnel = null;
        }
        return { success: true };
    });
}
