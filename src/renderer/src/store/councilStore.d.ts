export interface AgentConfig {
    provider: string;
    model: string;
    role: 'architect' | 'analyst' | 'reviewer' | 'judge';
}
export interface CouncilState {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    sessionId: string | null;
    task: string;
    setTask: (task: string) => void;
    status: string;
    agents: any[];
    rounds: any[];
    events: any[];
    finalPlan: any | null;
    startSession: (agents: AgentConfig[]) => Promise<void>;
    approveExecution: () => Promise<void>;
    addEvent: (event: any) => void;
}
export declare const useCouncilStore: import("zustand").UseBoundStore<import("zustand").StoreApi<CouncilState>>;
