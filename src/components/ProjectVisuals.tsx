import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Activity, Terminal } from 'lucide-react';

// Project 01 Visual: AlgoVisualizer Graph Traversal Simulation
export const AlgoVisualizerPreview: React.FC = () => {
  const [activeStep, setActiveStep] = useState(2);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 1800);
    return () => clearInterval(interval);
  }, [isRunning]);

  const nodes = [
    { id: 'A', x: 50, y: 70, label: 'Start' },
    { id: 'B', x: 140, y: 35, label: 'B' },
    { id: 'C', x: 155, y: 110, label: 'C' },
    { id: 'D', x: 250, y: 45, label: 'D' },
    { id: 'E', x: 270, y: 115, label: 'Target' },
  ];

  const edges = [
    { from: 'A', to: 'B', weight: '2', pathStep: 1 },
    { from: 'A', to: 'C', weight: '4', pathStep: -1 },
    { from: 'B', to: 'D', weight: '3', pathStep: 2 },
    { from: 'C', to: 'E', weight: '6', pathStep: -1 },
    { from: 'D', to: 'E', weight: '1', pathStep: 3 },
  ];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#070b14] border border-white/10 group select-none transition-all duration-300">
      {/* Top pixel notch bar */}
      <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.07] flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#ff8a50] rounded-none inline-block shadow-[0_0_6px_#ff8a50]" />
          <span className="text-slate-300">graph_traversal.ts</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-500">Dijkstra Heuristic</span>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={isRunning ? 'Pause' : 'Play'}
          >
            {isRunning ? <RotateCcw className="w-3 h-3" /> : <Play className="w-3 h-3 text-[#ff8a50]" />}
          </button>
        </div>
      </div>

      {/* SVG Canvas Graph */}
      <div className="p-4 sm:p-6 h-56 sm:h-64 flex items-center justify-center relative">
        {/* Pixel grid background lines */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <svg viewBox="0 0 320 150" className="w-full h-full max-w-[340px]">
          {/* Edges */}
          {edges.map((e, idx) => {
            const n1 = nodes.find((n) => n.id === e.from)!;
            const n2 = nodes.find((n) => n.id === e.to)!;
            const isPath = e.pathStep > 0 && activeStep >= e.pathStep;
            return (
              <g key={idx}>
                <line
                  x1={n1.x}
                  y1={n1.y}
                  x2={n2.x}
                  y2={n2.y}
                  stroke={isPath ? '#ff8a50' : 'rgba(255,255,255,0.12)'}
                  strokeWidth={isPath ? '2.5' : '1.5'}
                  strokeDasharray={isPath ? 'none' : '4 3'}
                  className="transition-all duration-500"
                />
                <text
                  x={(n1.x + n2.x) / 2}
                  y={(n1.y + n2.y) / 2 - 6}
                  fill={isPath ? '#ff9a7b' : '#64748b'}
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  w:{e.weight}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node, idx) => {
            const isVisited = idx <= activeStep;
            const isCurrent = idx === activeStep;
            return (
              <g key={node.id} className="transition-all duration-300">
                {isCurrent && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="16"
                    fill="none"
                    stroke="#ff8a50"
                    strokeWidth="1"
                    opacity="0.4"
                    className="animate-ping"
                  />
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="11"
                  fill={isVisited ? '#ff8a50' : '#0e1626'}
                  stroke={isVisited ? '#ff9a7b' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="1.5"
                />
                <text
                  x={node.x}
                  y={node.y + 3.5}
                  fill={isVisited ? '#060a14' : '#94a3b8'}
                  fontSize="9"
                  fontWeight="bold"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {node.id}
                </text>
                <text
                  x={node.x}
                  y={node.y + 20}
                  fill="#64748b"
                  fontSize="8"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Pixel corner markers */}
        <span className="absolute top-2 left-2 text-[10px] font-mono text-white/20">+</span>
        <span className="absolute top-2 right-2 text-[10px] font-mono text-white/20">+</span>
        <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white/20">+</span>
        <span className="absolute bottom-2 right-2 text-[10px] font-mono text-white/20">+</span>
      </div>

      {/* Micro Status Bar */}
      <div className="px-4 py-2 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span>state: optimal_path_found</span>
        <span className="text-[#ff8a50]/90">cost: 6 · latency: 0.4ms</span>
      </div>
    </div>
  );
};

// Project 02 Visual: DevForge Regex & Workbench Snapshot
export const DevForgePreview: React.FC = () => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#070b14] border border-white/10 group select-none">
      {/* Top Title Bar */}
      <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.07] flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#ff8a50]" />
          <span className="text-slate-300">regex_test_bench.tsx</span>
        </div>
        <span className="text-[10px] text-emerald-400 font-mono">● 4 matches</span>
      </div>

      {/* Editor Surface */}
      <div className="p-4 sm:p-5 font-mono text-xs space-y-3">
        {/* Regex Input Line */}
        <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 flex items-center gap-2">
          <span className="text-slate-500">/</span>
          <span className="text-[#ff9a7b] font-medium">\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]&#123;2,&#125;\b</span>
          <span className="text-slate-500">/g</span>
        </div>

        {/* Test Strings with highlights */}
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-slate-300 text-[11px] leading-relaxed space-y-1">
          <div>
            contact:{' '}
            <span className="bg-[#ff8a50]/20 text-[#ff8a50] px-1 py-0.5 rounded border border-[#ff8a50]/40">
              hello@vignesh.dev
            </span>{' '}
            [verified]
          </div>
          <div>
            dispatch:{' '}
            <span className="bg-[#ff8a50]/20 text-[#ff8a50] px-1 py-0.5 rounded border border-[#ff8a50]/40">
              logs@kernel.org
            </span>{' '}
            [200 OK]
          </div>
          <div className="text-slate-600">// testing boundary condition</div>
        </div>

        {/* Keyboard shortcut bar */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 border border-white/15">⌥R</kbd>
            <span>Run against buffer</span>
          </span>
          <span className="text-slate-500">exec: 0.12ms</span>
        </div>
      </div>
    </div>
  );
};

// Project 03 Visual: PulseMetrics Streaming Telemetry
export const PulseMetricsPreview: React.FC = () => {
  const [pulseVal, setPulseVal] = useState(14);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseVal(12 + Math.floor(Math.random() * 6));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#070b14] border border-white/10 group select-none">
      <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.07] flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-[#ff8a50]" />
          <span className="text-slate-300">telemetry_ws_stream</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-slate-400">connected</span>
        </div>
      </div>

      <div className="p-5 font-mono">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <span className="text-[10px] text-slate-500 block">Avg Latency</span>
            <span className="text-base font-bold text-[#ff8a50]">{pulseVal}.2 ms</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <span className="text-[10px] text-slate-500 block">Uptime</span>
            <span className="text-base font-bold text-white">99.98%</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <span className="text-[10px] text-slate-500 block">Drop Rate</span>
            <span className="text-base font-bold text-emerald-400">0.00%</span>
          </div>
        </div>

        {/* Live Sparkline wave */}
        <div className="h-20 w-full relative flex items-end">
          <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff8a50" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ff8a50" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,45 Q30,20 60,35 T120,25 T180,40 T240,20 L240,60 L0,60 Z"
              fill="url(#metricGrad)"
            />
            <path
              d="M0,45 Q30,20 60,35 T120,25 T180,40 T240,20"
              fill="none"
              stroke="#ff8a50"
              strokeWidth="2"
            />
            <circle cx="240" cy="20" r="3" fill="#ff8a50" className="animate-ping" />
          </svg>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-white/[0.06]">
          <span>stream: wss://relay.internal/metrics</span>
          <span>fps: 60.0</span>
        </div>
      </div>
    </div>
  );
};

// Project 04 Visual: Aetheria Pixel Canvas Preview
export const AetheriaPreview: React.FC = () => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#070b14] border border-white/10 group select-none">
      <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.07] flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#ff8a50] rounded-none inline-block shadow-[0_0_6px_#ff8a50]" />
          <span className="text-slate-300">shader_pipeline_2d</span>
        </div>
        <span className="text-[10px] text-slate-400">60 FPS · 0 drops</span>
      </div>

      <div className="h-56 relative overflow-hidden flex items-center justify-center">
        {/* Pixel-art landscape vignette image */}
        <div
          className="absolute inset-0 bg-cover bg-center filter saturate-110 group-hover:scale-102 transition-transform duration-700"
          style={{ backgroundImage: `url('/cinematic_stylized_bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-80" />

        {/* Small corner annotations */}
        <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-300/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
          particle_engine: v2.4 (28 embers active)
        </div>
      </div>
    </div>
  );
};
