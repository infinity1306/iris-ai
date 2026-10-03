export interface ChatMessage {
    role: 'user' | 'model';
    parts: [{
        text: string;
    }];
}
export declare const saveMessage: (role: "user" | "model" | "iris", text: string) => Promise<void>;
export declare const getHistory: () => Promise<ChatMessage[]>;
export declare const saveCoreMemory: (fact: string) => Promise<string>;
export declare const retrieveCoreMemory: () => Promise<string>;
