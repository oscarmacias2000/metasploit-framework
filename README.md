# Base de Datos PostgreSQL: Módulos

Este repositorio contiene la configuración y documentación de la base de datos **PostgreSQL** utilizada en el proyecto de gestión de módulos.

---

## 📋 **Descripción General**
La base de datos `modules` almacena información sobre los módulos del sistema, incluyendo sus nombres, descripciones, tipos y plataformas.

---

## 🗃️ **Estructura de la Base de Datos**

### **Tablas Principales**

#### **1. `modules`**
Almacena la información de los módulos registrados.

| Campo         | Tipo          | Descripción                          | Ejemplo               |
|---------------|---------------|--------------------------------------|-----------------------|
| `id`          | `SERIAL`      | Identificador único del módulo.      | `1`                   |
| `namemodule`  | `VARCHAR(255)`| Nombre del módulo.                   | `"Módulo de Autenticación"` |
| `description` | `TEXT`        | Descripción detallada del módulo.   | `"Maneja la autenticación de usuarios"` |
| `type`        | `VARCHAR(50)` | Tipo o categoría del módulo.        | `"Seguridad"`         |
| `plataform`   | `VARCHAR(50)` | Plataforma donde se ejecuta.        | `"Web"`               |

---

## 🔧 **Configuración de la Base de Datos**


## sequelize
![Sequelize Logo](https://sequelize.org/img/logo.svg)
## postgresql
![postgresql logo](http://localhost:5173/src/assets/PostgresSQL.svg)
