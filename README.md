# Prode Mundial 2026

Aplicación web fullstack para jugar un prode del Mundial 2026 entre amigos y familia.

El proyecto fue desarrollado con foco en simplicidad de uso, persistencia de datos y compatibilidad entre distintos dispositivos y navegadores. Los usuarios pueden registrar sus predicciones para cada partido, consultar rankings globales y visualizar las predicciones del resto de participantes.

La aplicación utiliza una arquitectura fullstack integrada en un único proyecto, combinando frontend y backend mediante funciones serverless provistas por vercel

## Demo

Deploy disponible en:

https://prode-mundial-2026-umber.vercel.app/

## Características principales

- Registro e inicio de sesión de usuarios
- Autenticación mediante JWT
- Persistencia de sesión utilizando cookies
- Predicción de resultados de partidos
- Visualización de predicciones de otros usuarios
- Ranking global de posiciones
- Persistencia de datos entre dispositivos
- Panel de administración para gestión de partidos y resultados
- Arquitectura fullstack en un único proyecto
- Diseño responsive compatible con dispositivos móviles y escritorio
- Persistencia y optimización de consultas utilizando LocalForage

## Tecnologías utilizadas

### Frontend

- React
- Vite
- Tailwind CSS

### Backend

- Vercel Serverless Functions
- Node.js

### Base de datos

- PostgreSQL
- Neon
- Prisma ORM

### Autenticación

- JSON Web Tokens (JWT)

### Persistencia y optimización

- LocalForage

## Arquitectura general

La aplicación fue desarrollada utilizando una arquitectura fullstack integrada en un único repositorio.

El frontend fue construido con React y Vite, mientras que el backend se implementó utilizando funciones serverless de Vercel dentro del mismo proyecto. Esto permite centralizar tanto la lógica visual como la lógica de negocio sin necesidad de mantener APIs externas independientes.

La persistencia de datos se realiza mediante PostgreSQL utilizando Neon como proveedor de base de datos y Prisma como ORM principal.

La comunicación entre frontend y backend se realiza mediante recursos API propios encargados de:

- autenticación
- gestión de usuarios
- carga de partidos
- almacenamiento de predicciones
- carga de resultados
- consulta de rankings

## Funcionalidades

### Usuarios

Los usuarios pueden:

- Registrarse e iniciar sesión
- Realizar predicciones sobre partidos pendientes
- Consultar sus predicciones guardadas
- Ver predicciones realizadas por otros usuarios
- Consultar la tabla global de posiciones

### Administradores

Los usuarios administradores pueden además:

- Crear partidos
- Cargar resultados oficiales

El sistema de roles se administra desde la base de datos.

## Base de datos

El sistema utiliza PostgreSQL como motor principal de persistencia.

Las principales entidades manejadas por la aplicación son:

- Usuarios
- Partidos
- Predicciones
- Resultados
- Roles

Prisma se utiliza como ORM para modelar y gestionar todas las operaciones sobre la base de datos.

## Recursos API

La aplicación expone recursos internos para:

- autenticación
- usuarios
- partidos
- predicciones
- resultados
- ranking global

Estos recursos son consumidos directamente desde el frontend mediante las funciones serverless del proyecto.

## Persistencia y sincronización

Toda la información se almacena de manera persistente en la base de datos, permitiendo acceder a las predicciones desde distintos dispositivos.

Además, se utiliza LocalForage para:

- optimizar consultas frecuentes
- reducir tiempos de carga
- mantener persistencia local de ciertos datos

La sincronización se realiza mediante consultas a la API interna de la aplicación.

## Reutilización del sistema

Aunque el proyecto fue desarrollado pensando en el Mundial 2026, el sistema fue diseñado para poder reutilizarse en otros torneos o competencias.

Los partidos son cargados manualmente por administradores, permitiendo adaptar fácilmente la aplicación a distintos formatos de competición.

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/lucasmargni/prode-mundial-2026.git
cd prode-mundial-2026
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL=tu_database_url
JWT_SECRET=tu_jwt_secret
```

### 4. Generar cliente Prisma

```bash
npx prisma generate
```

### 5. Ejecutar entorno de desarrollo

```bash
vercel dev
```

## Variables de entorno

| Variable     | Descripción                                    |
| ------------ | ---------------------------------------------- |
| DATABASE_URL | URL de conexión a la base de datos PostgreSQL  |
| JWT_SECRET   | Clave secreta utilizada para firmar tokens JWT |

## Compatibilidad

La aplicación fue desarrollada para funcionar correctamente en:

- dispositivos móviles
- tablets
- computadoras de escritorio

Compatible con navegadores modernos.

## Licencia

Este proyecto se distribuye bajo la licencia MIT.

Consultar el archivo `LICENSE` para más información.
