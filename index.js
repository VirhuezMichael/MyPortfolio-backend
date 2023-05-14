const express = require ('express')
const cors = require ('cors')
const bodyParser = require ('body-parser')
const nodemailer = require ('nodemailer')

const app = express()

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'https://virhuezmichael.netlify.app',
    optionsSuccessStatus: 200
  };

app.use(cors(corsOptions))

// Configura el middleware para procesar datos JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8080

const about = require ('./JSON/about.json')
const portfolio = require ('./JSON/portfolio.json')

app.get('/about', (req, res) => {
    res.json(about)
})

app.get('/portfolio', (req, res) => {
    res.json(portfolio)
})

app.post('/enviar-correo', (req, res) => {
    const { nombre, email, mensaje } = req.body;

 // Configura el transporte de correo electrónico
 const transporter = nodemailer.createTransport({
    // Configura la información de tu proveedor de correo electrónico
    // Por ejemplo, para usar el servicio de correo electrónico de Gmail:
    service: 'gmail',
    auth: {
      user: 'michvirh@gmail.com',
      // user: 'securesally@gmail.com',
      pass: 'grasmrzpnapdbmii',
    },
  });

  // Configura el contenido del correo electrónico
  const mailOptions = {
    from: 'virhuezmichael@gmail.com',
    to: 'michvirh@gmail.com',
    subject: 'Formulario de contacto',
    html: `
      <h1>Formulario de contacto</h1>
      <p>Nombre: ${nombre}</p>
      <p>Email: ${email}</p>
      <p>Mensaje: ${mensaje}</p>
    `,
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al enviar el correo electrónico');
    } else {
      console.log(`Correo electrónico enviado: ${info.response}`);
      res.status(200).send('Correo electrónico enviado exitosamente');
    }
  });
});

app.get('/', (req, res) => {
    res.send('The server is running')
    res.send('The routes for tha API are: /about & /portfolio')
})

app.listen(port, () => {
    console.log (`server running on port: ${port}`)
})