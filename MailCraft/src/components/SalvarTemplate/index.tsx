import React, { useState } from "react";
import styles from "./Salvar.module.css"; 
import iconArrow from "./../../assets/icons/icon-arrow-right.svg";
import iconClose from "./../../assets/icons/icon-close.svg";
import { useMailCraft } from "../../MailCraftContext"; 

interface ModalProps {
  onClose: () => void;
}

const ModalSalvarTemplate: React.FC<ModalProps> = ({ onClose }) => {
  const { handleSalvarTemplate } = useMailCraft();
  const [templateName, setTemplateName] = useState<string>("");

  const onSave = () => {
    if (templateName.trim() === "") {
      alert("Por favor, dê um nome ao template.");
      return;
    }
    handleSalvarTemplate(templateName);
    onClose();
  };

  return (
    <div className={styles.modal__salvar}>
      <div className={styles.container__salvar}>
        <div className={styles.modal__fechar}>
          <button onClick={onClose}>
            <img src={iconClose} alt="" />
          </button>
        </div>

        <div className={styles.modal__cabecalho}>
          <h2>Guardar Template</h2>
        </div>

        <div className={styles.campo__salvar}>
          <input
            placeholder="Nome"
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </div>

        <div className={styles.btn__salvar}>
          <button onClick={onSave}>
            <p>Salvar</p>
            <img src={iconArrow} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSalvarTemplate;
