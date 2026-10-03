export declare const sendWhatsAppMessage: (name: string, message: string, filePath?: string) => Promise<string>;
export declare const scheduleWhatsAppMessage: (name: string, message: string, delayMinutes: number, filePath?: string) => Promise<string>;
