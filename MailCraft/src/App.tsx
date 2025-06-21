import { useState } from 'react'
import logo from './assets/icons/Logo_MailCraft.svg'
import iconModal from './assets/icons/icon-configuracao.svg'
import styles from './App.module.css'
import iconImagem from './assets/icons/icon-imagem.svg'
import iconExportar from './assets/icons/icon-codigo.svg'
import iconSalvar from './assets/icons/icon-disquete.svg'
import ModalSalvarTemplate from './components/SalvarTemplate'
import ModalConfiguracao from './components/Configuracoes'

function App() {
  const [nomeArquivo, setNomeArquivo] = useState('Nenhum arquivo encontrado...');
  const [isOpenSalvar, setIsOpenSalvar] = useState(false);
  const [isOpenConfiguracao, setIsConfiguracao] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setNomeArquivo(event.target.files[0].name);
    }
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
            <button className={styles.configuracao__btn} onClick={() => setIsConfiguracao(true)}>
              <img className={styles.configuracao__icon} src={iconModal} alt="" />
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
              <input type="text" />
            </div>

            <div className={styles.conteudo__campo_corpo}>
              <p>Corpo do E-mail em HTML:</p>
              <textarea />
            </div>

            <div className={styles.conteudo__botoes}>
              <div className={styles.btn__anexar_arquivo}>
                <div className={styles.anexar__arquivo_campo}>
                  <input className={styles.campo__input} type="file" name="" id="fileUpload" style={{ display: 'none' }} onChange={handleFileChange}/>
                  <label className={styles.anexar__arquivo_label} htmlFor="fileUpload">Anexar Arquivo</label>
                  <span className={styles.anexar__arquivo_nome}>{nomeArquivo}</span>
                </div>
                <div className={styles.anexar__arquivo_aviso}>
                  <p className={styles.aviso__texto}>Adicione arquivos aqui para aparecer na seção de anexos do e-mail </p>
                </div>
              </div>

              <div className={styles.btn__inserir_imagem}>
                <button>
                  <div className={styles.btn__conteudo}>
                    <img src={iconImagem}  alt=""/>
                    <p className={styles.btn__identificacao}>INSERIR IMAGEM</p>
                  </div>
                </button>
              </div>

              <div className={styles.btn__exportar_html}>
                <button>
                  <div className={styles.btn__conteudo}>
                    <img src={iconExportar}  alt=""/>
                    <p className={styles.btn__identificacao}>EXPORTAR HTML</p>
                  </div>
                </button>
              </div>

              <div className={styles.btn__salvar_template}>
                <button onClick={() => setIsOpenSalvar(true)}>
                  <div className={styles.btn__conteudo}>
                    <img src={iconSalvar} alt=""/>
                    <p className={styles.btn__identificacao}>SALVAR TEMPLATE</p>
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

            <div className={styles.pre__visualizacao_preview}></div>
          </div>
        </div>
    </div>
    </>
  )
}

export default App
