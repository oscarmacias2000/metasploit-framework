from pymetasploit3.msfrpc import MsfRpcClient
import subprocess
import time
import sys


def verificar_msfrpcd():
    """Verificar si msfrpcd está corriendo"""
    try:
        result = subprocess.run(['pgrep', '-f', 'msfrpcd'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ msfrpcd está corriendo")
            return True
        else:
            print("❌ msfrpcd NO está corriendo")
            return False
    except:
        return False
    

if __name__ == "__verificarmsfrpcd__":
    verificar_msfrpcd()    