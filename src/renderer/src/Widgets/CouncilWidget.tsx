import React from 'react';
import { useCouncilStore } from '../store/councilStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, CheckCircle } from 'lucide-react';

const CouncilWidget = () => {
  const { 
    isOpen, setIsOpen, task, setTask, startSession, 
    agents, events, finalPlan, status, approveExecution 
  } = useCouncilStore();

  if (!isOpen) return null;

  const handleStart = () => {
    if (!task) return;
    startSession([
      { provider: 'gemini', model: 'gemini-3-flash-preview', role: 'architect' },
      { provider: 'openai', model: 'gpt-4o', role: 'analyst' },
      { provider: 'anthropic', model: 'claude-3-opus', role: 'judge' }
    ]);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="absolute inset-4 bg-zinc-950 border border-emerald-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 text-white font-mono"
      >
        {/* Header */}
        <div className="h-12 border-b border-emerald-500/30 bg-zinc-900/50 flex items-center justify-between px-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="font-bold tracking-widest">IRIS COUNCIL</span>
            <span className="text-xs opacity-70 px-2 py-0.5 bg-emerald-500/20 rounded">STATUS: {status.toUpperCase()}</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:text-red-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel: Task & Controls */}
          <div className="w-1/4 border-r border-emerald-500/30 p-4 flex flex-col gap-4 bg-zinc-950/80">
            <h3 className="text-sm text-emerald-400/80 uppercase tracking-widest">Active Task</h3>
            <textarea 
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Describe the task for the council..."
              className="w-full h-32 bg-zinc-900 border border-emerald-500/20 rounded-lg p-3 text-sm focus:outline-none focus:border-emerald-500 resize-none"
              disabled={status !== 'idle'}
            />
            {status === 'idle' && (
              <button 
                onClick={handleStart}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 py-2 rounded-lg transition-colors border border-emerald-500/50"
              >
                <Play size={16} /> START COUNCIL
              </button>
            )}
          </div>

          {/* Center Panel: Agents & Debate */}
          <div className="w-2/4 p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
            <h3 className="text-sm text-emerald-400/80 uppercase tracking-widest">Agent Streams</h3>
            <div className="grid grid-cols-2 gap-4">
              {agents.map((agent) => (
                <div key={agent.id} className="bg-zinc-900/50 border border-emerald-500/20 rounded-lg p-3 h-64 flex flex-col">
                  <div className="text-xs text-emerald-400 font-bold mb-2 uppercase border-b border-emerald-500/20 pb-1">Agent {agent.id.slice(0,6)}</div>
                  <div className="flex-1 overflow-y-auto text-xs opacity-80 whitespace-pre-wrap custom-scrollbar">
                    {agent.output}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Plan & Execution */}
          <div className="w-1/4 border-l border-emerald-500/30 p-4 flex flex-col gap-4 bg-zinc-950/80">
            <h3 className="text-sm text-emerald-400/80 uppercase tracking-widest">Implementation Plan</h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-zinc-900/50 border border-emerald-500/20 rounded-lg p-3">
              {finalPlan ? (
                <pre className="text-xs whitespace-pre-wrap text-emerald-300">{JSON.stringify(finalPlan, null, 2)}</pre>
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-600 text-xs text-center italic">Waiting for Judge Decision...</div>
              )}
            </div>
            {finalPlan && (
              <button 
                onClick={approveExecution}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500/30 hover:bg-emerald-500/60 text-white py-2 rounded-lg transition-colors border border-emerald-500/80"
              >
                <CheckCircle size={16} /> APPROVE EXECUTION
              </button>
            )}
          </div>
        </div>

        {/* Bottom Panel: Event Stream */}
        <div className="h-48 border-t border-emerald-500/30 bg-zinc-950 p-4 flex flex-col">
          <h3 className="text-sm text-emerald-400/80 uppercase tracking-widest mb-2">Event Stream</h3>
          <div className="flex-1 overflow-y-auto custom-scrollbar font-mono text-xs">
            {events.map((ev, i) => (
              <div key={i} className="mb-1">
                <span className="text-emerald-500/50">[{new Date(ev.timestamp).toISOString().split('T')[1]}]</span>{' '}
                <span className="text-blue-400">{ev.type}</span>{' '}
                <span className="opacity-70">{ev.agentId ? `(Agent: ${ev.agentId.slice(0,6)})` : ''}</span>{' '}
                <span className="text-zinc-400">{JSON.stringify(ev.payload)}</span>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
};

export default CouncilWidget;
