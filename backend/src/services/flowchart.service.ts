// backend/src/services/flowchart.service.ts
import {FlowchartNode, FlowchartEdge, FlowchartStep} from '../types/index'

type FlowchartState = {
  nodes: FlowchartNode[];
  edges: FlowchartEdge[];
  steps: FlowchartStep[];
  currentStep: number;
};

type FlowchartSubscriber = (data: FlowchartState) => void;

export class FlowchartService {
  private data: FlowchartState;
  private subscribers: FlowchartSubscriber[] = [];
  private currentStepId: number = 0;

  constructor() {
    this.data = this.generateFlowchartData();
    this.currentStepId = 0;
  }

  private generateFlowchartData(): FlowchartState {
    const nodes: FlowchartNode[] = [
      {
        id: 'start',
        type: 'start',
        label: '🚀 Inicio\nFramework',
        x: 400,
        y: 50,
        color: '#4CAF50',
        description: 'Inicialización del Framework MiMSF',
        status: 'pending'
      },
      {
        id: 'load_config',
        type: 'process',
        label: '📋 Cargar\nConfiguración',
        x: 400,
        y: 150,
        color: '#2196F3',
        description: 'Carga config.yaml y database.yaml',
        status: 'pending'
      },
      {
        id: 'init_managers',
        type: 'process',
        label: '🔧 Inicializar\nGestores',
        x: 400,
        y: 250,
        color: '#2196F3',
        description: 'ModuleManager, SessionManager, PayloadManager',
        status: 'pending'
      },
      {
        id: 'load_modules',
        type: 'process',
        label: '📦 Cargar\nMódulos',
        x: 400,
        y: 350,
        color: '#FF9800',
        description: 'Escanea y carga todos los módulos disponibles',
        status: 'pending'
      },
      {
        id: 'console',
        type: 'decision',
        label: '💻 Consola\nInteractiva',
        x: 400,
        y: 450,
        color: '#9C27B0',
        description: 'Prompt: msf > Esperando comandos',
        status: 'pending'
      },
      {
        id: 'use_module',
        type: 'process',
        label: '🎯 use\n<módulo>',
        x: 150,
        y: 550,
        color: '#E91E63',
        description: 'Selecciona y carga un módulo',
        status: 'pending'
      },
      {
        id: 'set_options',
        type: 'process',
        label: '⚙️ set\n<opción> <valor>',
        x: 400,
        y: 550,
        color: '#E91E63',
        description: 'Configura RHOSTS, RPORT, LHOST, etc.',
        status: 'pending'
      },
      {
        id: 'check',
        type: 'decision',
        label: '🔍 check\n¿Vulnerable?',
        x: 650,
        y: 550,
        color: '#FF5722',
        description: 'Verifica si el objetivo es vulnerable',
        status: 'pending'
      },
      {
        id: 'exploit',
        type: 'process',
        label: '💥 run/\nexploit',
        x: 400,
        y: 650,
        color: '#F44336',
        description: 'Ejecuta el exploit contra el objetivo',
        status: 'pending'
      },
      {
        id: 'payload',
        type: 'process',
        label: '📤 Generar\nPayload',
        x: 150,
        y: 750,
        color: '#4CAF50',
        description: 'Genera reverse_shell, bind_shell, etc.',
        status: 'pending'
      },
      {
        id: 'session',
        type: 'process',
        label: '🔗 Crear\nSesión',
        x: 400,
        y: 750,
        color: '#4CAF50',
        description: 'Establece conexión con el objetivo',
        status: 'pending'
      },
      {
        id: 'interact',
        type: 'process',
        label: '🖥️ Interactuar\nshell <id>',
        x: 650,
        y: 750,
        color: '#4CAF50',
        description: 'Interacción con la shell obtenida',
        status: 'pending'
      },
      {
        id: 'post',
        type: 'process',
        label: '🔍 Post-\nExplotación',
        x: 400,
        y: 850,
        color: '#795548',
        description: 'Módulos post-explotación',
        status: 'pending'
      },
      {
        id: 'report',
        type: 'process',
        label: '📊 Generar\nReporte',
        x: 400,
        y: 950,
        color: '#607D8B',
        description: 'Guarda resultados y logs',
        status: 'pending'
      },
      {
        id: 'end',
        type: 'end',
        label: '🏁 Fin\nFramework',
        x: 400,
        y: 1050,
        color: '#9E9E9E',
        description: 'Finaliza la ejecución',
        status: 'pending'
      }
    ];

    const edges: FlowchartEdge[] = [
      { id: 'e1', from: 'start', to: 'load_config' },
      { id: 'e2', from: 'load_config', to: 'init_managers' },
      { id: 'e3', from: 'init_managers', to: 'load_modules' },
      { id: 'e4', from: 'load_modules', to: 'console' },
      { id: 'e5', from: 'console', to: 'use_module', label: 'use' },
      { id: 'e6', from: 'console', to: 'set_options', label: 'set' },
      { id: 'e7', from: 'use_module', to: 'set_options' },
      { id: 'e8', from: 'set_options', to: 'check' },
      { id: 'e9', from: 'check', to: 'exploit', label: 'Sí' },
      { id: 'e10', from: 'check', to: 'console', label: 'No' },
      { id: 'e11', from: 'exploit', to: 'payload' },
      { id: 'e12', from: 'payload', to: 'session' },
      { id: 'e13', from: 'session', to: 'interact' },
      { id: 'e14', from: 'interact', to: 'post' },
      { id: 'e15', from: 'post', to: 'report' },
      { id: 'e16', from: 'report', to: 'end' },
      { id: 'e17', from: 'post', to: 'console', label: 'back' },
      { id: 'e18', from: 'report', to: 'console', label: 'back' }
    ];

    const steps: FlowchartStep[] = [
      { id: 0, description: '🚀 Inicio del Framework', action: 'Cargar configuración y gestores', nodeId: 'start' },
      { id: 1, description: '📦 Cargar módulos disponibles', action: 'Escanea directorio modules/', nodeId: 'load_modules' },
      { id: 2, description: '💻 Consola interactiva', action: 'Espera comandos del usuario', nodeId: 'console' },
      { id: 3, description: '🎯 Seleccionar módulo', action: 'use exploit/windows/smb_exploit', nodeId: 'use_module' },
      { id: 4, description: '⚙️ Configurar opciones', action: 'set RHOSTS 192.168.1.100', nodeId: 'set_options' },
      { id: 5, description: '🔍 Verificar vulnerabilidad', action: 'check() - Verifica objetivo', nodeId: 'check' },
      { id: 6, description: '💥 Ejecutar exploit', action: 'run() - Explota vulnerabilidad', nodeId: 'exploit' },
      { id: 7, description: '📤 Generar payload', action: 'Crea reverse_shell o bind_shell', nodeId: 'payload' },
      { id: 8, description: '🔗 Establecer sesión', action: 'Conexión exitosa con objetivo', nodeId: 'session' },
      { id: 9, description: '🖥️ Interactuar con shell', action: 'Comandos en la shell obtenida', nodeId: 'interact' },
      { id: 10, description: '🔍 Post-Explotación', action: 'Recolectar información adicional', nodeId: 'post' },
      { id: 11, description: '📊 Generar reporte', action: 'Guardar resultados', nodeId: 'report' }
    ];

    return {
      nodes,
      edges,
      steps,
      currentStep: 0
    };
  }

