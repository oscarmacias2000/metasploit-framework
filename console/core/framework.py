# F:\metasploit-msf\core\framework.py

class Framework:
    def __init__(self):
        self.version = "1.0.0"
        self.modules = {}
        self.current_module = None
        self.datastore = {}
        self.session_manager = SessionManager()
        self.payload_manager = PayloadManager()
        self.module_manager = ModuleManager()

        self._register_default_modules()




    def _register_default_modules(self):
        """ Carga módulos de ejemplo en el framework """
        for path in self.module_manager.list_all():
            self.modules[path] = Module(path)

    def use(self, module_id):
        """Selecciona un módulo para usar"""
        if module_id in self.modules:
            self.current_module = self.modules[module_id]
            print(f"[*] Módulo seleccionado: {self.current_module.metadata['name']}")
        else:
            print(f"[-] Módulo no encontrado: {module_id}")

    def run(self):
        """Ejecuta el módulo actual"""
        if self.current_module:
            print(f"[*] Ejecutando módulo: {self.current_module.metadata['name']}")
            print("[*] Módulo ejecutado correctamente")
        else:
            print("[-] No hay módulo seleccionado")
    
    def show_modules(self, module_type=None):
        """Muestra los módulos disponibles"""
        print("\nMódulos disponibles:")
        print("  - exploit/windows/smb/ms17_010_eternalblue")
        print("  - exploit/linux/http/apache_struts2")
        print("  - auxiliary/scanner/portscan/tcp")
        print("  - post/windows/gather/hashdump")
        print("-" * 60)



class Module:
    def __init__(self, name):
        #Detectar plataforma segun el path
        if '/linux' in name:
            platform = 'linux'
        elif '/windows' in name:
            platform = 'windows'
        elif '/android' in name:
            platform = 'android'
        elif '/multiplatform' in name:
            platform = 'multiplatform'
        else:
            platform = 'unknown'        

        self.metadata = {
            'name': name,
            'description': f'Módulo de ejemplo: {name}',
            'author': 'Developer',
            'version': '1.0.0',
            'type': name.split('/')[0] if '/' in name else 'exploit',
            'platform': platform
        }
        self.datastore = {
            'RHOSTS': '127.0.0.1',
            'RPORT': 445,
            'PAYLOAD': 'windows/meterpreter/reverse_tcp'
        }
        self.options = {
            'RHOSTS': {'default': '127.0.0.1', 'required': True, 'description': 'Target host'},
            'RPORT': {'default': 445, 'required': True, 'description': 'Target port'},
            'PAYLOAD': {'default': 'windows/meterpreter/reverse_tcp', 'required': True, 'description': 'Payload to use'}
        }

class SessionManager:
    def __init__(self):
        self.sessions = {}
    
    def get_session(self, session_id):
        return self.sessions.get(session_id)

class PayloadManager:
    def __init__(self):
        self.payloads = [
            'windows/meterpreter/reverse_tcp',
            'windows/meterpreter/reverse_http',
            'linux/x64/meterpreter/reverse_tcp',
            'android/meterpreter/reverse_tcp'
        ]

class ModuleManager:
    def __init__(self):
        self.modules = [
            'exploit/windows/smb/ms17_010_eternalblue',
            'exploit/linux/http/apache_struts2',
            'auxiliary/scanner/portscan/tcp',
            'post/windows/gather/hashdump'
        ]

    def list_all(self):
        return list(self.modules)

    def search(self, query):
        return [m for m in self.modules if query.lower() in m.lower()]

    def reload_all(self):
        print("[*] Recargando todos los módulos...")