import React, { useState, useEffect } from 'react';
import styles from './Configuracoes.module.css'; 
import iconClose from '../../assets/icons/icon-close.svg';
import iconImport from '../../assets/icons/icon-import.svg';
import iconArrow from '../../assets/icons/icon-arrow-right.svg';
import iconExport from '../../assets/icons/icon-export.svg';
import iconTrash from '../../assets/icons/icon-trash.svg';
import { useMailCraft } from '../../MailCraftContext'; 

interface ModalProps {
    onClose: () => void;
}

const ModalConfiguracao: React.FC<ModalProps> = ({ onClose }) => {
    const {
        destinatarios, setDestinatarios, 
        importarContatos,
        handleEnviarEmail,
        handleCarregarTemplate,
    } = useMailCraft();

    const [nomeArquivoImportadoUI, setNomeArquivoImportadoUI] = useState('Nenhum arquivo encontrado...');
    const [templatesSalvos, setTemplatesSalvos] = useState<Array<{ name: string; assunto: string; corpoHtml: string; anexos: any[] }>>([]);

    useEffect(() => {
        const savedTemplates = localStorage.getItem('mailcraft_templates');
        if (savedTemplates) {
            setTemplatesSalvos(JSON.parse(savedTemplates));
        }
    }, []); 

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setNomeArquivoImportadoUI(file.name);
            await importarContatos(file);
        } else {
            setNomeArquivoImportadoUI('Nenhum arquivo encontrado...');
            setDestinatarios([]); 
        }
    };

    const handleDeleteTemplate = (templateName: string) => {
        const updatedTemplates = templatesSalvos.filter(t => t.name !== templateName);
        localStorage.setItem('mailcraft_templates', JSON.stringify(updatedTemplates));
        setTemplatesSalvos(updatedTemplates); 
        alert(`Template "${templateName}" deletado!`);
    };

    const handleCarregarEFechar = (template: { name: string; assunto: string; corpoHtml: string; anexos: any[] }) => {
        handleCarregarTemplate(template);
        onClose(); 
    };

    const handleEnviarEFechar = async () => {
        await handleEnviarEmail(); 
        onClose();
    };

    return (
        <div className={styles.modal__configuracao}>
            <div className={styles.container__configuracao}>
                <div className={styles.modal__fechar}>
                    <button onClick={onClose}>
                        <img src={iconClose} alt="" />
                    </button>
                </div>

                <div className={styles.configuracoes__contato}>
                    <div className={styles.contato__import}>
                        <p>Anexe os e-mails de destino no formato <span>.xlsx</span> ou <span>.csv</span></p>

                        <div className={styles.import__campo}>
                            <input
                                className={styles.campo__input}
                                type="file"
                                name="fileUploadConfig" 
                                id="fileUploadConfig"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                accept=".csv,.xlsx"
                            />
                            <label className={styles.import__campo_label} htmlFor="fileUploadConfig">
                                <div className={styles.import__conteudo}>
                                    <img src={iconImport} alt="" />
                                    <p>Importar Contatos</p>
                                </div>
                            </label>
                            <span className={styles.nome__projeto}>{nomeArquivoImportadoUI}</span>
                        </div>
                    </div>

                    <div className={styles.contatos__listagem}>
                        {destinatarios.length === 0 ? (
                            <p>Nenhum contato importado.</p>
                        ) : (
                            destinatarios.map((contato, index) => (
                                <div key={index} className={styles.contato}>
                                    <p>{contato.nome} &lt;{contato.email}&gt;</p>
                                </div>
                            ))
                        )}
                    </div>

                    <div className={styles.contatos__enviar}>
                        <button onClick={handleEnviarEFechar}> 
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
                        {templatesSalvos.length === 0 ? (
                            <p>Nenhum template salvo.</p>
                        ) : (
                            templatesSalvos.map((template, index) => (
                                <div key={index} className={styles.historico__item}>
                                    <p>{template.name}</p>
                                    <div className={styles.btns__item}>
                                        <button className={styles.btn__exportar} onClick={() => handleCarregarEFechar(template)}>
                                            <img src={iconExport} alt="" />
                                        </button>
                                        <button onClick={() => handleDeleteTemplate(template.name)}>
                                            <img src={iconTrash} alt="" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalConfiguracao;