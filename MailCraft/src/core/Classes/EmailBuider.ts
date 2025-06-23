import { Email } from './Email';
import type { IConteudoEmail, IHtmlElement } from '../Interfaces';
import { AddAnexosDecorator } from './AddAnexosDecorator';
import { BodyComponent } from './Elements';

export class EmailBuilder {
    private assunto = '';
    private html: IHtmlElement | null = null;
    private anexos: File[] = [];

    setAssunto(assunto: string) {
        this.assunto = assunto;
        return this;
    }

    setCorpoHtml(html: IHtmlElement) {
        this.html = html;
        return this;
    }

    setAnexos(anexos: File[]) {
        this.anexos = anexos;
        return this;
    }

    build(): IConteudoEmail {
        const corpoHtmlFinal = this.html || new BodyComponent(); 

        const baseEmail = new Email(this.assunto, corpoHtmlFinal); 

        if (this.anexos.length > 0) {
            return new AddAnexosDecorator(baseEmail, this.anexos);
        }
        return baseEmail;
    }
}