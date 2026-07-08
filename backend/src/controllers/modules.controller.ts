import { Request,Response } from "express";
import { ModuleInfo } from '../types/index';

export class ModulesController{
    private modules: ModuleInfo[] =[];

    constructor(){
        this.initializeModules();
    }

    private initializeModules(): void{
        this.modules = [
            {
                id: 'exploit/windows/smb_eternalblue',
                name: 'EternalBlue Exploit',
                type: 'exploit',
                category: 'windows/smb',
                description: 'Explota MS17-010 en SMB',
                author: 'Security Team',
                version: '1.0.0',
                platform: 'windows',
                required: false,
                arch: 'x64',
                info: {},
                createdAt: new Date(),
                options: [
                     { name: 'RHOSTS', description: 'IP del objetivo', required: true },
                     { name: 'RPORT', description: 'Puerto SMB', required: true, default: '445' },
                     { name: 'LHOST', description: 'IP del listener', required: true },
                ]
            },
            {
                id: 'exploit/linux/ssh/userenum',
                name: 'SSH User Enumeration',
                type: 'exploit',
                category: 'linux/ssh',
                description: 'Enumera usuarios válidos a través de SSH',
                author: 'Security Team',
                version: '1.0.0',
                platform: 'linux',
                required: false,
                arch: 'x64',
                info: {},
                createdAt: new Date(),
                options: [
                     { name: 'RHOSTS', description: 'IP del objetivo', required: true },
                     { name: 'RPORT', description: 'Puerto SSH', required: true, default: '22' },
                     { name: 'USER_FILE', description: 'Ruta al archivo de usuarios', required: true },
                ]
            },
            {
                id: 'payload/reverse_shell',
                name: 'Reverse Shell Payload',
                type: 'payload',
                category: 'shell',
                description: 'Reverse shell en python',
                author: 'Security Team',
                version: '1.0.0',
                platform: 'all',
                required: false,
                arch: 'x64',
                info: {},
                createdAt: new Date(), 
                options: [
                     { name: 'LHOST', description: 'IP del listener', required: true },
                     { name: 'LPORT', description: 'Puerto del listener', required: true, default: '4444' },
                ]
            }
        ]
    }

    public getModules = (req: Request, res: Response): void=>{
        const {type}=req.query;
        let modules = this.modules;
        
        if(type){
            modules = modules.filter(m=> m.type === type);
        }
        
        res.json({
            success: true,
            data: modules,
            total: modules.length,
            message: 'Modules retrieved successfully'
        });
    }

    public getModule = (req: Request, res:Response): void=>{
        const {id} = req.params;
        const module = this.modules.find(m=> m.id === id);

        if(!module){
            res.status(404).json({
                success: false,
                message: 'Module not found'
            });
            return;
        }
        res.json({
            success: true,
            data: module
        });
    };

    public executeModule = (req: Request, res: Response): void=>{
        const {id} = req.params;
        const options = req.body.options || {};

        const module = this.modules.find(m=> m.id === id);

        if(!module){
            res.status(404).json({
                success: false,
                message: 'Module not found'
            });
            return;
        }
        res.json({
            success: true,
            data: {
                module: module.id,
                options,
                status:'Completed',
                output: `Módulo ${module.name} ejecutado exitosamente`,
                timestamp: new Date().toISOString()
            }
        })
    }
}