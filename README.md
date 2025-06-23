# 📬 Mail Craft

Mail Craft é uma aplicação web desenvolvida em React para criação, personalização, envio e gerenciamento de templates de e-mail em HTML com suporte a anexos e importação de contatos via arquivos `.csv` e `.xlsx`.

---

## ✨ Funcionalidades

- ✅ Criação de e-mails com HTML customizado
- ✅ Inserção de imagens por URL
- ✅ Anexos múltiplos
- ✅ Pré-visualização em tempo real
- ✅ Exportação de template para `.html`
- ✅ Salvamento e carregamento de templates (via LocalStorage)
- ✅ Envio real de e-mails com integração ao **EmailJS**
- ✅ Importação de contatos em massa por `.csv` ou `.xlsx`
- ✅ Histórico de templates

---

## 🚀 Tecnologias e Padrões Utilizados

- **React 18+**
- **EmailJS (envio de e-mails sem backend)**
- **TypeScript**
- **Context API + LocalStorage**
- **Padrões de Projeto Aplicados:**
  - Builder
  - Prototype
  - Decorator
  - Composite
  - Singleton
  - Adapter

---
## 📁 Estrutura de Pastas
    📁 src/
    ├── components/           # Modais, botões, layout
    ├── core/
    │   ├── Classes/          # Padrões de projeto
    │   └── Interfaces/       # Tipagens e contratos
    ├── assets/               # Imagens e ícones
    ├── App.tsx               # Componente principal
    ├── MailCraftContext.tsx  # Contexto global da aplicação

---

## 📦 Instalação e Execução

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seuusuario/mail-craft.git
   cd mail-craft

2. **Instale as dependências:**
   ```bash
   npm i

3. **Execute:**
   ```bash
   npm run dev
   
