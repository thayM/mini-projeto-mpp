import { Email } from './Email';
import type { IConteudoEmail } from '../Interfaces';
import { AddAnexosDecorator } from './AddAnexosDecorator';

export class EmailBuilder {
    private assunto = '';
    private html = '';
    private anexos: File[] = [];

    setAssunto(assunto: string) {
        this.assunto = assunto;
        return this;
    }

    setCorpoHtml(html: string) {
        this.html = html;
        return this;
    }

    setAnexos(anexos: File[]) {
        this.anexos = anexos;
        return this;
    }

    build(): IConteudoEmail {
        const baseEmail = new Email(this.assunto, this.html);
        if (this.anexos.length > 0) {
            return new AddAnexosDecorator(baseEmail, this.anexos);
        }
        return baseEmail;
    }
}