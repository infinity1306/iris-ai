import { generateText, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createAnthropic } from '@ai-sdk/anthropic';
import fs from 'fs';
import path from 'path';
import { app, safeStorage } from 'electron';
export class VercelAIProvider {
    id;
    providerId;
    modelName;
    constructor(providerId, modelName) {
        this.id = `${providerId}-${modelName}`;
        this.providerId = providerId;
        this.modelName = modelName;
    }
    getKeys() {
        const secureConfigPath = path.join(app.getPath('userData'), 'iris_secure_vault.json');
        if (!fs.existsSync(secureConfigPath))
            return {};
        try {
            const data = JSON.parse(fs.readFileSync(secureConfigPath, 'utf8'));
            let groqKey = '', geminiKey = '', openaiKey = '', anthropicKey = '';
            if (safeStorage.isEncryptionAvailable()) {
                if (data.groq)
                    groqKey = safeStorage.decryptString(Buffer.from(data.groq, 'base64'));
                if (data.gemini)
                    geminiKey = safeStorage.decryptString(Buffer.from(data.gemini, 'base64'));
                if (data.openai)
                    openaiKey = safeStorage.decryptString(Buffer.from(data.openai, 'base64'));
                if (data.anthropic)
                    anthropicKey = safeStorage.decryptString(Buffer.from(data.anthropic, 'base64'));
            }
            else {
                if (data.groq)
                    groqKey = Buffer.from(data.groq, 'base64').toString('utf8');
                if (data.gemini)
                    geminiKey = Buffer.from(data.gemini, 'base64').toString('utf8');
                if (data.openai)
                    openaiKey = Buffer.from(data.openai, 'base64').toString('utf8');
                if (data.anthropic)
                    anthropicKey = Buffer.from(data.anthropic, 'base64').toString('utf8');
            }
            return { groqKey, geminiKey, openaiKey, anthropicKey };
        }
        catch (e) {
            return {};
        }
    }
    getModel() {
        const keys = this.getKeys();
        switch (this.providerId) {
            case 'gemini':
                if (!keys.geminiKey)
                    throw new Error('Missing Gemini API Key');
                return createGoogleGenerativeAI({ apiKey: keys.geminiKey })(this.modelName);
            case 'openai':
                if (!keys.openaiKey)
                    throw new Error('Missing OpenAI API Key');
                return createOpenAI({ apiKey: keys.openaiKey })(this.modelName);
            case 'anthropic':
                if (!keys.anthropicKey)
                    throw new Error('Missing Anthropic API Key');
                return createAnthropic({ apiKey: keys.anthropicKey })(this.modelName);
            case 'groq':
                if (!keys.groqKey)
                    throw new Error('Missing Groq API Key');
                return createOpenAI({
                    apiKey: keys.groqKey,
                    baseURL: 'https://api.groq.com/openai/v1',
                })(this.modelName);
            default:
                throw new Error(`Unsupported provider: ${this.providerId}`);
        }
    }
    async generate(systemPrompt, prompt) {
        const model = this.getModel();
        const { text } = await generateText({
            model,
            system: systemPrompt,
            prompt,
        });
        return text;
    }
    async stream(systemPrompt, prompt, onChunk) {
        const model = this.getModel();
        const { textStream } = streamText({
            model,
            system: systemPrompt,
            prompt,
        });
        let fullText = '';
        for await (const chunk of textStream) {
            fullText += chunk;
            onChunk(chunk);
        }
        return fullText;
    }
}
