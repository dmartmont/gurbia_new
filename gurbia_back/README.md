# Back-end Gurbia
## Información 
Se desarrolló un servidor con Express para los servicios cognitivos de la aplicación, procesamiento del lenguaje natural y sistema de recomendaciones 

## Dependencias 
* Tener instalado [NodeJS](https://nodejs.org/en/) y [Yarn](https://yarnpkg.com/lang/en/)  
* Tener [Redis](https://redis.io/) corriendo en la máquina donde se va a ejecutar el servidor

## Ejecución 
* ### Preparar el ambiente de ejecución
    Iniciar la ejecución de Redis
    ```bash
    $ redis-server
    ```
    Instalar las dependencias de la aplicación
    ```bash
    $ yarn install
    ```
* ### Iniciar la ejecución
    Poner a correr la aplicación
    ```bash
    yarn start
    ```
    (Opcional) Ejecutar el servidor en background 
    ```bash
    pm2 src/app.js
    ```
