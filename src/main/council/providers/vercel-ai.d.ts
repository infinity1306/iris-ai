import { AIProvider } from '../types';
export declare class VercelAIProvider implements AIProvider {
    id: string;
    private providerId;
    private modelName;
    constructor(providerId: string, modelName: string);
    private getKeys;
    private getModel;
    generate(systemPrompt: string, prompt: string): Promise<string>;
    stream(systemPrompt: string, prompt: string, onChunk: (chunk: string) => void): Promise<string>;
}
