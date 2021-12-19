# Warriors_MinTic_Ciclo4
Repositorio para proyecto MinTic. Desarrollo Web


## Instalación de paquetes
1. `npm init`
2. `npm install express --save`
3. `npm i mongoose --save`
4. `npm install -g nodemon`
5. `npm install body-parser`
6. `npm install dotenv`
7. `npm i crypto-js`
8. `npm i password-generator`
9. `npm install --save cross-fetch` (npm i node-fetch)

## Loopback
1. `npm i -g @loopback/cli`
2. `lb4 app`
3. Ejecutar comando cuando presente error desde el shell: `Set-ExecutionPolicy RemoteSigned`

## Creación de API en Loopback
### Datasource
1. `lb4 datasource`
2. Nombre del datasource
3. Seleccionar la base de datos
4. Ingresar cadena de conexion = URL
5. Seleccionar Si soporta versiones superiores 

### Model
1. `lb4 Model`
2. Nombre de la entidad
3. Seleccionar Entity (guardar en BD)
4. No permitir propiedades adicionales
5. Ingresar nombre de propiedad
6. Ingresar tipo de datos
7. Validar si es propiedad identificadora
8. Validar si se genera automaticamente
9. Repetir los Pasos y validar si es requerido

### Respositorio
1. `lb4 respository`
2. Seleccionar datasource
3. Seleccionar los modeles.. espacio para seleccionar
5. Seleccionar predeterminado

### Relaciones
1. `lb4 relation`
2.  belongsTo (Muchos a Uno. Foreign key)
    hasMany (Uno a Muchos)
    hasManyThrough (Muchos a Muchos)
    hasOne (Uno a Uno)
3. seleccionar tabla origen
4. seleccionar tabla description
5. validar, cambiar y/o confirmar nombre del la llave foranea
6. nombre de la relacion
7. Permitir incluir datos de las instancias
8. Crear la relacion en otro sentido (iniciar paso 1)

### Servicios
1. `lb4 service`
2. Seleccionar tipo de servicio (Clase de servicio local)
3. Nombre del servicio (Para el ejercicio incluir Authenticacion y Notificacion)

### Controladores
1. `lb4 controller`
2. Nombre del controlador (Realizarlo por cada modelo)
3. Seleccionar Tipo de Controlador
4. Seleccionar entidad
5. Seleccionar repositorio de la entidad
6. Ingresar el campo del atributo id
7. Ingresar el tipo de datos del atributo id
8. Seleccionar si se omite la Id al crear nueva instancia (automatico)
9. Nombre de acceso a traves de la URL


## Instalacion Angular
1. Instalar nueva = `ng new`
2. Ingresar nombre de carpeta
3. Seleccionar incluir Routing
4. Seleccionar tipo de hoja de estilos

## Crear Cuenta Twilio y SendGrid
### Twilio
1. Ingresar www.twilio.com
2. Registrar y crear cuenta gratis
3. Confirmar cuenta
4. Adicionar numero de telefono
5. Ingresar codigo sms enviado
6. Seleccionar
	SMS como producto
	Plan Alerts & Notifications
	Construir con Code
	Lenguaje Python
	No guardar codigo
7. Crear numero telefonico de prueba
8. Seleccionar numero sugerido

### SendGrid
1. www.sendGrid.com
2. Registrar
3. Diligenciar formulario
	Company Universidad de caldas
	WebSite. https://ucaldas.edu.co/
    Developer
    0 to 100.000
    1 - 500
4. Configurar correo: Create a Single Sender
5. Diligenciar Formulario
6. From Name: Corresponde a lo que visualizará el destinatario
7. Ingresar al correo y confirmar creacion de cuenta
8. Ingresar al correo y confirmar origen 
9. Recomendado: Ingresar a Settings para generar doble autenticacion..
9. Seleccionar API Keys
10. Create API Keys
11. Nombre de la API
12. Full Access
13. Create and Visualice
14. Email API
15. Web API
16. Seleccionar Python

## Instalar Anaconda
Se debe instalar anaconda para utilizar Sypder
### Instalacion de paquetes
1. Instalar Twilio = `conda install -c conda-forge twilio`
2. Instalar SendGrid = `conda install -c conda-forge sendgrig`
3. Instalar Cors = `conda install -c conda-forge flask-cors`
4. Instalar dotenv = `conda install -c conda-forge python-dotenv`


## Abrir Spyder
### Crear variables de entorno
        import os 

        os.environ ["TWILIO_ACCOUNT_SID"] = "SID Copiado desde Twilio"
        os.environ ["TWILIO_AUTH_TOKEN"] = "AUTH TOKEN Copiado desde Twilio"
        os.environ ["PHONE_NUMBER"] = "Numero de envío de Twilio"
        os.environ ["SENDGRID_API_KEY"] = "Copiar valor de API Key en SendGrid"
        os.environ ["MAIL_SENDER"] = "Correo configurado en SendGrid"

### Crear microservicios
        from flask import Flask
        import os
        from twilio.rest import Client
        from flask import request
        from sendgrid import SendGridAPIClient
        from sendgrid.helpers.mail import Mail

        app = Flask(__name__)

        @app.route("/")
        def prueba():
            return 'Prueba Servicios de Mensajería y Alerta'

        @app.route("/sms")
        def sms():
            try:
                account_sid = os.environ.get('TWILIO_ACCOUNT_SID'),
                auth_token = os.environ.get('TWILIO_AUTH_TOKEN'),
                client = Client(account_sid,auth_token),
                mensajeSMS = request.args.get("mensaje"),
                telDestino = request.args.get("telefono"),
                message = client.messages \
                    .create(
                        body = mensajeSMS,
                        from_ = os.environ.get('PHONE_NUMBER'),
                        to = '+57' + telDestino
                        )

                return 'Mensaje enviado correctamente :)'
            except Exception as e:
                print(e.message),
                return 'Error enviando el mensaje :('

        @app.route("/envio-correo")
        def email():
            message = Mail(
                from_email=os.environ.get('MAIL_SENDER'),
                to_emails=request.args.get("correo_destino"),
                subject=request.args.get("asunto"),
                html_content=request.args.get("mensaje"))
            try:
                sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
                response = sg.send(message)
                print(response.status_code)
                print(response.body)
                print(response.headers)
                return	"Correo electrónico enviado"
            except Exception as e:
                print(e.message)
                return "Error enviando mensaje"
            
        if __name__ == '__main__':
            app.run()

# Angular
1. Ejecutar  `ng s o`
2. Compilar `ng s`
## Instalación de angular
1. Instalación globla `npm install -g @angular/cli`

## Creación de aplicacion
1. Ejecutar el comando `ng new`
2. Ingresar el nombre del Proyecto
3. Seleccionar la opción de incluir routing

## Creación de modulos
1. Ingresar a la carpeta de la aplicación creada
2. Crear modulos `ng g m ruta+nombreModulo --routing`
3. Crear modulos de Seguridad, Administracion (en carpeta modulos)

## Creación de componentes Comunes
1. Crear una carpeta en App
2. Generar componentes `ng g c ruta+nombreComponente` Encabezado, Contenido, Pie pagina, Error
## Creación de componentes
1. Crear componentes `ng g c ruta+nombreComponente`
2. Crear componentes de identificacion, cambioClave, recuperarClave (en carpeta modulos/seguridad)
3. Crear componentes de CRUD (Para nuestro caso User (crear, editar, eliminar y buscar)) (en carpeta modulos(administracion))

## Creación de servicios
1. Crear servicios `ng g s ruta+nombreServicio`
2. Crear servicios de seguridad