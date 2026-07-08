import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createServer } from "http";
import {WebSocketServer, WebSocket} from 'ws'
import {v4 as uuidv4} from 'uuid'

import flowcharRoutes from '../routes/flowchart.routes';
import modulesRoutes from '../routes/modules.routes';
import { FlowchartService } from "./services/flowchart.service";
import { WebSocketMessage } from "../types";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const WS_PORT = parseInt(process.env.WEBSOCKET_PORT || '5001');

//midleware

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//paths
app.use('/api/flowchart', flowcharRoutes);
app.use('/api/modules', modulesRoutes);

//health check
app.get('/api/health', (req,res)=>{
    res.json({status: 'ok', timestamp: new Date().toISOString()});
});

//servidor HTTP
const server = createServer(app);

//servidor WebSocket para comunicacion en tiempo real
const wss = new WebSocketServer({port: WS_PORT});
const clients = new Map<string, WebSocket>();

const flowchartService = new FlowchartService();

wss.on('connection', (ws: WebSocket)=>{
    const clientId = uuidv4();
    clients.set(clientId, ws);
    console.log(`[WS] Cliente conectado: ${clientId}`);

    //enviar estado initial
    const initialState: WebSocketMessage = {
        type: 'step_update',
        payload: flowchartService.getCurrentState(),
        timestamp: new Date()
    };

    ws.send(JSON.stringify(initialState));

    //suscribirse a cambios del flowchart
    const unsubscribe = flowchartService.subscribe((data) =>{
        if(ws.readyState === WebSocket.OPEN){
            ws.send(JSON.stringify({
                type: 'step_update',
                payload: data,
                timestamp: new Date()
            }));
        }
    });
  
   ws.on('message', (message: string)=>{
      try{
        const data = JSON.parse(message);
        console.log(`[WS] Mensaje recibido:`, data)

         if(data.type === 'next_step'){
            flowchartService.nextStep();
         }else if( data.type === 'previous_step'){
            flowchartService.previousStep();
         }else if(data.type === 'go_to_step'){
            flowchartService.goToStep(data.payload);
         }
      }catch(error){
        console.log('[WS] Error procesando mensaje:', error);
      }
   });

   ws.on('close', ()=>{
    clients.delete(clientId);
    unsubscribe();
    console.log(`[WS] Cliente desconectado: ${clientId}`);
   })
})

console.log(`[WS] Servidor WebSocket corriendo en puerto ${WS_PORT}`);

//servidor HTTP
server.listen(PORT, ()=>{
      console.log(`[Server] typefishconsole Backend corriendo en http://localhost:${PORT}`);
})