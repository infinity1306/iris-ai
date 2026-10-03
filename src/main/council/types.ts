export type CouncilRole = 'architect' | 'analyst' | 'reviewer' | 'judge';

export type CouncilStatus = 'idle' | 'round1' | 'round2' | 'round3' | 'judging' | 'executing' | 'verifying' | 'completed' | 'failed';

export interface CouncilAgent {
  id: string;
  provider: string; // 'openai', 'gemini', 'anthropic', 'groq'
  model: string;
  role: CouncilRole;
  status: 'pending' | 'active' | 'completed' | 'failed';
  output?: string;
  error?: string;
}

export interface DebateRound {
  roundNumber: number;
  name: string;
  completed: boolean;
}

export interface ImplementationPlan {
  decision: 'implement' | 'reject' | 'clarify';
  confidence: number;
  summary: string;
  steps: string[];
  files: string[];
  tests: string[];
  risks: string[];
}

export interface CouncilEvent {
  sessionId: string;
  timestamp: number;
  type: string;
  agentId?: string;
  payload?: any;
}

export interface CouncilSession {
  id: string;
  task: string;
  status: CouncilStatus;
  agents: CouncilAgent[];
  rounds: DebateRound[];
  events: CouncilEvent[];
  finalPlan?: ImplementationPlan;
}

export interface AIProvider {
  id: string;
  generate(systemPrompt: string, prompt: string): Promise<string>;
  stream(
    systemPrompt: string,
    prompt: string,
    onChunk: (chunk: string) => void
  ): Promise<string>;
}
