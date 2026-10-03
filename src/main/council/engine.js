import { VercelAIProvider } from './providers/vercel-ai';
import { v4 as uuidv4 } from 'uuid';
import { AntigravityExecutor } from './execution/antigravity';
export class CouncilOrchestrator {
    activeSessions = new Map();
    ipcMain;
    constructor(ipcMain) {
        this.ipcMain = ipcMain;
    }
    emit(event) {
        this.ipcMain.emit('council-event', event);
        const win = require('electron').BrowserWindow.getAllWindows()[0];
        if (win) {
            win.webContents.send('council-event', event);
        }
    }
    getSession(id) {
        return this.activeSessions.get(id);
    }
    async startSession(task, agentsConfig) {
        const sessionId = uuidv4();
        const session = {
            id: sessionId,
            task,
            status: 'round1',
            agents: agentsConfig.map(c => ({ ...c, id: uuidv4(), status: 'pending' })),
            rounds: [
                { roundNumber: 1, name: 'Independent Analysis', completed: false },
                { roundNumber: 2, name: 'Cross Critique', completed: false },
                { roundNumber: 3, name: 'Evidence Review', completed: false },
                { roundNumber: 4, name: 'Judge Decision', completed: false }
            ],
            events: []
        };
        this.activeSessions.set(sessionId, session);
        this.emit({ sessionId, timestamp: Date.now(), type: 'SessionStarted', payload: { task } });
        // Start background process but don't block
        this.runCouncilWorkflow(sessionId).catch(err => {
            this.emit({ sessionId, timestamp: Date.now(), type: 'SessionFailed', payload: { error: err.message } });
            session.status = 'failed';
        });
        return sessionId;
    }
    async executePlan(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (!session || !session.finalPlan)
            throw new Error('No valid plan to execute');
        session.status = 'executing';
        this.emit({ sessionId, timestamp: Date.now(), type: 'ExecutionStarted', payload: { plan: session.finalPlan } });
        const executor = new AntigravityExecutor(this.emit.bind(this), sessionId);
        try {
            const result = await executor.execute(session.finalPlan);
            this.emit({ sessionId, timestamp: Date.now(), type: 'ExecutionCompleted', payload: { result } });
            session.status = 'completed';
        }
        catch (err) {
            this.emit({ sessionId, timestamp: Date.now(), type: 'SessionFailed', payload: { error: err.message } });
            session.status = 'failed';
        }
    }
    async runCouncilWorkflow(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (!session)
            return;
        const workingAgents = session.agents.filter(a => a.role !== 'judge');
        const judgeAgent = session.agents.find(a => a.role === 'judge');
        // ROUND 1: Independent Analysis
        const round1Results = new Map();
        await Promise.all(workingAgents.map(async (agent) => {
            agent.status = 'active';
            this.emit({ sessionId, timestamp: Date.now(), type: 'AgentStarted', agentId: agent.id });
            try {
                const provider = new VercelAIProvider(agent.provider, agent.model);
                const prompt = `You are an elite AI ${agent.role}. Analyze the following task: "${session.task}". Provide a diagnosis, proposed solution, likely changed files, risks, and a confidence score.`;
                let output = '';
                await provider.stream('You are an expert software engineer.', prompt, (chunk) => {
                    output += chunk;
                    this.emit({ sessionId, timestamp: Date.now(), type: 'AgentMessage', agentId: agent.id, payload: { chunk } });
                });
                agent.output = output;
                agent.status = 'completed';
                round1Results.set(agent.id, output);
                this.emit({ sessionId, timestamp: Date.now(), type: 'AgentCompleted', agentId: agent.id });
            }
            catch (err) {
                agent.status = 'failed';
                agent.error = err.message;
                this.emit({ sessionId, timestamp: Date.now(), type: 'AgentMessage', agentId: agent.id, payload: { chunk: `\n[ERROR]: ${err.message}` } });
            }
        }));
        session.rounds[0].completed = true;
        // ROUND 2: Cross Critique
        session.status = 'round2';
        const successfulAgents = workingAgents.filter(a => a.status === 'completed');
        if (successfulAgents.length === 0)
            throw new Error('All agents failed in Round 1');
        let otherProposals = '';
        successfulAgents.forEach(a => {
            otherProposals += `Proposal from ${a.role}:\n${a.output}\n\n`;
        });
        const critiques = new Map();
        await Promise.all(successfulAgents.map(async (agent) => {
            agent.status = 'active';
            this.emit({ sessionId, timestamp: Date.now(), type: 'AgentStarted', agentId: agent.id });
            try {
                const provider = new VercelAIProvider(agent.provider, agent.model);
                const prompt = `You are a ${agent.role}. Review these other proposals for the task "${session.task}":\n\n${otherProposals}\nIdentify incorrect assumptions, security problems, and contradictions.`;
                let output = '';
                await provider.stream('You are a rigorous code reviewer.', prompt, (chunk) => {
                    output += chunk;
                    this.emit({ sessionId, timestamp: Date.now(), type: 'AgentCritique', agentId: agent.id, payload: { chunk } });
                });
                critiques.set(agent.id, output);
                agent.status = 'completed';
                this.emit({ sessionId, timestamp: Date.now(), type: 'AgentCompleted', agentId: agent.id });
            }
            catch (err) {
                agent.status = 'failed';
                this.emit({ sessionId, timestamp: Date.now(), type: 'AgentCritique', agentId: agent.id, payload: { chunk: `\n[ERROR]: ${err.message}` } });
            }
        }));
        session.rounds[1].completed = true;
        // ROUND 3 (Skipping actual test execution for evidence in MVP, jumping to Judge)
        session.status = 'round3';
        session.rounds[2].completed = true;
        // JUDGE
        session.status = 'judging';
        if (!judgeAgent) {
            throw new Error('No judge agent configured');
        }
        judgeAgent.status = 'active';
        this.emit({ sessionId, timestamp: Date.now(), type: 'JudgeStarted', agentId: judgeAgent.id });
        try {
            const provider = new VercelAIProvider(judgeAgent.provider, judgeAgent.model);
            const prompt = `Task: ${session.task}\n\nProposals:\n${otherProposals}\n\nCritiques:\n${Array.from(critiques.values()).join('\n\n')}\n\nProduce a structured JSON execution plan matching this interface:
{
  "decision": "implement" | "reject" | "clarify",
  "confidence": number,
  "summary": string,
  "steps": string[],
  "files": string[],
  "tests": string[],
  "risks": string[]
}
Output ONLY valid JSON.`;
            let output = '';
            await provider.stream('You are the Chief Architect Judge. Your word is final. Output JSON only.', prompt, (chunk) => {
                output += chunk;
                this.emit({ sessionId, timestamp: Date.now(), type: 'AgentMessage', agentId: judgeAgent.id, payload: { chunk } });
            });
            try {
                const cleanedOutput = output.replace(/```json/g, '').replace(/```/g, '').trim();
                const plan = JSON.parse(cleanedOutput);
                session.finalPlan = plan;
                judgeAgent.status = 'completed';
                this.emit({ sessionId, timestamp: Date.now(), type: 'JudgeDecision', agentId: judgeAgent.id, payload: { plan } });
            }
            catch (e) {
                throw new Error('Judge did not return valid JSON: ' + output);
            }
        }
        catch (err) {
            judgeAgent.status = 'failed';
            this.emit({ sessionId, timestamp: Date.now(), type: 'AgentMessage', agentId: judgeAgent.id, payload: { chunk: `\n[ERROR]: ${err.message}` } });
            throw err;
        }
        session.rounds[3].completed = true;
    }
}
