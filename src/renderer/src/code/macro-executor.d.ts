export declare const getMacroSequence: (macroName: string) => Promise<{
    success: boolean;
    error: string;
    name?: undefined;
    steps?: undefined;
} | {
    success: boolean;
    name: any;
    steps: any;
    error?: undefined;
}>;
