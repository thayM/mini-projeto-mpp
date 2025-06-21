import type { IConteudoEmail } from '../Interfaces';

export class Email implements IConteudoEmail {
    private assunto: string;
    private html: string;
    private anexos: File[];

    constructor(assunto: string, html: string, anexos: File[] = []) {
        this.assunto = assunto;
        this.html = html;
        this.anexos = anexos;
    }

    getAssunto(): string {
        return this.assunto;
    }

    getHtml(): string {
        return this.html;
    }

    getAnexos(): File[] {
        return this.anexos;
    }

    clone(): Email {
        return new Email(this.assunto, this.html, [...this.anexos]);
    }

    toString(): string {
        return `Assunto: ${this.assunto}\nHTML: ${this.html}`;
    }
}
