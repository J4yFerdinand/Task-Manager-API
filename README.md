
# **Task Manager API**

## Descripción

Task Manager API es un backend desarrollado con **Node.js**, **Express** y **MongoDB Atlas** que permite gestionar usuarios y sus tareas de manera eficiente. Implementa autenticación con **JWT** y proporciona un sistema de ID autoincrementables para facilitar la administración de datos.



## Características

- Autenticación de usuarios con JWT.

- **CRUD** de usuarios y tareas.

- **Hashing de contraseñas** con **bcryptjs**.

- **Middleware de autenticación**.

- **ID autoincrementables** para usuarios y tareas con **mongoose-sequence**.

- **Health Check** para verificar la conexión con la base de datos.

## Instalación y Configuración

1. ***Clona el repositorio***

```bash
git clone https://github.com/J4yFerdinand-api.git
cd task-manager-api
```

2. ***Instala las dependencias***

```bash
npm install
```


    
3. ***Configura varibles de entorno***

Es necesario crear las siguientes variables de entorno en la raíz del proyecto para que funcione. Para tal fin, crea un archivo `.env` y define:

`PORT`

`MONGO_URI`

`JWT_SECRET`




## Conexión a la base de datos

**1**. Inicia sesión en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

**2**. Crea un clúster o utilizar uno existente.

**3**. Genera una cadena de conexión según las instrucciones de MongoDB Atlas.

**4**. Configura la cadena de conexión en tu archivo `.env`.

**5**. Inicia el servidor con `npm start`.

El servidor correrá en http://localhost:5000

## ***Ejemplo de configuración***

La cadena de conexión de MongoDB Atlas tiene el siguiente formato:

```
mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/<nombre_db>?retyWrites=truew=majority
```
Reemplaza ***`<usuario>`***, ***`<contraseña>`*** y ***`<nombre_db>`*** por tus credenciales.


## Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución

- **Express.js** - Framework web

- **MongoDB Atlas** - Base de datos NoSQL

- **Mongoose** - ODM para MongoDB

- **JWT (jsonwebtoken)** - Autenticación

- **bcryptjs** - Hashing de contraseñas

- **dotenv** - Variables de entorno

- **mongoose-sequence** - IDs autoincrementales

- **cors** - Permitir peticiones entre dominios

- **morgan** - Logger de peticiones HTTP



# **Endpoints Disponibles**

##  ***Usuarios*** `/api/users`

|Método|Ruta       |Descripción         |Protección|
|:------:|:-----------:|:--------------------:|:----------:|
|POST  |`/register`|Registra un usuario |   NO     |
|POST  |`/login`   |Iniciar sesión y obtener JWT| NO|
|GET   |`/profile` |Obtener perfil de usuario| Sí|

##  ***Tareas*** `/api/tasks`

|Método|Ruta       |Descripción         |Protección|
|:------:|:-----------:|:--------------------:|:----------:|
|GET  |`/`|Listar todas las tareas de un usuario |   Sí     |
|POST  |`/`   |Crear una nueva tarea| Sí|
|GET  |`/:id`|Buscar una tarea especifica por ID |   Sí     |
|PUT  |`/:id` |Actualizar una tarea por ID| Sí|
|DELETE  |`/:id` |Eliminar una tarea por ID| Sí|

##  ***Health Check*** `/api/healt`
|Método|Ruta       |Descripción         |Protección|
|:------:|:-----------:|:--------------------:|:----------:|
|GET  |`/`|Listar todas las tareas de un usuario |   Sí     |

## Contribución

Si deseas mejorar este proyecto:

    1. Haz un fork del repositorio
    2. Crea una nueva rama (git checkout -b feature-nueva)
    3. Realiza tus cambios y haz commit
    4. Envía un Pull Request


## License

Este proyecto está bajo la Licencia [MIT](https://choosealicense.com/licenses/mit/).


