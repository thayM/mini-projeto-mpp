import type { IConteudoEmail, IHtmlElement } from '../Interfaces';

export class Email implements IConteudoEmail {
    private assunto: string;
    private html: IHtmlElement; 
    private anexos: File[];

    constructor(assunto: string, html: IHtmlElement, anexos: File[] = []) {
        this.assunto = assunto;
        this.html = html;
        this.anexos = anexos;
    }

    getAssunto(): string {
        return this.assunto;
    }

    getHtml(): string {
        return this.html.renderizar();
    }

    getAnexos(): File[] {
        return this.anexos;
    }

    clone(): Email {
        return new Email(this.assunto, this.html, [...this.anexos]);
    }

    toString(): string {
        return `Assunto: ${this.assunto}\nHTML:\n${this.getHtml()}`;
    }
}