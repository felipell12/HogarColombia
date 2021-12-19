"""
@author: Warriors Squad
Run Anaconda/Spyder
"""

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