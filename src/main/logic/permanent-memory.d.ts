import { IpcMain, App } from 'electron';
export default function registerPermanentMemory({ ipcMain, app }: {
    ipcMain: IpcMain;
    app: App;
}): void;
