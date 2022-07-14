# TPE URL Shortener

Trabajo Práctico Especial para la materia Base de Datos II

## Integrantes

* Dey, Patrick
* Lombardi, Matías
* Rosati, Santos

## Redireccionamiento de URLs

El proyecto consiste en una API REST que guarda URLs y un alias relacionado, para acortar el mismo. También hay una aplicación web a modo de demostración de cómo interactúa un cliente.

## Prerrequisitos
- Node
- Una base de datos PostgreSQL
- Una base de datos Redis

## Setup API RESTFUL

Dentro de la carpeta backend encontrara todos los archivos relacionados con la API REST. A continucación detallaremos cual es la guía de instalación.

1) Dentro del archivo DDL encontrara los comandos para crear las tablas necesarias en la base de datos PostgreSQL de su elección
2) Deberá crear el archivo de nombre .env en el directorio con el siguiente contenido:
    ```
        PORT=puerto API
        DB_USER=user PostgreSQL
        DB_PASSWORD=password PostgreSQL
        DB_PORT=puerto PostgreSQL
        DB_HOST=localhost
        DB_NAME=PostgreSQL db name
        JWT_SECRET_KEY=string a elección
        REDIS_URL=redis://localhost:6379
    ```
3) Asegurese de tener corriendo Redis en el puerto 6379
4) Ejecute el siguiente comando en la terminal para descargar las dependencias

    ```npm install```
4) Ejecute el siguiente comando en la terminal (dentro del directorio backend)
    
    ``` npm run start```

## Setup Frontend

Dentro de la carpeta frontend encontrara todos los archivos relacionados con la Single Page Application que se comunicara con la API. A continucación detallaremos cual es la guía de instalación.

1) Deberá crear el archivo de nombre .env.development en el directorio con el siguiente contenido:
    ```
        REACT_APP_API_URL = http://localhost:3001
    ```
    Asegurandose que el puerto elegido sea el mismo que el utilizado para la API.
    (por ejemplo, si la API se ejecuta en el puerto 3000, ingresar el puerto 3000)
3) Asegurese de tener la API corriendo
4) Ejecute el siguiente comando en la terminal para descargar las dependencias

    ```npm install```
4) Ejecute el siguiente comando en la terminal (dentro del directorio backend)
    
    ``` npm run start```
## Documentación

Para documentar la API REST se utilizo la librería swagger-autogen de Swagger.
La documentación obtenida puede ser accedida desde el siguiente link:

https://bit.ly/bd2-pms
