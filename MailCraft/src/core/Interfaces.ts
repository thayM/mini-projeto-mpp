export interface IConteudoEmail {
    getAssunto(): string;
    getHtml(): string;
    getAnexos(): File[];
}

export interface IImportContatos {
    importar(fileContent: string | ArrayBuffer): Promise<{ nome: string; email: string }[]>;
}

export interface IHtmlElement {
    renderizar(): string;
}