import { IpcMain, App } from 'electron';
export default function registerIpcHandlers({ ipcMain, app }: {
    ipcMain: IpcMain;
    app: App;
}): void;
