// frontend/src/types/index.ts

export interface FlowchartNode {
  id: string;
  type: 'start' | 'process' | 'decision' | 'end';
  label: string;
  x: number;
  y: number;
  color: string;
  description: string;
  status?: 'pending' | 'active' | 'completed' | 'error';
}

export interface FlowchartEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface FlowchartStep {
  id: number;
  description: string;
  action: string;
  nodeId?: string;
}

export interface FlowchartData {
  nodes: FlowchartNode[];
  edges: FlowchartEdge[];
  steps: FlowchartStep[];
  currentStep: number;
}

export interface WebSocketMessage {
  type: 'step_update' | 'module_loaded' | 'session_created' | 'error';
  payload: any;
  timestamp: string;
}

export interface ModuleInfo {
  id: string;
  name: string;
  type: 'exploit' | 'auxiliary' | 'post' | 'payload';
  category: string;
  description: string;
  author: string;
  version: string;
  platform?: string;
  arch?: string;
  options?: ModuleOption[];
}

export interface ModuleOption {
  name: string;
  description: string;
  required: boolean;
  default?: string;
  value?: string;
}