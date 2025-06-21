import type { IConteudoEmail } from '../Interfaces';

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
        try {
            const response = await fetch('http://localhost:3001/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    assunto: email.getAssunto(),
                    html: email.getHtml(),
                    destinatarios,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Erro desconhecido');
            }

            alert('E-mail enviado com sucesso!');
        } catch (err: any) {
            alert('Erro ao enviar e-mail: ' + err.message);
            console.error('Erro no envio do e-mail:', err);
        }
    }
}
