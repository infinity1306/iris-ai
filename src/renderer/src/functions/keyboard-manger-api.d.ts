export declare const ghostType: (text: string) => Promise<"✅ Typing complete." | "❌ Failed to type.">;
export declare const executeGhostSequence: (jsonString: string) => Promise<"✅ Sequence executed successfully." | "❌ Failed to execute sequence. Invalid JSON.">;
