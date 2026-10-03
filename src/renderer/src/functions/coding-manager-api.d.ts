declare const activateCodingMode: () => Promise<string>;
declare const runTerminal: (command: string, path?: string) => Promise<string>;
declare const openInVsCode: (path: string) => Promise<"❌ Failed." | "Error" | "✅ Opened in VS Code.">;
export { activateCodingMode, runTerminal, openInVsCode };
