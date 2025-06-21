import type { IImportContatos } from '../Interfaces';

export class AdapterCsv implements IImportContatos {
  async importar(file: File): Promise<{ nome: string; email: string }[]> {
    const text = await file.text();
    const linhas = text.split('\n').filter(Boolean);
    return linhas.map(linha => {
      const [nome, email] = linha.split(',');
      return { nome: nome.trim(), email: email.trim() };
    });
  }
}