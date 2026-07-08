# core/console.py
import sys
import os
from typing import List, Optional
from prompt_toolkit import PromptSession
from prompt_toolkit.history import FileHistory
from prompt_toolkit.auto_suggest import AutoSuggestFromHistory
from prompt_toolkit.completion import WordCompleter
from prompt_toolkit.key_binding import KeyBindings
from prompt_toolkit.styles import Style

#ruta del proyecto
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

class MiConsole:
    """Consola interactiva estilo Metasploit con prompt_toolkit"""
    
    intro = """
    ╔══════════════════════════════════════════════════════════╗
    ║  ███╗   ███╗██╗███╗   ███╗███████╗███████╗              ║
    ║  ████╗ ████║██║████╗ ████║██╔════╝██╔════╝              ║
    ║  ██╔████╔██║██║██╔████╔██║█████╗  ███████╗              ║
    ║  ██║╚██╔╝██║██║██║╚██╔╝██║██╔══╝  ╚════██║              ║
    ║  ██║ ╚═╝ ██║██║██║ ╚═╝ ██║██║     ███████║              ║
    ║  ╚═╝     ╚═╝╚═╝╚═╝     ╚═╝╚═╝     ╚══════╝              ║
    ║  Framework v1.0.0 - Powered by Python                    ║
    ╚══════════════════════════════════════════════════════════╝
    
    [*] Bienvenido a platform/typefish.app.com/console
    [*] Escribe 'help' para ver comandos disponibles
    [*] Escribe 'exit' para salir
    """
    
    def __init__(self, framework):
        self.framework = framework
        self.current_prompt = "msf > "
        self.history_file = "data/console_history.txt"
        
    
        # Comandos disponibles para autocompletado
        self.commands = [
            'use', 'run', 'exploit', 'set', 'unset', 'show',
            'sessions', 'shell', 'back', 'search', 'reload',
            'load', 'exit', 'quit', 'help'
        ]
        
        # Tipos para 'show'
        self.show_types = ['modules', 'options', 'sessions', 'payloads', 'info']

        # Configurar el prompt
        self.session = None
        self.setup_prompt()
        
    
    def setup_prompt(self):
        """Configura el prompt con historial y autocompletado"""
        
        # Estilo del prompt
        style = Style.from_dict({
            'prompt': 'bold #00ff00',
            'path': 'bold #00ffff',
            'error': 'bold #ff0000',
            'info': 'bold #ffff00',
        })
        
        # Bindings de teclas
        bindings = KeyBindings()
        
        @bindings.add('c-c')
        def _(event):
            """Ctrl+C para interrumpir"""
            event.app.exit()
        
        # Crear el completador
        completer = WordCompleter(self.commands, ignore_case=True)
        
        # Crear la sesión
        self.session = PromptSession(
            history=FileHistory(self.history_file),
            auto_suggest=AutoSuggestFromHistory(),
            completer=completer,
            key_bindings=bindings,
            style=style,
            complete_while_typing=True,
        )
    
    def get_prompt(self) -> str:
        """Retorna el prompt actual con formato"""
        if self.framework.current_module:
            module_name = self.framework.current_module.metadata.get('name', 'unknown')
            return f"msf ({module_name}) > "
        return "msf > "
    
    def default(self, line: str):
        """Maneja comandos no reconocidos"""
        print(f"[-] Comando desconocido: {line}")
        print("[*] Usa 'help' para ver comandos disponibles")
    
    def emptyline(self):
        """No hacer nada en línea vacía"""
        pass
    
    # ---------- COMANDOS PRINCIPALES ----------
    
    def do_use(self, arg: str):
        """use <module> - Selecciona un módulo"""
        if not arg:
            print("[-] Especifica un módulo")
            return
        
        if self.framework.use(arg):
            self.current_prompt = f"msf ({arg}) > "
    
    def do_run(self, arg: str):
        """run - Ejecuta el módulo seleccionado"""
        if self.framework.current_module:
            self.framework.run()
        else:
            print("[-] No hay módulo seleccionado")
    
    def do_exploit(self, arg: str):
        """exploit - Alias de run"""
        self.do_run(arg)
    
    def do_set(self, arg: str):
        """set <opción> <valor> - Configura una opción"""
        if not arg:
            print("[-] Uso: set <opción> <valor>")
            return
        
        parts = arg.split(' ', 1)
        if len(parts) != 2:
            print("[-] Formato: set <opción> <valor>")
            return
        
        option, value = parts
        
        if self.framework.current_module:
            self.framework.current_module.datastore[option] = value
            print(f"[+] {option} => {value}")
        else:
            # Variable global
            self.framework.datastore[option] = value
            print(f"[+] {option} (global) => {value}")
    
    def do_unset(self, arg: str):
        """unset <opción> - Elimina una opción"""
        if not arg:
            print("[-] Especifica una opción")
            return
        
        if self.framework.current_module:
            if arg in self.framework.current_module.datastore:
                del self.framework.current_module.datastore[arg]
                print(f"[+] {arg} eliminado")
    
    def do_show(self, arg: str):
        """show <modules|options|sessions|payloads|info> - Muestra información"""
        if not arg:
            print("[-] Uso: show <modules|options|sessions|payloads|info>")
            return
        
        if arg == 'modules':
            self.framework.show_modules()
        elif arg == 'options':
            self.show_options()
        elif arg == 'sessions':
            self.show_sessions()
        elif arg == 'payloads':
            self.show_payloads()
        elif arg == 'info':
            self.show_module_info()
        else:
            print(f"[-] Categoría no soportada: {arg}")
    
    def show_options(self):
        """Muestra opciones del módulo actual"""
        if not self.framework.current_module:
            print("[-] No hay módulo seleccionado")
            return
        
        module = self.framework.current_module
        print("\nOpciones del módulo:")
        print("-" * 60)
        print(f"  {'Nombre':20} {'Valor':20} {'Requerido':15} Descripción")
        print("-" * 60)
        
        for opt_name, opt_info in module.options.items():
            value = module.datastore.get(opt_name, opt_info.get('default', ''))
            required = "SÍ" if opt_info.get('required', False) else "NO"
            print(f"  {opt_name:20} {str(value):20} {required:15} {opt_info.get('description', '')}")
        
        print("-" * 60)
    
    def show_sessions(self):
        """Muestra sesiones activas"""
        if not self.framework.session_manager.sessions:
            print("[-] No hay sesiones activas")
            return
        
        print("\nSesiones activas:")
        print("-" * 60)
        for session_id, session in self.framework.session_manager.sessions.items():
            print(f"  ID: {session_id} - {session}")
    
    def show_payloads(self):
        """Muestra payloads disponibles"""
        print("\nPayloads disponibles:")
        print("-" * 60)
        for name in self.framework.payload_manager.payloads:
            print(f"  {name}")
        print("-" * 60)
    
    def show_module_info(self):
        """Muestra información del módulo actual"""
        if not self.framework.current_module:
            print("[-] No hay módulo seleccionado")
            return
        
        module = self.framework.current_module
        metadata = module.metadata
        
        print(f"""
    Información del módulo: {metadata.get('name', 'N/A')}
    {'=' * 60}
    Descripción: {metadata.get('description', 'N/A')}
    Autor:       {metadata.get('author', 'N/A')}
    Versión:     {metadata.get('version', 'N/A')}
    Tipo:        {metadata.get('type', 'N/A')}
    Plataforma:  {metadata.get('platform', 'N/A')}
    """)
    
    def do_sessions(self, arg: str):
        """sessions - Lista sesiones activas"""
        self.show_sessions()
    
    def do_shell(self, arg: str):
        """shell <session_id> - Interactúa con una sesión"""
        if not arg:
            print("[-] Especifica un ID de sesión")
            return
        
        try:
            session_id = int(arg)
            session = self.framework.session_manager.get_session(session_id)
            if session:
                session.interact()
            else:
                print(f"[-] Sesión {session_id} no encontrada")
        except ValueError:
            print("[-] El ID de sesión debe ser un número")
    
    def do_back(self, arg: str):
        """back - Vuelve al prompt principal"""
        self.framework.current_module = None
        self.current_prompt = "msf > "
        print("[*] Volviendo al prompt principal")
    
    def do_search(self, arg: str):
        """search <query> - Busca módulos"""
        if not arg:
            print("[-] Especifica una búsqueda")
            return
        
        results = self.framework.module_manager.search(arg)
        if results:
            print(f"[+] Encontrados {len(results)} resultados:")
            for module_id in results:
                print(f"  {module_id}")
        else:
            print("[-] No se encontraron resultados")
    
    def do_reload(self, arg: str):
        """reload - Recarga todos los módulos"""
        self.framework.module_manager.reload_all()
    
    def do_load(self, arg: str):
        """load <plugin> - Carga un plugin"""
        print("[*] Sistema de plugins aún no implementado")
    
    def do_exit(self, arg: str):
        """exit - Sale del framework"""
        print("[*] Saliendo...")
        return True
    
    def do_quit(self, arg: str):
        """quit - Alias de exit"""
        return self.do_exit(arg)
    
    def do_help(self, arg: str):
        """help - Muestra ayuda detallada"""
        if arg:
            # Ayuda específica para un comando
            func = getattr(self, f'do_{arg}', None)
            if func and func.__doc__:
                print(func.__doc__)
            else:
                print(f"[-] No hay ayuda para: {arg}")
        else:
            print("""
    Comandos principales:
    =====================
      use <module>        Selecciona un módulo
      run/exploit         Ejecuta el módulo seleccionado
      set <opt> <val>     Configura una opción
      unset <opt>         Elimina una opción
      show <type>         Muestra información (modules, options, sessions, payloads, info)
      back                Vuelve al prompt principal
      search <query>      Busca módulos
      reload              Recarga todos los módulos
      sessions            Lista sesiones activas
      shell <id>          Interactúa con una sesión
      exit/quit           Sale del framework
      help <cmd>          Muestra ayuda de un comando específico
    """)
    
    # ---------- LOOP PRINCIPAL ----------
    
    def cmdloop(self, intro=None):
        """Inicia el loop de la consola"""
        if intro:
            print(intro)
        else:
            print(self.intro)
        
        while True:
            try:
                # Obtener el prompt actual
                prompt_text = self.get_prompt()
                
                # Leer el comando
                line = self.session.prompt(prompt_text)
                
                if not line:
                    continue
                
                # Procesar el comando
                self.onecmd(line)
                
            except KeyboardInterrupt:
                print("\n[*] Saliendo...")
                break
            except EOFError:
                break
            except Exception as e:
                print(f"[-] Error: {e}")
    
    def onecmd(self, line: str):
        """Procesa un comando"""
        if not line.strip():
            return
        
        # Separar comando y argumentos
        parts = line.strip().split(' ', 1)
        cmd = parts[0].lower()
        arg = parts[1] if len(parts) > 1 else ''
        
        # Buscar el método correspondiente
        method = getattr(self, f'do_{cmd}', None)
        if method:
            try:
                # Ejecutar el comando
                result = method(arg)
                if result:
                    self.do_exit('')
            except Exception as e:
                print(f"[-] Error al ejecutar '{cmd}': {e}")
        else:
            self.default(cmd)