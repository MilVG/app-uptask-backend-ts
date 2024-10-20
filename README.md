# PROYECTO ADMINISTRADOR DE TAREAS.
  
> >[!Note]
> > Tecnologias Utilizadas MERN

 - MongoDB
 - Express
 - React
 - Node.js

> > [!Info] PRIMER CAPITULO:
> > Primeros Pasos backend
> > 
> > ### - Creando el Servidor
> > - [Ignorar/carpetas-Importantes](https://github.com/MilVG/app-uptask-backend-ts/commit/982d773989fc64ac1a3519e1f3ca91c06edb5ce3)
> > - [Instalacion/Dependencias-Primarias](https://github.com/MilVG/app-uptask-backend-ts/commit/4b585f9d2c58bfd058173148170b479059fada5a)
> > - [Creación/Directorios&&Archivos-Principales](https://github.com/MilVG/app-uptask-backend-ts/commit/384b13cdf1c316ee3d15459d556b128ec3caa043)
> > - [Configuracion/Archivo-tsconfig.json](https://github.com/MilVG/app-uptask-backend-ts/commit/4917ba0dcfc4ff7642600d42ad54ed487322c2e8)
> > - [Definicion/Servidor-Express](https://github.com/MilVG/app-uptask-backend-ts/commit/6a332e1ecca7c5332f4d502d216e68f0f4854b8f)
> > - [Estableciendo/Conexion-puerto-4000](https://github.com/MilVG/app-uptask-backend-ts/commit/530b272f94e2d5c70b8cfe4c5172bb633db5f240)
> > - [Definicion/Eejecucion-package.json](https://github.com/MilVG/app-uptask-backend-ts/commit/936919ec18f2a9a32a1fc9189d6f0108f83cbd53)
> > ### - Añadiendo Colores
> > - [Instalacion/Dependencia-Colors](https://github.com/MilVG/app-uptask-backend-ts/commit/480ba50ff3c046af2c3b5734ce4780a9d0c0d0f8)
> > - [Incorporacion/Colores-mensajes-consola](https://github.com/MilVG/app-uptask-backend-ts/commit/a0bb296c4706f4a9218e507169b85fa00134cb72)
> > ### - Obtener una base de datos en MongoBD Atlas
> > - [Creacion/Cuenta-MongoDB](https://cloud.mongodb.com/)
> ```zsh
> -- Comand Instalacion Arch Linux
> -- Instalacion mongodb
> yay -S mongodb-bin
> 
> ```
>
> ```zsh
> -- activar servicio
> sudo systemctl start mongodb.service
> sudo systemctl enable mongodb.service
> 
> ```
>
> ```zsh
> -- instalacion servicio de conexion
> yay -S mongosh-bin
> 
> ```
>
> ```zsh
> -- Conectar mongodb desde la terminal
> mongosh "mongodb+srv://cluster0.xxxxx.mongodb.net/myFirstDatabase" --username tu_usuario
> 
> ```
>
> > ### - ¿Qué es Mongoose?
> > ```text
> > Mongoose es un ODM (Object Data Modeling) que agrega una capa 
> > de abstracción sobre MongoDB y es ideal cuando necesitas 
> > estructurar y gestionar datos con esquemas definidos.
> > En resumen es un intermediario para gestionar datos con
> > mongoDB.
> > ```
> > - [Cuando_Utilizar/Mongoose&&mongodb](https://chatgpt.com/share/67152984-239c-8002-a5bb-3ab77ec57241)
> > ### - Conectando nuestra app con MongoDB

