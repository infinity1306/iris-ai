export declare const readFile: (filePath: string) => Promise<any>;
export declare const writeFile: (fileName: string, content: string) => Promise<any>;
export declare const manageFile: (operation: "copy" | "move" | "delete", sourcePath: string, destPath?: string) => Promise<any>;
export declare const openFile: (filePath: string) => Promise<string>;
export declare const readDirectory: (dirPath: string) => Promise<any>;
export declare const createFolder: (path: string) => Promise<string>;
