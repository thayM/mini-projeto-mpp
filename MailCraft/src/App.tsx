import { useState } from 'react'
import reactLogo from './assets/react.svg'
import logo from './assets/icons/Logo_MailCraft.svg'
import iconModal from './assets/icons/icon-configuracao.svg'
import styles from './App.module.css'
import iconImagem from './assets/icons/icon-imagem.svg'
import iconExportar from './assets/icons/icon-codigo.svg'
import iconSalvar from './assets/icons/icon-disquete.svg'

function App() {

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
            <button  className={styles.configuracao__btn}>
              <img className={styles.configuracao__icon} src={iconModal} alt="" />
            </button>
          </div>
        </div>
      </header>

      <div className={styles.container__conteudo}>
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
              <p>Corpo do E-mail:</p>
              <input type="text" />
            </div>

            <div className={styles.conteudo__botoes}>
              <div className={styles.btn__anexar_arquivo}>
                <div className={styles.anexar__arquivo_campo}>
                  <input className={styles.campo__input} type="file" name="" id="fileUpload" />
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
                <button>
                  <div className={styles.btn__conteudo}>
                    <img src={iconSalvar} alt=""/>
                    <p className={styles.btn__identificacao}>SALVAR TEMPLATE</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.container__conteudo_direito}></div>
      </div>
    </div>
    </>
  )
}

export default App
