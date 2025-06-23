import type { IConteudoEmail } from '../Interfaces';
import emailjs from 'emailjs-com';

export class EmailSender {
    private static instance: EmailSender;

    private constructor() { }

    public static getInstance(): EmailSender {
        if (!EmailSender.instance) {
            EmailSender.instance = new EmailSender();
        }
        return EmailSender.instance;
    }


    async send(email: IConteudoEmail, destinatarios: string[]): Promise<void> {
        const serviceID = 'service_p3ku0a2';
        const templateID = 'template_flz931d';
        const userID = 'E90HnCKoX7G_SMUfb';

        try {
            for (const to_email of destinatarios) {
                await emailjs.send(
                    serviceID,
                    templateID,
                    {
                        to_email,
                        subject: email.getAssunto(),
                        message: email.getHtml(),
                    },
                    userID
                );
                console.log(`E-mail enviado para: ${to_email}`);
            }

            alert('E-mails enviados com sucesso!');
        } catch (err: any) {
            alert('Erro ao enviar e-mails: ' + err.message);
            console.error('Erro no envio:', err);
        }
    }
}
