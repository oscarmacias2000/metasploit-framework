#!/bin/bash
echo "🔧 REPARANDO VSFTPD EN METASPLOITABLE (192.168.34.154)"
echo "======================================================"

# 1. Limpiar iptables completamente
echo -e "\n📡 Limpiando firewall..."
sudo iptables -P INPUT ACCEPT
sudo iptables -P FORWARD ACCEPT
sudo iptables -P OUTPUT ACCEPT
sudo iptables -t nat -F
sudo iptables -t mangle -F
sudo iptables -F
sudo iptables -X

# 2. Configurar hosts.allow (permitir tu Ubuntu)
echo -e "\n🔓 Configurando hosts.allow..."
echo "vsftpd: 192.168.34.160" | sudo tee -a /etc/hosts.allow
echo "sshd: 192.168.34.160" | sudo tee -a /etc/hosts.allow

# 3. Limpiar hosts.deny (quitar bloqueos)
echo -e "\n🔓 Limpiando hosts.deny..."
sudo cp /etc/hosts.deny /etc/hosts.deny.backup
echo "# Archivo limpio - todas las IPs permitidas" | sudo tee /etc/hosts.deny

# 4. Reiniciar vsftpd (forma correcta para Metasploitable 2)
echo -e "\n🔄 Reiniciando vsftpd..."
sudo killall vsftpd 2>/dev/null
sleep 2
sudo /usr/sbin/vsftpd &

# 5. Verificar que está corriendo
echo -e "\n✅ VERIFICACIÓN:"
sleep 3
ps aux | grep vsftpd | grep -v grep
sudo netstat -tlnp | grep :21

# 6. Mostrar IP actual
echo -e "\n📋 IP de Metasploitable:"
ifconfig | grep "inet addr" | grep -v 127.0.0.1

echo -e "\n🎯 Listo! Ahora prueba desde Ubuntu:"
echo "   nmap -p 21 192.168.34.154"
