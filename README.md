Client side app CRUD.

Instrucciones de ejecución.
Para ejecutar este proyecto debe contar con:
- Node js instalado en su equipo. 
- Visual Studio Code o cualquier IDE de su preferencia (opcional).


Paso 1. 
1.Clonar el repositorio o descargar el código zip.

Paso 2. 
2.Abrir proyecto en IDE (Visual studio Code) o acceder a la ruta del proyecto desde la consola , ubicarse en la raiz del proyecto.
3. Ejecutar el siguiente  comando:
  - npm install (para instalar los package usados en el desarrollo) 
  
Paso 3.
4.Ejecutar el comand:
- npm start (para iniciar el proyecto).

5. IMPORTANTE : Se debe estar ejecutando el proyecto del back-end ubicado en el siguiente repositorio: 
https://github.com/yameliscalderon/WebApiServer-NetCore6 para el funcionamiento de la app.

6.El proyecto se encuentra configurado para ejecutarse en el puerto 8081 (por CORS policy), 
http://localhost:8081
En caso de requerir cambiar el puerto de ejecución deberá editar la variable PORT ubicada en el archivo .env 
asi mismo deberá editar el origin de las CORS policy en el proyecto del Paso 5 ubicada en el archivo Programs.cs.



