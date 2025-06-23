import type { IImportContatos } from '../Interfaces';
import * as XLSX from 'xlsx';

export class AdapterXlsx implements IImportContatos {
    async importar(xlsxFileBuffer: string | ArrayBuffer): Promise<{ nome: string; email: string }[]> {
        if (!(xlsxFileBuffer instanceof ArrayBuffer)) {
            throw new Error('AdapterXlsx espera um conteúdo de arquivo do tipo ArrayBuffer.');
        }
        const workbook = XLSX.read(xlsxFileBuffer);
        const primeiraAba = workbook.SheetNames[0];
        const planilha = workbook.Sheets[primeiraAba];
        const json = XLSX.utils.sheet_to_json<{ Nome: string; Email: string }>(planilha);
        return json.map((linha) => ({ nome: linha.Nome, email: linha.Email }));
    }
}