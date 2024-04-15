# README QCoordinacionWEB

Este documento proporciona una guía paso a paso para configurar y ejecutar un proyecto de React usando Docker.

## Requisitos Previos

Necesitarás tener instalado en tu máquina:
- Docker [Descargar Docker](https://docs.docker.com/get-docker/)
- Docker Compose (usualmente viene instalado con Docker en versiones para Windows y Mac) [Instrucciones de instalación de Docker Compose](https://docs.docker.com/compose/install/)


### Descripciones de Archivos y Directorios

- docker/: Este directorio contiene los archivos de configuración de Docker.
  - Dockerfile: Archivo de definición para la imagen de Docker del proyecto React.
  - nginx.conf: Configuración para el servidor nginx usado en producción.
- public/: Archivos estáticos y index.html.
- src/: Código fuente de React.
- .dockerignore: Lista de archivos y directorios que Docker debe ignorar.
- docker-compose.yml: Define los servicios, redes y volúmenes para los contenedores Docker.
- package.json: Dependencias del proyecto npm.

## Configuración de Docker

### Dockerfile

Aquí tienes un ejemplo básico de un Dockerfile que podrías usar:

dockerfile
# Establece la imagen base
FROM node:14-alpine as build

# Establece el directorio de trabajo
WORKDIR /app

# Añade `node_modules/.bin` al $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Instala las dependencias del proyecto
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

# Añade los archivos del proyecto
COPY . ./

# Construye la aplicación para producción
RUN npm run build

# Etapa de producción
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copia el archivo de configuración de nginx
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Inicia nginx
CMD ["nginx", "-g", "daemon off;"]


### docker-compose.yml

Aquí tienes un ejemplo de docker-compose.yml:

yaml
version: '3.8'
services:
  react:
    container_name: react_app
    build:
      context: .
      dockerfile: docker/Dockerfile
    ports:
      - '80:80'
    volumes:
      - .:/app
      - /app/node_modules


## Cómo Ejecutar

Para levantar los contenedores Docker y ejecutar el proyecto, utiliza los siguientes comandos:

1. Construir y levantar los contenedores:

   bash
   docker-compose up --build
   

2. Para detener y remover los contenedores, redes y volúmenes creados por docker-compose up, puedes usar:

   bash
   docker-compose down
   

3. Para ejecutar el proyecto en modo desarrollo, puedes usar:

   bash
   docker-compose up
   

Estos comandos te permitirán trabajar con tu proyecto React dentro de contenedores Docker, asegurando que tu entorno de desarrollo sea reproducible y consistente, independientemente de la máquina donde se ejecute.

## Contribuciones

Si deseas contribuir a este proyecto, por favor considera lo siguiente:

- Haz fork del repositorio y crea tu propia rama antes de proponer cambios.
- Asegúrate de que los tests pasen (si están configurados) antes de enviar un pull request.

Esto debería proporcionarte un buen punto de partida para tu README. Personalízalo según las necesidades de tu proyecto.