import { IpcMain } from 'electron';
import { CouncilSession, CouncilAgent } from './types';
export declare class CouncilOrchestrator {
    private activeSessions;
    private ipcMain;
    constructor(ipcMain: IpcMain);
    private emit;
    getSession(id: string): CouncilSession | undefined;
    startSession(task: string, agentsConfig: Omit<CouncilAgent, 'id' | 'status'>[]): Promise<string>;
    executePlan(sessionId: string): Promise<void>;
    private runCouncilWorkflow;
}
