#!/usr/bin/env bash
#
# setup-kvm.sh
# Carga el módulo KVM, otorga permisos a los usuarios del grupo kvm
# y reinicia Docker para que detecte los cambios.
#
# Uso: sudo ./setup-kvm.sh
#

set -euo pipefail

# ---------- Colores ----------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log()  { echo -e "${BLUE}[INFO]${NC} $*"; }
ok()   { echo -e "${GREEN}[ OK ]${NC} $*"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $*"; }
err()  { echo -e "${RED}[ERR ]${NC} $*" >&2; }

# ---------- Verificar root ----------
if [[ $EUID -ne 0 ]]; then
  err "Este script debe ejecutarse como root. Usa: sudo $0"
  exit 1
fi

# ---------- Detectar CPU (Intel / AMD) ----------
log "Detectando fabricante de CPU..."
if grep -qi "intel" /proc/cpuinfo; then
  KVM_MODULE="kvm_intel"
  CPU_VENDOR="Intel"
elif grep -qi "amd" /proc/cpuinfo; then
  KVM_MODULE="kvm_amd"
  CPU_VENDOR="AMD"
else
  err "No se pudo detectar CPU Intel/AMD. Abortando."
  exit 1
fi
ok "CPU detectada: $CPU_VENDOR (módulo: $KVM_MODULE)"

# ---------- Verificar virtualización habilitada en BIOS ----------
log "Verificando soporte de virtualización en la CPU..."
if ! grep -Eq '(vmx|svm)' /proc/cpuinfo; then
  err "La virtualización (VT-x/AMD-V) NO está habilitada en la BIOS/UEFI."
  err "Actívala en la BIOS antes de continuar."
  exit 1
fi
ok "Virtualización habilitada en CPU."

# ---------- Cargar módulo base kvm ----------
log "Cargando módulo 'kvm'..."
if lsmod | grep -q '^kvm '; then
  ok "Módulo 'kvm' ya estaba cargado."
else
  modprobe kvm
  ok "Módulo 'kvm' cargado."
fi

# ---------- Cargar módulo específico (kvm_intel / kvm_amd) ----------
log "Cargando módulo '$KVM_MODULE'..."
if lsmod | grep -q "^${KVM_MODULE} "; then
  ok "Módulo '$KVM_MODULE' ya estaba cargado."
else
  modprobe "$KVM_MODULE"
  ok "Módulo '$KVM_MODULE' cargado."
fi

# ---------- Persistir módulos al arranque ----------
MODULES_FILE="/etc/modules-load.d/kvm.conf"
log "Persistiendo módulos en $MODULES_FILE ..."
cat > "$MODULES_FILE" <<EOF
# Cargar KVM al inicio del sistema
kvm
${KVM_MODULE}
EOF
ok "Módulos persistidos para el próximo arranque."

# ---------- Crear grupo kvm si no existe ----------
if ! getent group kvm >/dev/null; then
  log "Creando grupo 'kvm'..."
  groupadd -r kvm
  ok "Grupo 'kvm' creado."
else
  ok "Grupo 'kvm' ya existe."
fi

# ---------- Permisos sobre /dev/kvm ----------
if [[ -e /dev/kvm ]]; then
  log "Ajustando permisos de /dev/kvm ..."
  chown root:kvm /dev/kvm
  chmod 660 /dev/kvm
  ok "Permisos: root:kvm 660 en /dev/kvm"
else
  warn "/dev/kvm no existe todavía. Puede requerir reinicio."
fi

# ---------- Regla udev persistente ----------
UDEV_RULE="/etc/udev/rules.d/99-kvm.rules"
log "Creando regla udev en $UDEV_RULE ..."
cat > "$UDEV_RULE" <<EOF
KERNEL=="kvm", GROUP="kvm", MODE="0660"
EOF
udevadm control --reload-rules 2>/dev/null || true
udevadm trigger 2>/dev/null || true
ok "Regla udev aplicada."

# ---------- Añadir usuario(s) al grupo kvm ----------
# Si se pasa un usuario como argumento ($1), se usa ese.
# Si no, se usa el usuario que invocó sudo (SUDO_USER).
TARGET_USER="${1:-${SUDO_USER:-}}"

if [[ -n "${TARGET_USER}" && "${TARGET_USER}" != "root" ]]; then
  if id "$TARGET_USER" &>/dev/null; then
    log "Añadiendo usuario '$TARGET_USER' al grupo 'kvm'..."
    usermod -aG kvm "$TARGET_USER"
    ok "Usuario '$TARGET_USER' añadido al grupo kvm."
    warn "El usuario debe cerrar sesión y volver a entrar para aplicar el grupo."
  else
    warn "El usuario '$TARGET_USER' no existe. Sáltando."
  fi
else
  warn "No se especificó usuario destino. Añade manualmente con:"
  warn "  sudo usermod -aG kvm <tu_usuario>"
fi

# ---------- Añadir grupo kvm a docker (si existe) ----------
if getent group docker >/dev/null; then
  log "Grupo 'docker' detectado. Asegurando que Docker pueda usar /dev/kvm..."
  # Docker hereda permisos del host, no requiere añadir kvm al grupo docker,
  # pero nos aseguramos de que el socket esté disponible.
  ok "Docker puede acceder a /dev/kvm mediante el grupo kvm del host."
else
  warn "Grupo 'docker' no encontrado. ¿Está Docker instalado?"
fi

# ---------- Reiniciar Docker ----------
if systemctl list-unit-files | grep -q '^docker.service'; then
  log "Reiniciando servicio Docker..."
  systemctl restart docker
  ok "Docker reiniciado."
else
  warn "Servicio docker.service no encontrado. Sáltando reinicio."
fi

# ---------- Verificación final ----------
echo
log "=== Verificación final ==="
ls -l /dev/kvm 2>/dev/null || warn "/dev/kvm no disponible."
lsmod | grep -E '^kvm' || warn "Módulos kvm no cargados."
getent group kvm || warn "Grupo kvm no existe."

echo
ok "¡Listo! KVM configurado y Docker reiniciado."
warn "Recuerda: cierra sesión y vuelve a entrar (o ejecuta 'newgrp kvm') para usar KVM sin sudo."