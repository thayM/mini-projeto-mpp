export interface IConteudoEmail {
    getAssunto(): string;
    getHtml(): string;
    getAnexos(): File[];
}

export interface IImportContatos {
    importar(file: File): Promise<{ nome: string; email: string }[]>;
}

export interface IHtmlElement {
    renderizar(): string;
}