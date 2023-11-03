const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000; // Puedes usar cualquier número de puerto que prefieras

app.use(cors());
const emailController = require('./emailController'); // Importa el controlador de envío de correos

app.use(express.json());

// Ruta para enviar un correo electrónico
app.post('/enviar-correo', async (req, res) => {
  const { destinatario, asunto, mensaje, nombreApellido, nombreEmpresa, cargo, fecha, hora } = req.body;
  const responseData = `
    <html>
      <body>
        <h1>Información recibida:</h1>
        <p>Destinatario: ${destinatario}</p>
        <p>Asunto: ${asunto}</p>
        <p>Mensaje: ${mensaje}</p>
        <p>Nombre y Apellido: ${nombreApellido}</p>
        <p>Nombre de la Empresa: ${nombreEmpresa}</p>
        <p>Cargo: ${cargo}</p>
        <p>Fecha: ${fecha}</p>
        <p>Hora: ${hora}</p>
      </body>
    </html>
  `;
  res.send(responseData); // Enviar la respuesta al navegador
  try {
    // Llama a la función enviarCorreo con los datos del formulario
    await emailController.enviarCorreo(
      destinatario,
      asunto,
      mensaje,
      nombreApellido,
      nombreEmpresa,
      cargo,
      fecha,
      hora
    );

    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ message: 'Error al enviar el correo electrónico' });
  }
});



app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
