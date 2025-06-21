import { EmailDecorator } from './EmailDecorator';
import type { IConteudoEmail } from '../Interfaces';

export class AddAnexosDecorator extends EmailDecorator {
    private novosAnexos: File[];

    constructor(emailWrapped: IConteudoEmail, novosAnexos: File[]) {
        super(emailWrapped);
        this.novosAnexos = novosAnexos;
    }

    getAnexos(): File[] {
        return [...this.emailWrapped.getAnexos(), ...this.novosAnexos];
    }
}