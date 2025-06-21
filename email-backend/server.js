const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true se porta 465
    auth: {
        user: 'nonnadella230@gmail.com',
        pass: '12345!!d',
    },
});

app.post('/send-email', async (req, res) => {
    const { assunto, html, destinatarios } = req.body;

    try {
        await transporter.sendMail({
            from: '"MailCraft" <nonnadella230@gmail.com>',
            to: destinatarios.join(','),
            subject: assunto,
            html,
        });

        res.status(200).json({ message: 'Email enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).json({ message: 'Erro ao enviar email', error });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
