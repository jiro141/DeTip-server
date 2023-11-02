const nodemailer = require('nodemailer');
const fs = require('fs');
// Configura el transporte para enviar correos electrónicos
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Elige el servicio de correo que desees usar (por ejemplo, Gmail)
    auth: {
        user: 'detipventas@gmail.com', // Coloca tu dirección de correo electrónico
        pass: 'bdtf ahbz xyga hbgn', // Coloca tu contraseña
    },
});

// Función para enviar un correo electrónico
const enviarCorreo = async (destinatario, asunto, mensaje, nombreApellido, nombreEmpresa, cargo, fecha, hora) => {
    try {
        const path = require('path');
        const templateHtml = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf-8');
        const cuerpoCorreo = templateHtml
            .replace('{nombreApellido}', nombreApellido)
            .replace('{nombreEmpresa}', nombreEmpresa)
            .replace('{cargo}', cargo)
            .replace('{fecha}', fecha)
            .replace('{hora}', hora);
        // Configura los detalles del correo electrónico
        const mailOptionsUsuario = {
            from: 'detipventas@gmail.com', // Remitente
            to: destinatario, // Destinatario
            subject: '¡Gracias por comunicarte con nosotros!', // Asunto del correo
            text: mensaje, // Cuerpo del correo
            // Agrega los campos adicionales en el cuerpo del correo en formato HTML
            html: cuerpoCorreo,
        };
        // Envía el correo electrónico
        await transporter.sendMail(mailOptionsUsuario);
        const correo = fs.readFileSync('./mensaje.html', 'utf-8');
        const cuerpCorreo = correo
            .replace('{nombreApellido}', nombreApellido)
            .replace('{nombreEmpresa}', nombreEmpresa)
            .replace('{cargo}', cargo)
            .replace('{fecha}', fecha)
            .replace('{mensaje}', mensaje)
            .replace('{hora}', hora);
        const mailOptionsAdmin = {
            from: destinatario, // Remitente (tu correo)
            to: 'detipventas@gmail.com', // Tu propia dirección de correo
            subject: 'Nueva solicitud', // Asunto del correo
            text: 'Datos del usuario:', // Cuerpo del correo
            html: cuerpCorreo
        };

        // Envía el correo electrónico a ti mismo
        await transporter.sendMail(mailOptionsAdmin);

        console.log('Correo electrónico enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
};

module.exports = { enviarCorreo };
