declare const setVolume: (level: number) => Promise<any>;
declare const takeScreenshot: () => Promise<any>;
declare const getScreenSize: () => Promise<any>;
declare const clickOnCoordinate: (x: number, y: number) => Promise<string>;
declare const scrollScreen: (direction: "up" | "down", amount: number) => Promise<string>;
declare const pressShortcut: (key: string, modifiers: string[]) => Promise<string>;
export { setVolume, takeScreenshot, getScreenSize, clickOnCoordinate, scrollScreen, pressShortcut };
