//frontend/src/services/api.ts

import axios from "axios";
import { FlowchartData, FlowchartEdge,FlowchartNode,FlowchartStep, ModuleInfo } from "../types";

const API_BASE = '/api';

export const api = {
    getFlowchart: async (): Promise<FlowchartData> => {
        const response = await axios.get(`${API_BASE}/flowchart`);
        return response.data;
    },
    
    getSteps: async (): Promise<FlowchartStep[]> => {
        const response = await axios.get(`${API_BASE}/steps`);
        return response.data;
    },

    getToStep: async (stepNumber: number): Promise<FlowchartData> => {
        const response = await axios.get(`${API_BASE}/steps/${stepNumber}`);
        return response.data;
    },

    nextStep: async (): Promise<FlowchartData> => {
        const response = await axios.post(`${API_BASE}/steps/next`);
        return response.data;
    },
    previousStep: async (): Promise<FlowchartData> => {
        const response = await axios.post(`${API_BASE}/steps/previous`);
        return response.data;
    },
  
    getStatus: async (): Promise<{currentStep: number; totalSteps: number; progress: number}> => {
        const response = await axios.get(`${API_BASE}/steps/status`);
        return response.data;
    },

    getModules: async (type?: string): Promise<ModuleInfo> => {
        const params = type ? {type} : {};
        const response = await axios.get(`${API_BASE}/modules`, {params});
        return response.data;
    },

    executeModule: async (id: string, options?: Record<string, any>): Promise<{module: string; options: Record<string, any>; status: string; output: string; timestamp: string}> => {
        const response = await axios.post(`${API_BASE}/modules/${id}/execute`, {options});
        return response.data;
    }
};