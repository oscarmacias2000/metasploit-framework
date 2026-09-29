# 🛡️ [Nombre del Proyecto]

> Framework modular de auditoría, explotación y post-explotación multiplataforma.
> Soporta Windows, Linux, macOS, Nokia (Symbian/Series 30+), navegadores, módems, routers y conmutadores.

![status](https://img.shields.io/badge/status-active-success)
![license](https://img.shields.io/badge/license-MIT-blue)
![platform](https://img.shields.io/badge/platform-multi--OS-informational)

---

## ⚠️ Aviso legal

Este proyecto está diseñado **exclusivamente** para:
- Pruebas de penetración autorizadas por escrito.
- Laboratorios de investigación propios o con permiso.
- CTFs, entornos educativos y formación en ciberseguridad.
- Auditorías de seguridad con contrato firmado (scope definido).

**El uso de este software contra sistemas sin autorización explícita es ilegal** en la mayoría de jurisdicciones (Computer Fraud and Abuse Act, Ley Orgánica de Protección de Datos, Convenio de Budapest, etc.). Los autores no se hacen responsables del mal uso.

---

## 📚 Tabla de contenidos

1. [Descripción general](#-descripción-general)
2. [Arquitectura](#-arquitectura)
3. [Módulos](#-módulos)
   - [aux](#aux--módulos-auxiliares)
   - [post](#post--post-explotación)
   - [payloads](#payloads--generación-de-payloads)
   - [console](#console--consola-interactiva)
   - [exploits](#exploits--explotación)
   - [scanners](#scanners--reconocimiento)
   - [injection](#injection--inyección-js)
   - [network](#network--módems-routers-y-conmutadores)
4. [Alcance (targets)](#-alcance-targets)
5. [Vectores soportados](#-vectores-soportados)
6. [Instalación](#-instalación)
7. [Uso rápido](#-uso-rápido)
8. [Estructura del proyecto](#-estructura-del-proyecto)
9. [Roadmap](#-roadmap)
10. [Contribuir](#-contribuir)
11. [Licencia](#-licencia)

---

## 🧭 Descripción general

**typefish** escrito en Python (con soporte para scripts nativos en cada plataforma) que permite:

- Ejecutar **reconocimiento, explotación y post-explotación** sobre múltiples objetivos.
- Generar **payloads** personalizados por plataforma.
- Inyectar **JavaScript** en navegadores y contextos web.
- Interactuar con **dispositivos de red** (módems, routers, conmutadores).
- Mantener sesiones persistentes vía **consola interactiva**.

Cada módulo es **independiente, cargable en caliente** y sigue una interfaz común.

---

## 🏗️ Arquitectura

```
┌──────────────────────────────────────────────────────┐
│                    CLI / Console                     │
│              (msfconsole-like interactive)           │
└────────────────────────┬─────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
   ┌─────────┐     ┌──────────┐     ┌───────────┐
   │ Scanner │     │ Exploit  │     │ Post      │
   └────┬────┘     └────┬─────┘     └─────┬─────┘
        │               │                 │
        └───────────────┼─────────────────┘
                        ▼
              ┌───────────────────┐
              │   Session Manager │
              │  (aux/payloads)   │
              └─────────┬─────────┘
                        ▼
              ┌───────────────────┐
              │   Transport Layer │
              │ (TCP/UDP/HTTP/WS) │
              └───────────────────┘
```

---

## 🧩 Módulos

### `aux/` — Módulos auxiliares

Módulos que **no explotan** pero son esenciales: escaneo, fuzzing, enumeración, sniffing, fuerza bruta.

| Módulo | Descripción | Alcance |
|--------|-------------|---------|
| `aux/scanner/portscan` | Escaneo TCP/UDP/SYN | Todos |
| `aux/scanner/smb_enum` | Enumeración SMB | Windows |
| `aux/scanner/ssh_enum` | Enumeración SSH | Linux, macOS |
| `aux/scanner/http_enum` | Directorios y vhosts | Navegadores, routers |
| `aux/sniffer/arp_sniff` | ARP spoofing + sniffing | LAN |
| `aux/bruteforce/ssh` | Fuerza bruta SSH | Linux, macOS |
| `aux/fuzz/http_fuzz` | Fuzzing HTTP | Web, routers |
| `aux/mitm/proxy` | Proxy MITM con SSL strip | Redes |

---

### `post/` — Post-explotación

Se ejecutan **después** de obtener una sesión.

| Módulo | Descripción | Alcance |
|--------|-------------|---------|
| `post/windows/persistence` | Registro, tareas, servicios | Windows |
| `post/windows/cred_dump` | LSASS, SAM, DPAPI | Windows |
| `post/linux/persistence` | systemd, cron, rc.local | Linux |
| `post/linux/priv_esc` | SUID, sudo, kernel exploits | Linux |
| `post/macos/persistence` | LaunchAgents, LaunchDaemons | macOS |
| `post/macos/keychain_dump` | Keychain extraction | macOS |
| `post/nokia/sms_dump` | Lectura de SMS | Nokia (Symbian) |
| `post/nokia/contacts` | Extracción de contactos | Nokia |
| `post/browser/cookie_steal` | Robo de cookies | Chrome, Firefox, Edge, Safari |
| `post/browser/history_dump` | Historial y bookmarks | Navegadores |
| `post/lateral/psexec` | Movimiento lateral | Windows |
| `post/lateral/ssh_pivot` | Pivoting por SSH | Linux, macOS |
| `post/cleanup/wipe_logs` | Borrado de evidencias | Todos |

---

### `payloads/` — Generación de payloads

Genera artefactos por plataforma y arquitectura.

| Payload | Descripción | Target |
|---------|-------------|--------|
| `payloads/windows/x64/meterpreter.exe` | Reverse shell x64 | Windows |
| `payloads/windows/x86/shellcode.ps1` | PowerShell in-memory | Windows |
| `payloads/linux/x64/elf_reverse` | ELF reverse shell | Linux |
| `payloads/linux/arm/mips_reverse` | ARM/MIPS (IoT) | Routers |
| `payloads/macos/x64/macho_reverse` | Mach-O reverse | macOS |
| `payloads/macos/arm64/macho_reverse` | Apple Silicon | macOS M1/M2 |
| `payloads/nokia/sis/backdoor.sis` | Paquete SIS | Symbian |
| `payloads/nokia/j2me/backdoor.jar` | J2ME MIDlet | Nokia S30+ |
| `payloads/browser/js_inject.js` | JS inyectable | Navegadores |
| `payloads/browser/wasm_inject.wasm` | WASM ofuscado | Navegadores |
| `payloads/network/router_mips.bin` | Firmware backdoor | Routers |
| `payloads/network/switch_cisco.tcl` | Script TCL IOS | Conmutadores Cisco |

**Opciones comunes:**
```
LHOST, LPORT, ENCODER, ITERATIONS, FORMAT (exe/elf/macho/sis/jar/js/wasm), ARCH
```

---

### `console/` — Consola interactiva

CLI estilo `msfconsole` con:

- Carga dinámica de módulos (`use`, `set`, `run`, `back`).
- Gestión de sesiones (`sessions -l`, `sessions -i <id>`).
- Historial persistente, autocompletado, colores.
- Workspaces por proyecto/cliente.
- Logs de actividad con timestamps.
- Plugins externos (Python, Lua, JS).

**Comandos principales:**

| Comando | Descripción |
|---------|-------------|
| `search <keyword>` | Busca módulos |
| `use <module>` | Carga módulo |
| `set <opt> <val>` | Define opción |
| `show options` | Muestra opciones |
| `run` / `exploit` | Ejecuta |
| `sessions -l` | Lista sesiones activas |
| `sessions -i <id>` | Interactúa con sesión |
| `jobs -l` | Lista jobs en background |
| `workspace -a <name>` | Crea workspace |
| `db_import <file>` | Importa resultados (XML/JSON) |
| `exit` | Salir |

---

### `exploits/` — Explotación

| Exploit | CVE | Target |
|---------|-----|--------|
| `exploits/windows/smb/ms17_010` | CVE-2017-0144 | Windows 7/2008 |
| `exploits/windows/rdp/bluekeep` | CVE-2019-0708 | Windows XP/7/2008 |
| `exploits/linux/kernel/dirtypipe` | CVE-2022-0847 | Linux 5.8+ |
| `exploits/macos/tcc_bypass` | Varios | macOS |
| `exploits/browser/chrome_rce` | Varios | Chrome |
| `exploits/router/tplink_rce` | CVE-2023-1389 | TP-Link |
| `exploits/router/mikrotik_chimay` | CVE-2018-14847 | MikroTik |
| `exploits/switch/cisco_ios` | Varios | Cisco IOS |

---

### `scanners/` — Reconocimiento

- Descubrimiento de hosts (ARP, ICMP, TCP).
- Fingerprinting de SO (TTL, TCP/IP stack).
- Detección de servicios y versiones.
- Enumeración SNMP, SMB, LDAP, NetBIOS.
- Escaneo de red Wi-Fi (modo monitor).

---

### `injection/` — Inyección JS

| Módulo | Descripción | Target |
|--------|-------------|--------|
| `injection/js/beef_hook` | Hook BeEF | Navegadores |
| `injection/js/keylogger` | Keylogger JS | Navegadores |
| `injection/js/webcam` | Acceso cámara/mic | Navegadores |
| `injection/js/crypto_miner` | Minero en background | Navegadores |
| `injection/js/form_grabber` | Captura de formularios | Navegadores |
| `injection/js/wasm_loader` | Carga WASM malicioso | Navegadores modernos |

Soporta inyección vía:
- XSS reflejado/almacenado/DOM.
- MITM proxy (BeEF, mitmproxy).
- Extensiones maliciosas.
- Service Workers.

---

### `network/` — Módems, routers y conmutadores

| Módulo | Descripción | Target |
|--------|-------------|--------|
| `network/modem/at_commands` | Comandos AT vía serial | Módems GSM/3G/4G |
| `network/modem/sms_send` | Envío de SMS | Módems |
| `network/router/default_creds` | Credenciales por defecto | Routers |
| `network/router/firmware_dump` | Dump de firmware | Routers |
| `network/router/upnp_exploit` | UPnP abuse | Routers |
| `network/switch/vlan_hop` | VLAN hopping | Conmutadores |
| `network/switch/stp_attack` | STP manipulation | Conmutadores |
| `network/switch/cdp_sniff` | CDP/LLDP sniffing | Cisco |
| `network/switch/tftp_dump` | Config por TFTP | Conmutadores |

---

## 🎯 Alcance (targets)

| Plataforma | Versiones soportadas | Notas |
|------------|----------------------|-------|
| **Windows** | 7, 8, 8.1, 10, 11, Server 2008–2022 | x86, x64, ARM64 |
| **Linux** | Kernel 2.6 → 6.x | x86, x64, ARM, MIPS, RISC-V |
| **macOS** | 10.13 → 15 (Sequoia) | Intel + Apple Silicon |
| **Nokia** | Symbian S60, Series 30+, J2ME | SIS, JAR |
| **Navegadores** | Chrome, Firefox, Edge, Safari, Brave | Últimas 5 versiones |
| **Módems** | Huawei, ZTE, Sierra, Quectel | AT commands, SMS, GPRS |
| **Routers** | TP-Link, MikroTik, Ubiquiti, D-Link, Netgear | Firmware, UPnP, RCE |
| **Conmutadores** | Cisco IOS, Juniper JunOS, HP ProCurve | VLAN, STP, CDP |

---

## 🧪 Vectores soportados

- **Inyección JS** (XSS, MITM, extensiones, Service Workers).
- **Reverse/Bind shells** (TCP, UDP, HTTP, HTTPS, DNS, ICMP).
- **Payloads in-memory** (PowerShell, Python, Bash, JS).
- **Persistencia** (registro, systemd, LaunchAgents, cron).
- **Movimiento lateral** (SMB, SSH, RDP, WinRM).
- **Pivoting** (SOCKS proxy, port forwarding).
- **Exfiltración** (DNS, HTTP, ICMP, cloud storage).
- **Evasion** (ofuscación, encoding, AMSI bypass, ETW patch).
- **Privilege escalation** (kernel, SUID, tokens, UAC bypass).
- **Firmware attacks** (routers, switches, modems).

---

## ⚙️ Instalación

### Requisitos
- Python 3.10+
- Docker (para PostgreSQL y contenedores de payload)
- Node.js 18+ (para módulos JS)
- GCC/Clang (compilación de payloads nativos)
- MinGW-w64 (cross-compile Windows desde Linux)

### Pasos
## 🚀 Uso rápido

```bash
# Iniciar consola
python console/main.py

# Dentro de la consola:
msf > search smb
msf > use exploits/windows/smb/ms17_010
msf > set RHOSTS 192.168.1.0/24
msf > set PAYLOAD payloads/windows/x64/meterpreter.exe
msf > run

# Ver sesiones
msf > sessions -l
msf > sessions -i 1

# Post-explotación
meterpreter > run post/windows/cred_dump
meterpreter > run post/windows/persistence
```

---

## 📁 Estructura del proyecto

```
/home/arqerito/proyectos/metasploit-framework/console
```
---


## 🤝 Contribuir

1. Fork del repo.
2. Crea rama: `git checkout -b feature/nuevo-modulo`.
3. Commit: `git commit -m "feat: agrega módulo X"`.
4. Push: `git push origin feature/nuevo-modulo`.
5. Abre Pull Request.

Lee `CONTRIBUTING.md` y el `CODE_OF_CONDUCT.md` antes.

---

## 📜 Licencia

MIT — ver [LICENSE](LICENSE).

**Uso exclusivo en entornos autorizados.**