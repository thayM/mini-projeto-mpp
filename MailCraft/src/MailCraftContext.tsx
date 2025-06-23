import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import type { IConteudoEmail, IHtmlElement, IImportContatos } from "./core/Interfaces";
import { BodyComponent } from "./core/Classes/Elements";
import { EmailBuilder } from "./core/Classes/EmailBuider";
import { EmailSender } from "./core/Classes/EmailSender";
import { AdapterCsv } from "./core/Classes/AdapterCsv";
import { AdapterXlsx } from "./core/Classes/AdapterXlsx";

interface Contact {
  nome: string;
  email: string;
}

interface MailCraftContextType {
  assunto: string;
  setAssunto: (assunto: string) => void;
  corpoHtmlString: string;
  setCorpoHtmlString: (html: string) => void;
  anexosSelecionados: File[];
  addAnexo: (file: File) => void;
  clearAnexos: () => void;
  destinatarios: Contact[];
  setDestinatarios: (contacts: Contact[]) => void;
  importarContatos: (file: File) => Promise<void>;
  handleSalvarTemplate: (templateName: string) => void;
  handleCarregarTemplate: (template: {
    name: string;
    assunto: string;
    corpoHtml: string;
    anexos: any[];
  }) => void; 
  handleEnviarEmail: () => Promise<void>;
  htmlTree: IHtmlElement;
  setHtmlTree: (tree: IHtmlElement) => void;
  addHtmlElementToBody: (element: IHtmlElement) => void;
  emailPrevia: string;
}

const MailCraftContext = createContext<MailCraftContextType | undefined>(
  undefined
);

