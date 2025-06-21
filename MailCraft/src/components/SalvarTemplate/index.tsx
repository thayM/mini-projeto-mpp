import React from 'react';
import styles from './Salvar.module.css'
import iconArrow from './../../assets/icons/icon-arrow-right.svg'
import iconClose from './../../assets/icons/icon-close.svg'

interface ModalProps {
  onClose: () => void;
}

const ModalSalvarTemplate: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className={styles.modal__salvar}>
      <div className={styles.container__salvar}>
        <div className={styles.modal__fechar}>
            <button>
            <img src={iconClose} alt="" onClick={() => {onClose(); }}/>
            </button>
        </div>

        <div className={styles.modal__cabecalho}>
            <h2>Guardar Template</h2>
        </div>

        <div className={styles.campo__salvar}>
            <input placeholder='Nome' type="text" />
        </div>

        <div className={styles.btn__salvar}>
            <button onClick={() => { /* lógica de salvar */ onClose(); }}>
                <p>Salvar</p>
                <img src={iconArrow} alt="" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSalvarTemplate;
