import type { IImportContatos } from '../Interfaces';
import * as XLSX from 'xlsx';

export class AdapterXlsx implements IImportContatos {
    async importar(file: File): Promise<{ nome: string; email: string }[]> {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const primeiraAba = workbook.SheetNames[0];
        const planilha = workbook.Sheets[primeiraAba];
        const json = XLSX.utils.sheet_to_json<{ Nome: string; Email: string }>(planilha);
        return json.map((linha: { Nome: any; Email: any; }) => ({ nome: linha.Nome, email: linha.Email }));
    }
}
