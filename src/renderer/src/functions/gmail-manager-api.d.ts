export declare const readEmails: (maxResults?: number) => Promise<any>;
export declare const sendEmail: (to: string, subject: string, body: string) => Promise<any>;
export declare const draftEmail: (to: string, subject: string, body: string) => Promise<any>;
