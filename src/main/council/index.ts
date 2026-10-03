import { IpcMain } from 'electron';
import { CouncilOrchestrator } from './engine';
import { CouncilAgent } from './types';

export default function registerCouncilHandlers(ipcMain: IpcMain) {
  const orchestrator = new CouncilOrchestrator(ipcMain);

  ipcMain.handle('start-council-session', async (_event, task: string, agentsConfig: Omit<CouncilAgent, 'id' | 'status'>[]) => {
    try {
      const sessionId = await orchestrator.startSession(task, agentsConfig);
      return { success: true, sessionId };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('approve-council-execution', async (_event, sessionId: string) => {
    try {
      await orchestrator.executePlan(sessionId);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('get-council-session', async (_event, sessionId: string) => {
    try {
      const session = orchestrator.getSession(sessionId);
      return { success: true, session };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });
}
