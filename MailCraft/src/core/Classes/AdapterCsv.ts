import type { IImportContatos } from '../Interfaces';

export class AdapterCsv implements IImportContatos {
  async importar(csvContent: string | ArrayBuffer): Promise<{ nome: string; email: string }[]> {
    if (typeof csvContent !== 'string') {
      throw new Error('AdapterCsv espera um conteúdo de arquivo do tipo string.');
    }
    const linhas = csvContent.split('\n').filter(Boolean);
    return linhas.map(linha => {
      const [nome, email] = linha.split(',');
      return { nome: nome.trim(), email: email.trim() };
    });
  }
}