import { useState } from 'react'
import styles from './Configuracoes.module.css'
import iconClose from '../../assets/icons/icon-close.svg'
import iconImport from '../../assets/icons/icon-import.svg'
import iconArrow from '../../assets/icons/icon-arrow-right.svg'
import iconExport from '../../assets/icons/icon-export.svg'
import iconTrash from '../../assets/icons/icon-trash.svg'

interface ModalProps {
  onClose: () => void;
}

const ModalConfiguracao: React.FC<ModalProps> = ({ onClose }) => {
  const [nomeArquivo, setNomeArquivo] = useState('Nenhum arquivo encontrado...');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setNomeArquivo(event.target.files[0].name);
    }
  };

  return (
    <div className={styles.modal__configuracao}>
      <div className={styles.container__configuracao}>
        <div className={styles.modal__fechar}>
            <button>
            <img src={iconClose} alt="" onClick={() => {onClose(); }}/>
            </button>
        </div>

        <div className={styles.configuracoes__contato}>
            <div className={styles.contato__import}>
                <p>Anexe os e-mails de destino no formato <span>.xlsx</span> ou <span>.csv</span></p>

                <div className={styles.import__campo}>
                    <input className={styles.campo__input} type="file" name="" id="fileUpload" style={{ display: 'none' }} onChange={handleFileChange}/>
                    <label className={styles.import__campo_label} htmlFor="fileUpload">
                        <div className={styles.import__conteudo}>
                            <img src={iconImport} alt="" />
                            <p>Importar Contatos</p>
                        </div>
                    </label>
                    <span className={styles.nome__projeto}>{nomeArquivo}</span>
                </div>
            </div>

            <div className={styles.contatos__listagem}>
                {/* adicione a lógica da listagem de contatos */}
                <div className={styles.contato}>
                    <p>email1@gmail.com</p>
                </div>
                <div className={styles.contato}>
                    <p>email2@gmail.com</p>
                </div>
            </div>

            <div className={styles.contatos__enviar}>
                <button>
                    <p>Enviar E-mails</p>
                    <img src={iconArrow} alt="" />
                </button>
            </div>
        </div>

        <div className={styles.configuracoes__historico}>
            <div className={styles.historico__cabecalho}>
                <h2>HISTÓRICO DE TEMPLATES</h2>
            </div>
            <div className={styles.listagem__historico}>
                {/* adicione a lógica do histórico */}
                <div className={styles.historico__item}>
                    <p>E-mail de aniversário</p>

                    <div className={styles.btns__item}>
                        <button className={styles.btn__exportar}><img src={iconExport} alt="" /></button>
                        <button><img src={iconTrash} alt="" /></button>
                    </div>
                </div>

                <div className={styles.historico__item}>
                    <p>E-mail de fim de ano</p>

                    <div className={styles.btns__item}>
                        <button className={styles.btn__exportar}><img src={iconExport} alt="" /></button>
                        <button><img src={iconTrash} alt="" /></button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfiguracao;