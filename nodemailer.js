require('dotenv').config();
const nodemailer = require("nodemailer");

async function sendMail() {
  // Asegúrate de que las variables de entorno para Gmail estén configuradas correctamente
  // en tu archivo .env:
  // EMAIL_TESTING='tu_correo@gmail.com'
  // PASSWORD_APP='tu_contraseña_de_aplicacion_de_gmail'

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // ✨ Cambiado a host de Gmail
    secure: true,           // ✨ true para puerto 465 (SSL/TLS)
    port: 465,              // ✨ Puerto 465 para SSL/TLS con Gmail

    // Si tuvieras que usar el puerto 587 (STARTTLS), la configuración sería:
    // port: 587,
    // secure: false, // false para STARTTLS
    // tls: {
    //   rejectUnauthorized: false // Solo si es estrictamente necesario y entiendes el riesgo
    // }

    auth: {
      user: process.env.EMAIL_TESTING, // Tu dirección de correo de Gmail
      pass: process.env.PASSWORD_APP  // ✨ Tu Contraseña de Aplicación de Gmail
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.EMAIL_TESTING,        // Remitente: Tu correo de Gmail
    to: process.env.ANOTHER_EMAIl_TESTING,  // Destinatario: El otro correo que tienes en .env
    subject: "Hola amiguito, no te asustes este es un correo de prueba ✔",
    text: "HOLAAAAAAAAAAAAAAAAAAAAAAAAAAA ✔",
    html: "<b>Hola amiguito</b>",
  });

  console.log("Message sent: %s", info.messageId);
  // Con Gmail no obtendrás un "Preview URL" de Ethereal
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// Llama a la función y maneja posibles errores
sendMail().catch(console.error);