export const MailCraftProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [assunto, setAssunto] = useState<string>("");
  const [corpoHtmlString, setCorpoHtmlString] = useState<string>("");
  const [anexosSelecionados, setAnexosSelecionados] = useState<File[]>([]);
  const [destinatarios, setDestinatarios] = useState<Contact[]>([]);
  const [templatesSalvos, setTemplatesSalvos] = useState<
    Array<{ name: string; assunto: string; corpoHtml: string; anexos: any[] }>
  >([]);

  const [htmlTree, setHtmlTree] = useState<IHtmlElement>(
    () => new BodyComponent()
  );

  React.useEffect(() => {
    const renderedHtml = htmlTree.renderizar();
    if (renderedHtml !== corpoHtmlString) {
      setCorpoHtmlString(renderedHtml);
    }
  }, [htmlTree]);

  const emailBuilder = useMemo(() => new EmailBuilder(), []);
  const emailSender = useMemo(() => EmailSender.getInstance(), []);

  const addAnexo = useCallback((file: File) => {
    setAnexosSelecionados((prev) => [...prev, file]);
  }, []);

  const clearAnexos = useCallback(() => {
    setAnexosSelecionados([]);
  }, []);

  const importarContatos = useCallback(async (file: File) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    let importer: IImportContatos | null = null;

    if (fileExtension === "csv") {
      importer = new AdapterCsv();
    } else if (fileExtension === "xlsx") {
      importer = new AdapterXlsx();
    } else {
      alert("Formato de arquivo não suportado. Use .csv ou .xlsx.");
      return;
    }

    if (!importer) return;

    try {
      const fileContent = await new Promise<string | ArrayBuffer>(
        (resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result || "");
          reader.onerror = (e) => reject(e);
          if (fileExtension === "csv") {
            reader.readAsText(file);
          } else if (fileExtension === "xlsx") {
            reader.readAsArrayBuffer(file);
          }
        }
      );

      const imported = await importer.importar(fileContent);
      setDestinatarios(imported);
      alert(`Foram importados ${imported.length} contatos.`);
    } catch (error) {
      console.error("Erro ao importar contatos:", error);
      alert(
        "Erro ao importar contatos. Verifique o formato do arquivo e se as colunas estão corretas (Nome, Email)."
      );
    }
  }, []);

  const addHtmlElementToBody = useCallback(
    (element: IHtmlElement) => {
      const newHtmlTree = new BodyComponent();
      if (htmlTree instanceof BodyComponent) {
        htmlTree.getChildren().forEach((child) => newHtmlTree.add(child));
      }

      newHtmlTree.add(element);
      setHtmlTree(newHtmlTree);
    },
    [htmlTree]
  );

  const handleSalvarTemplate = useCallback(
    (templateName: string) => {
      emailBuilder.setAssunto(assunto);
      emailBuilder.setCorpoHtml(htmlTree);
      const currentEmail: IConteudoEmail = emailBuilder.build();

      const serializedBodyHtml = currentEmail.getHtml();

      const template = {
        name: templateName,
        assunto: currentEmail.getAssunto(),
        corpoHtml: serializedBodyHtml,
        anexos: currentEmail.getAnexos().map((file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
        })),
      };

      const updatedTemplates = [...templatesSalvos, template];
      localStorage.setItem(
        "mailcraft_templates",
        JSON.stringify(updatedTemplates)
      );
      setTemplatesSalvos(updatedTemplates);
      alert(`Template "${templateName}" salvo com sucesso!`);
    },
    [assunto, htmlTree, anexosSelecionados, templatesSalvos, emailBuilder]
  );

  const handleCarregarTemplate = useCallback(
    (template: {
      name: string;
      assunto: string;
      corpoHtml: string;
      anexos: any[];
    }) => {
      setAssunto(template.assunto);
      setCorpoHtmlString(template.corpoHtml);

      setAnexosSelecionados([]);
      if (template.anexos && template.anexos.length > 0) {
        // Se você salvou o File completo, pode tentar recriá-lo (mas não é ideal no localStorage)
        // setAnexosSelecionados(template.anexos.map(a => new File([], a.name, { type: a.type })));
      }

      alert(`Template "${template.name}" carregado!`);
    },
    []
  );

  const handleEnviarEmail = useCallback(async () => {
    if (!assunto || !corpoHtmlString || destinatarios.length === 0) {
      alert(
        "Preencha assunto, corpo do e-mail e adicione destinatários antes de enviar."
      );
      return;
    }

    try {
      emailBuilder.setAssunto(assunto);
      emailBuilder.setCorpoHtml(htmlTree);
      emailBuilder.setAnexos(anexosSelecionados);

      const emailFinal: IConteudoEmail = emailBuilder.build();
      const destinatariosEmails = destinatarios.map((c) => c.email);
      await emailSender.send(emailFinal, destinatariosEmails);

      setAssunto("");
      setCorpoHtmlString("");
      setHtmlTree(new BodyComponent());
      setAnexosSelecionados([]);
    } catch (error) {
      console.error("Falha ao enviar e-mail:", error);
    }
  }, [
    assunto,
    destinatarios,
    anexosSelecionados,
    htmlTree,
    emailBuilder,
    emailSender,
  ]);

  const contextValue = useMemo(
    () => ({
      assunto, setAssunto,
      corpoHtmlString, setCorpoHtmlString,
      anexosSelecionados, addAnexo, clearAnexos,
      destinatarios, setDestinatarios,
      importarContatos,
      handleSalvarTemplate,
      handleCarregarTemplate,
      handleEnviarEmail,
      htmlTree, setHtmlTree,
      addHtmlElementToBody,
      emailPrevia: corpoHtmlString,
    }),
    [
      assunto, setAssunto,
      corpoHtmlString, setCorpoHtmlString,
      anexosSelecionados, addAnexo, clearAnexos,
      destinatarios, setDestinatarios,
      importarContatos,
      handleSalvarTemplate,
      handleCarregarTemplate,
      handleEnviarEmail,
      htmlTree, setHtmlTree,
      addHtmlElementToBody,
    ]
  );

  return (
    <MailCraftContext.Provider value={contextValue}>
      {children}
    </MailCraftContext.Provider>
  );
};

export const useMailCraft = () => {
  const context = useContext(MailCraftContext);
  if (context === undefined) {
    throw new Error("useMailCraft must be used within a MailCraftProvider");
  }
  return context;
};
