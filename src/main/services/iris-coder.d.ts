import { IpcMain, App } from 'electron';
export default function registerIrisCoder({ ipcMain, app }: {
    ipcMain: IpcMain;
    app: App;
}): void;
