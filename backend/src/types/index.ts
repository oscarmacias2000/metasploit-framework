//backend/src/types/index.ts/interfaces

export interface FlowchartNode{
    id: string;
    type: 'start' | 'process' | 'decision' | 'end';
    label: string;
    x: number;
    y: number;
    color: string;
    description: string;
    status: 'pending' | 'active' | 'completed' | 'error';

}

export interface FlowchartData{
    currentStep: number;
    nodes: FlowchartNode[];
    steps: FlowchartStep[];
    edges: FlowchartEdge[];

    id: string;
    label: string;
    x: number;
    y: number;
    color: string;
    description: string;
    status: 'pending' | 'active' | 'completed' | 'error' | 'not_started';
}

export interface FlowchartEdge{
    id: string;
    from: string;
    to: string;
    label?: string;
    color?: string;
}

export interface FlowchartStep{
    id: number;
    description: string;
    action: string;
    nodeId?:string;
}

export interface ModuleInfo{
    id: string;
    name:string;
    type: 'exploit' | 'auxiliary' | 'post' | 'payload';
    category: string;
    description: string;
    author: string;
    version: string;
    platform?: string;
    arch?: string;
    required: boolean;
    info?: any;
    options?: ModuleOption[];
}
export interface ModuleOption{
    id?: number;
    type?: string;
    target?: string;
    info?: string;
    name: string;
    description: string;
    required: boolean,
    default?: string;
    createdAt?: Date;
}
export interface WebSocketMessage{
    type: 'step_update' | 'module_loaded' | 'session_created' | 'error';
    payload: any;
    timestamp: Date;
}