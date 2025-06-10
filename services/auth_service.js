require('dotenv').config();
const UsersService = require('./user_service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { config } = require('../config/config');

const service = new UsersService();

class AuthService{
    async getUser(email, password){
        const user = await service.findOneByEmail(email);
        if(!user){
            throw boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw boom.unauthorized();
        }
        delete user.dataValues.password;
        return user;
    }

    signToken(user){
        const payload = {
            sub: user.id,
            role: user.role
        }
        const token = jwt.sign(payload, config.jwtSecret); 
        return{
            user,
            token
        };
    }

    async sendMail(email){
        const user = await service.findOneByEmail(email);
        if(!user){
            throw boom.unauthorized();
        }

        const transporter = nodemailer.createTransport(
            {
            host: "smtp.gmail.com", // ✨ Cambiado a host de Gmail
            secure: true,           // ✨ true para puerto 465 (SSL/TLS)
            port: 465,              // ✨ Puerto 465 para SSL/TLS con Gmail
            auth: {
                user: process.env.EMAIL_TESTING, // Tu dirección de correo de Gmail
                pass: process.env.PASSWORD_APP  // ✨ Tu Contraseña de Aplicación de Gmail
            }
            }
        );

        await transporter.sendMail({
            from: process.env.EMAIL_TESTING,        // Remitente: Tu correo de Gmail
            to: `${user.email}`,  // Destinatario: El otro correo que tienes en .env
            subject: "Hola amiguito, no te asustes este es un correo de prueba ✔",
            text: "HOLAAAAAAAAAAAAAAAAAAAAAAAAAAA ✔",
            html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>¡Mensaje Épico desde el Cuartel General!</title>
            <style>
                /* Estilos básicos para asegurar que se vea bien en diferentes clientes de correo */
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #4CAF50; /* Un verde vibrante */
                    color: #ffffff;
                    padding: 30px 20px;
                    text-align: center;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                    line-height: 1.2;
                }
                .content {
                    padding: 30px 20px;
                    color: #333333;
                    line-height: 1.6;
                }
                .content p {
                    margin-bottom: 20px;
                    font-size: 16px;
                }
                .button-container {
                    text-align: center;
                    padding: 20px 20px 30px;
                }
                .button {
                    display: inline-block;
                    background-color: #007bff; /* Un azul potente */
                    color: #ffffff;
                    text-decoration: none;
                    padding: 15px 25px;
                    border-radius: 5px;
                    font-size: 18px;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }
                .button:hover {
                    background-color: #0056b3;
                }
                .footer {
                    background-color: #eeeeee;
                    color: #777777;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                }
                .footer p {
                    margin: 5px 0;
                }
                /* Para hacer el diseño responsivo en clientes de correo que lo soportan */
                @media only screen and (max-width: 600px) {
                    .container {
                        margin: 0;
                        border-radius: 0;
                    }
                    .header h1 {
                        font-size: 24px;
                    }
                    .content, .header, .button-container, .footer {
                        padding: 20px 15px;
                    }
                    .button {
                        padding: 12px 20px;
                        font-size: 16px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>¡Alerta de Prueba Épica!</h1>
                    <p>Un mensaje crucial desde el núcleo del sistema.</p>
                </div>
                <div class="content">
                    <p>Estimado Receptor Celestial,</p>
                    <p>Te enviamos este comunicado estelar para validar la integridad de nuestras transmisiones. Hemos alcanzado una nueva dimensión en la conectividad y este es un testamento de nuestro poder.</p>
                    <p>Considera este mensaje como un eco lejano de lo que está por venir. Nuestras pruebas son rigurosas, y cada byte enviado es un paso hacia la perfección.</p>
                    <p>Si recibes esto, la misión ha sido un éxito rotundo. ¡El universo digital está a salvo!</p>
                    <p>Con determinación ilimitada,</p>
                    <p>El Equipo de Ingenieros Visionarios</p>
                </div>
                <div class="button-container">
                    <a href="https://tu-sitio-web.com" class="button">Descubre Nuestro Poder</a>
                </div>
                <div class="footer">
                    <p>Este es un mensaje generado automáticamente. Por favor, no responder.</p>
                    <p>&copy; 2025 Tu Empresa Épica. Todos los derechos reservados.</p>
                </div>
            </div>
        </body>
        </html>
    `,
        });
        return { message: 'Mail SENT!' };
    }
}

module.exports = AuthService