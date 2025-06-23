import React, { useState, useRef } from "react";
import styles from "./App.module.css";
import logo from "./assets/icons/Logo_MailCraft.svg";
import iconModal from "./assets/icons/icon-configuracao.svg";
import iconImagem from "./assets/icons/icon-imagem.svg";
import iconExportar from "./assets/icons/icon-codigo.svg";
import iconSalvar from "./assets/icons/icon-disquete.svg";
import ModalSalvarTemplate from "./components/SalvarTemplate";
import ModalConfiguracao from "./components/Configuracoes";
import { MailCraftProvider, useMailCraft } from "./MailCraftContext";
import { ImageElement } from "./core/Classes/Elements"; 
import './assets/globalVar.css';

const AppContent: React.FC = () => {
  const {
    assunto,
    setAssunto,
    corpoHtmlString,
    setCorpoHtmlString,
    anexosSelecionados,
    addAnexo, 
    emailPrevia,
  } = useMailCraft();

  const [isOpenSalvar, setIsOpenSalvar] = useState(false);
  const [isOpenConfiguracao, setIsConfiguracao] = useState(false);

  const [nomeArquivoExibido, setNomeArquivoExibido] = useState(
    "Nenhum arquivo encontrado..."
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      addAnexo(file); 
      setNomeArquivoExibido(file.name); 
    } else {
      setNomeArquivoExibido("Nenhum arquivo encontrado...");
    }
  };

  const handleInserirImagem = () => {
    const imageUrl = prompt("Insira a URL da imagem:");
    if (imageUrl) {
      const newImageElement = new ImageElement(imageUrl);
      const imageHtml = newImageElement.renderizar();
      setCorpoHtmlString(corpoHtmlString + "\n" + imageHtml);
    }
  };

  const handleExportarHtml = () => {
    const htmlContent = `<!DOCTYPE html>\n<html>\n<head>\n<title>${
      assunto || "Email"
    }</title>\n</head>\n<body>\n${corpoHtmlString}\n</body>\n</html>`;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email_template.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCorpoHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCorpoHtmlString(e.target.value);
  };

  return (
    <>
      <div className={styles.container__home}>
        <header className={styles.header}>
          <div className={styles.header__container}>
            <div className={styles.header__logo}>
              <img src={logo} alt="" />
              <p className={styles.nome__projeto}>Mail Craft</p>
            </div>

            <div className={styles.header__configuracoes}>
              <button
                className={styles.configuracao__btn}
                onClick={() => setIsConfiguracao(true)}
              >
                <img
                  className={styles.configuracao__icon}
                  src={iconModal}
                  alt=""
                />
              </button>
            </div>
          </div>
        </header>

        <div className={styles.container}>
          {isOpenSalvar && (
            <ModalSalvarTemplate onClose={() => setIsOpenSalvar(false)} />
          )}

          {isOpenConfiguracao && (
            <ModalConfiguracao onClose={() => setIsConfiguracao(false)} />
          )}

          <div className={styles.container__novo_email}>
            <div className={styles.novo__email_cabecalho}>
              <p className={styles.cabecalho__titulo}>NOVO E-MAIL</p>
            </div>
            <div className={styles.novo__email_conteudo}>
              <div className={styles.conteudo__campo_assunto}>
                <p>Assunto:</p>
                <input
                  type="text"
                  value={assunto} 
                  onChange={(e) => setAssunto(e.target.value)} 
                />
              </div>

              <div className={styles.conteudo__campo_corpo}>
                <p>Corpo do E-mail em HTML:</p>
                <textarea
                  ref={textareaRef} 
                  value={corpoHtmlString} 
                  onChange={handleCorpoHtmlChange} 
                />
              </div>

              <div className={styles.conteudo__botoes}>
                <div className={styles.btn__anexar_arquivo}>
                  <div className={styles.anexar__arquivo_campo}>
                    <input
                      className={styles.campo__input}
                      type="file"
                      name="fileUploadMain"
                      id="fileUploadMain" 
                      style={{ display: "none" }}
                      onChange={handleFileChange} 
                      multiple
                    />
                    <label
                      className={styles.anexar__arquivo_label}
                      htmlFor="fileUploadMain"
                    >
                      Anexar Arquivo
                    </label>
                    <span className={styles.anexar__arquivo_nome}>
                      {anexosSelecionados.length > 0
                        ? anexosSelecionados.map((a) => a.name).join(", ")
                        : nomeArquivoExibido}
                    </span>
                  </div>
                  <div className={styles.anexar__arquivo_aviso}>
                    <p className={styles.aviso__texto}>
                      Adicione arquivos aqui para aparecer na seção de anexos do
                      e-mail{" "}
                    </p>
                  </div>
                </div>

                <div className={styles.btn__inserir_imagem}>
                  <button onClick={handleInserirImagem}>
                    {" "}
                    <div className={styles.btn__conteudo}>
                      <img src={iconImagem} alt="" />
                      <p className={styles.btn__identificacao}>
                        INSERIR IMAGEM
                      </p>
                    </div>
                  </button>
                </div>

                <div className={styles.btn__exportar_html}>
                  <button onClick={handleExportarHtml}>
                    {" "}
                    <div className={styles.btn__conteudo}>
                      <img src={iconExportar} alt="" />
                      <p className={styles.btn__identificacao}>EXPORTAR HTML</p>
                    </div>
                  </button>
                </div>

                <div className={styles.btn__salvar_template}>
                  <button onClick={() => setIsOpenSalvar(true)}>
                    <div className={styles.btn__conteudo}>
                      <img src={iconSalvar} alt="" />
                      <p className={styles.btn__identificacao}>
                        SALVAR TEMPLATE
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.container__pre_visualizacao}>
            <div className={styles.pre__visualizacao_cabecalho}>
              <p className={styles.cabecalho_titulo}>PRÉ-VISUALIZAÇÃO</p>
            </div>
            <div
              className={styles.pre__visualizacao_preview}
              dangerouslySetInnerHTML={{ __html: emailPrevia }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <MailCraftProvider>
      <AppContent />
    </MailCraftProvider>
  );
}

export default App;
