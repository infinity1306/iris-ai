import { ImplementationPlan } from '../types';
export declare class AntigravityExecutor {
    private sessionId;
    private emitEvent;
    constructor(emitEvent: (event: any) => void, sessionId: string);
    execute(plan: ImplementationPlan): Promise<any>;
    cancel(): Promise<void>;
}
