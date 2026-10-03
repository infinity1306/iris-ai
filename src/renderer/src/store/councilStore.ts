import { create } from 'zustand';

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

export const useCouncilStore = create<CouncilState>((set, get) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  sessionId: null,
  task: '',
  setTask: (task: string) => set({ task }),
  status: 'idle',
  agents: [],
  rounds: [],
  events: [],
  finalPlan: null,

  startSession: async (agents: AgentConfig[]) => {
    set({ events: [], finalPlan: null, rounds: [], agents: [], status: 'starting' });
    const result = await window.electron.ipcRenderer.invoke('start-council-session', get().task, agents);
    if (result.success) {
      set({ sessionId: result.sessionId });
    }
  },

  approveExecution: async () => {
    const { sessionId } = get();
    if (sessionId) {
      await window.electron.ipcRenderer.invoke('approve-council-execution', sessionId);
    }
  },

  addEvent: (event: any) => {
    set((state) => {
      const newEvents = [...state.events, event];
      let newAgents = [...state.agents];
      let newRounds = [...state.rounds];
      let newPlan = state.finalPlan;
      let newStatus = state.status;

      if (event.type === 'SessionStarted') {
        newStatus = 'round1';
      } else if (event.type === 'AgentStarted') {
        if (!newAgents.find(a => a.id === event.agentId)) {
          newAgents.push({ id: event.agentId, output: '' });
        }
      } else if (event.type === 'AgentMessage' || event.type === 'AgentCritique') {
        const agentIndex = newAgents.findIndex(a => a.id === event.agentId);
        if (agentIndex !== -1) {
          newAgents[agentIndex].output = (newAgents[agentIndex].output || '') + event.payload.chunk;
        } else {
          newAgents.push({ id: event.agentId, output: event.payload.chunk });
        }
      } else if (event.type === 'JudgeDecision') {
        newPlan = event.payload.plan;
        newStatus = 'completed';
      }

      return {
        events: newEvents,
        agents: newAgents,
        rounds: newRounds,
        finalPlan: newPlan,
        status: newStatus
      };
    });
  }
}));

// Setup IPC listener
window.electron.ipcRenderer.on('council-event', (_event, payload) => {
  useCouncilStore.getState().addEvent(payload);
});
