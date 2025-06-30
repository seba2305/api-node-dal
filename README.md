# API Node.js - Sistema Bancario

## 📋 Descripción

Esta es una API RESTful desarrollada en Node.js que simula un sistema bancario básico para la gestión de cuentas bancarias. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre cuentas bancarias, utilizando un archivo JSON como base de datos simulada.

El sistema maneja información de:
- **Cuentas bancarias**: Diferentes tipos de cuentas con sus respectivos balances y configuraciones
- **Clientes**: Datos personales y de contacto

## 🚀 Características

- ✅ API RESTful con arquitectura en capas (Controller → Service → Model)
- ✅ Operaciones CRUD completas para cuentas bancarias
- ✅ Persistencia de datos en archivo JSON
- ✅ Generación automática de IDs únicos
- ✅ Manejo de errores HTTP estándar
- ✅ Estructura modular y escalable
- ✅ Soporte para múltiples tipos de cuentas bancarias
- ✅ Validación básica de campos requeridos

## 🛠️ Tecnologías Utilizadas

### Dependencias Principales
- **[Express.js](https://expressjs.com/)** (v5.1.0) - Framework web minimalista para Node.js
- **[Body-parser](https://www.npmjs.com/package/body-parser)** (v2.2.0) - Middleware para parsear el cuerpo de las peticiones HTTP
- **[UUID](https://www.npmjs.com/package/uuid)** (v11.1.0) - Generación de identificadores únicos universales

### Dependencias de Desarrollo
- **[Nodemon](https://nodemon.io/)** (v3.1.10) - Herramienta para reiniciar automáticamente la aplicación durante el desarrollo

### Dependencias del Sistema
- **Node.js** - Entorno de ejecución de JavaScript
- **File System (fs)** - Módulo nativo para manejo de archivos

## 📁 Estructura del Proyecto

```
api-node-js/
├── src/
│   ├── controllers/          # Controladores - Lógica de manejo de peticiones HTTP
│   │   └── accountController.js
│   ├── services/            # Servicios - Lógica de negocio
│   │   └── accountService.js
│   ├── database/            # Capa de datos
│   │   ├── Account.js       # Modelo de datos para cuentas
│   │   ├── db.json         # Base de datos simulada
│   │   └── utils.js        # Utilidades para manejo de datos
│   ├── v1/                 # Versionado de API
│   │   └── routes/         # Definición de rutas
│   │       └── accountRoutes.js
│   └── index.js            # Punto de entrada de la aplicación
├── package.json            # Configuración del proyecto y dependencias
└── README.md              # Documentación del proyecto
```

## 🔌 Endpoints Disponibles

### Cuentas Bancarias (`/api/v1/accounts`)

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `GET` | `/api/v1/accounts` | Obtener todas las cuentas | - |
| `GET` | `/api/v1/accounts/:accountId` | Obtener una cuenta específica | `accountId` (path) |
| `POST` | `/api/v1/accounts` | Crear una nueva cuenta | Body JSON |
| `PATCH` | `/api/v1/accounts/:accountId` | Actualizar una cuenta | `accountId` (path), Body JSON |
| `DELETE` | `/api/v1/accounts/:accountId` | Eliminar una cuenta | `accountId` (path) |

### Ejemplo de Body para crear cuenta:
```json
{
  "clienteId": "CLI-001",
  "numeroCuenta": "00112345678903",
  "tipoCuenta": "CUENTA_CORRIENTE",
  "tipoMoneda": "CLP",
  "sucursalApertura": "001-PROVIDENCIA"
}
```

## ⚙️ Instalación y Configuración

### Prerrequisitos
- **Node.js** (versión 14 o superior)
- **npm** (generalmente incluido con Node.js)

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   # Si tienes el repositorio
   git clone <url-del-repositorio>
   cd api-node-js
   ```

2. **Instalar las dependencias**
   ```bash
   npm install
   ```

3. **Verificar la estructura de archivos**
   Asegúrate de que el archivo `src/database/db.json` existe y contiene los datos iniciales.

## 🚀 Ejecución

### Modo Desarrollo (Recomendado)
```bash
npm run dev
```
- Utiliza **nodemon** para reiniciar automáticamente cuando detecta cambios
- El servidor se ejecuta en `http://localhost:3000`

### Modo Producción
```bash
node src/index.js
```

### Variables de Entorno
Puedes configurar el puerto de la aplicación:
```bash
# Windows (CMD)
set PORT=4000 && npm run dev

# Windows (PowerShell)
$env:PORT=4000; npm run dev

# Linux/Mac
PORT=4000 npm run dev
```

## 📝 Uso de la API

### Ejemplo con cURL

**Obtener todas las cuentas:**
```bash
curl -X GET http://localhost:3000/api/v1/accounts
```

**Crear una nueva cuenta:**
```bash
curl -X POST http://localhost:3000/api/v1/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": "CLI-001",
    "numeroCuenta": "00112345678903",
    "tipoCuenta": "CUENTA_CORRIENTE",
    "tipoMoneda": "CLP",
    "sucursalApertura": "001-PROVIDENCIA"
  }'
```

**Obtener una cuenta específica:**
```bash
curl -X GET http://localhost:3000/api/v1/accounts/CTA-001-001
```

### Formato de Respuesta
```json
{
  "status": "success",
  "data": {
    // Datos de la respuesta
  }
}
```

### Manejo de Errores
```json
{
  "status": "error",
  "message": "Descripción del error"
}
```

## 🔧 Desarrollo

### Scripts Disponibles
- `npm run dev` - Ejecuta la aplicación en modo desarrollo con recarga automática
- `npm test` - Ejecuta las pruebas (pendiente de implementar)

### Notas de Desarrollo
- Los datos se persisten automáticamente en `src/database/db.json`
- La API utiliza UUIDs para generar identificadores únicos
- Se incluye validación básica de campos requeridos
- Está preparada para implementar `express-validator` para validaciones más robustas

## 📄 Licencia

ISC License


**Nota:** Esta es una API de desarrollo/pruebas que utiliza un archivo JSON como base de datos. Para producción, se recomienda integrar con una base de datos real como PostgreSQL, MySQL o MongoDB.
