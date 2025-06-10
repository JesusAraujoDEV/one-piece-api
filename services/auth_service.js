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

    async sendRecovery(email){
        const user = await service.findOneByEmail(email);
        if(!user){
            throw boom.unauthorized();
        }

        const payload = {
            sub: user.id
        };

        const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'}); 
        const link = `http://myfrontend.com/recovey?token=${token}`;

        await service.update(user.id, {recoveryToken: token})

        const mail = {
                from: process.env.EMAIL_TESTING,        // Remitente: Tu correo de Gmail
                to: `${user.email}`,  // Destinatario: El otro correo que tienes en .env
                subject: "Email para recuperar la contraseña ! ✔",
                html: `<b>Ingresa a este link... => ${link} jeje<b>`
        }

        const rta = await this.sendMail(mail);
        return rta;
    }

    async sendMail(infoMail){
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

        await transporter.sendMail(infoMail);
        return { message: 'Mail SENT!' };
    }
}

module.exports = AuthService