  public getCurrentState(): FlowchartState {
    return {
      ...this.data,
      currentStep: this.currentStepId
    };
  }

  public nextStep(): void {
    if (this.currentStepId < this.data.steps.length - 1) {
      this.currentStepId++;
      this.updateNodeStatus();
      this.notifySubscribers();
    }
  }

  public previousStep(): void {
    if (this.currentStepId > 0) {
      this.currentStepId--;
      this.updateNodeStatus();
      this.notifySubscribers();
    }
  }

  public goToStep(stepId: number): void {
    if (stepId >= 0 && stepId < this.data.steps.length) {
      this.currentStepId = stepId;
      this.updateNodeStatus();
      this.notifySubscribers();
    }
  }

  private updateNodeStatus(): void {
    const data: string = '{"steps": [...]}'; // Aquí deberías tener la estructura completa de los pasos en formato JSON 
    const steps = data as unknown as FlowchartStep[]; // Asegúrate de que 'data' sea del tipo correcto
    const currentStep = steps[this.currentStepId];
    
    // Resetear todos los nodos
    this.data.nodes.forEach(node => {
      node.status = 'pending';
    });

    // Marcar nodos anteriores como completados
    for (let i = 0; i < this.currentStepId; i++) {
      const step = steps[i];
      const node = this.data.nodes.find(n => n.id === step.nodeId);
      if (node) {
        node.status = 'completed';
      }
    }

    // Marcar nodo actual como activo
    if (currentStep && currentStep.nodeId) {
      const node = this.data.nodes.find(n => n.id === currentStep.nodeId);
      if (node) {
        node.status = 'active';
      }
    }
  }

  public subscribe(callback: FlowchartSubscriber): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private notifySubscribers(): void {
    const data = this.getCurrentState();
    this.subscribers.forEach(callback => callback(data));
  }
}