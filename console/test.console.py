# F:\metasploit-msf\console\console.py
import sys
import os

# Agregar el directorio padre al path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.framework import Framework
from core.console import MiConsole

def main():
    try:
        print("Iniciando Metasploit Framework...", flush=True)
        
        # Crear el framework
        framework = Framework()
        
        # Crear la consola
        console = MiConsole(framework)
        
        # Iniciar la consola
        console.cmdloop()
        
    except KeyboardInterrupt:
        print("\n[*] Saliendo...")
    except Exception as e:
        print(f"[-] Error: {e}")
        import traceback
        traceback.print_exc()
        input("Presiona Enter para salir...")

if __name__ == '__main__':
    main()