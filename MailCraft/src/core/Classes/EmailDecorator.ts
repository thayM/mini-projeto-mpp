import type { IConteudoEmail } from '../Interfaces';

export abstract class EmailDecorator implements IConteudoEmail {
    protected emailWrapped: IConteudoEmail;

    constructor(emailWrapped: IConteudoEmail) {
        this.emailWrapped = emailWrapped;
    }

    getAssunto() {
        return this.emailWrapped.getAssunto();
    }

    getHtml() {
        return this.emailWrapped.getHtml();
    }

    getAnexos(): File[] {
        return this.emailWrapped.getAnexos();
    }
}
