import { CouncilOrchestrator } from './engine';
export default function registerCouncilHandlers(ipcMain) {
    const orchestrator = new CouncilOrchestrator(ipcMain);
    ipcMain.handle('start-council-session', async (_event, task, agentsConfig) => {
        try {
            const sessionId = await orchestrator.startSession(task, agentsConfig);
            return { success: true, sessionId };
        }
        catch (err) {
            return { success: false, error: err.message };
        }
    });
    ipcMain.handle('approve-council-execution', async (_event, sessionId) => {
        try {
            await orchestrator.executePlan(sessionId);
            return { success: true };
        }
        catch (err) {
            return { success: false, error: err.message };
        }
    });
    ipcMain.handle('get-council-session', async (_event, sessionId) => {
        try {
            const session = orchestrator.getSession(sessionId);
            return { success: true, session };
        }
        catch (err) {
            return { success: false, error: err.message };
        }
    });
}
