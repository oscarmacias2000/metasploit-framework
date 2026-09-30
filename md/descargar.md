# Descargar typefish

> **En desarrollo:** la CLI y la GUI aún no tienen versión estable. Instala desde el repositorio para probar la versión de desarrollo.

typefish está pensado para **entornos propios o con autorización por escrito**. Al instalarlo aceptas usarlo únicamente en redes que te pertenecen o para las que tienes permiso explícito.

---

## Requisitos

| Requisito | Versión mínima | Notas |
|-----------|----------------|-------|
| Python | 3.10+ | Necesario para la CLI y el núcleo |
| git | cualquiera reciente | Para clonar el repositorio |
| Adaptador WiFi | con modo monitor | Solo para captura en vivo |

---

## Instalación

Elige tu sistema operativo y método. Reemplaza la URL del repositorio y el nombre del paquete por los tuyos reales.

### Linux

**Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/typefish.git
cd typefish
./install.sh
```

**Con pip**

```bash
pip install typefish
```

**Con Docker**

```bash
docker pull tu-usuario/typefish:latest
docker run -it --rm tu-usuario/typefish
```

### macOS

**Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/typefish.git
cd typefish
./install.sh
```

**Con Homebrew**

```bash
brew install tu-usuario/tap/typefish
```

**Con Docker**

```bash
docker pull tu-usuario/typefish:latest
docker run -it --rm tu-usuario/typefish
```

### Windows (WSL)

typefish se ejecuta dentro de WSL (Ubuntu recomendado). Primero instala WSL:

```powershell
wsl --install
```

Luego, dentro de WSL:

```bash
git clone https://github.com/tu-usuario/typefish.git
cd typefish
bash install.sh
```

---

## Verificar la instalación

```bash
typefish --version
```

Deberías ver la versión instalada. Si el comando no se encuentra, revisa que el directorio de instalación esté en tu `PATH`.

---

## Actualizar

**Si instalaste desde el repositorio:**

```bash
cd typefish
git pull
./install.sh
```

**Si instalaste con pip:**

```bash
pip install --upgrade typefish
```

---

## Desinstalar

**pip**

```bash
pip uninstall typefish
```

**Repositorio**

```bash
cd typefish
./uninstall.sh   # si tu script lo incluye
```

---

## Código fuente

El código está disponible en el repositorio. Consulta las [releases](https://github.com/tu-usuario/typefish/releases) para ver el changelog y las versiones etiquetadas.

- Repositorio: `https://github.com/tu-usuario/typefish`
- Licencia: MIT

---

## ¿Problemas al instalar?

- Revisa que cumples los [requisitos](#requisitos).
- Consulta la sección de instalación en la [documentación](/docs).
- Abre un issue en GitHub describiendo tu sistema operativo y el error completo.