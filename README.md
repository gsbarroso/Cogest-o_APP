<div align="center">
  <img src="https://via.placeholder.com/150/fdd835/000000?text=CPE" alt="Logo do Projeto" width="120">
  <h1>APP_Testes 🚀</h1>
  <p>
    Um sistema completo de gestão de ponto em tempo real, construído com um backend robusto em Node.js e uma aplicação móvel moderna em React Native.
  </p>
  <p>
    <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow" alt="Status do Projeto">
    <img src="https://img.shields.io/github/last-commit/gsbarroso/Cogestao_APP" alt="Último Commit">
  </p>
</div>

---

## 📖 **Sobre o Projeto**

**Cogestão_APP** é uma solução móvel desenhada para permitir que membros de uma organização registem as suas horas de trabalho de forma simples e intuitiva. A aplicação conta com um sistema de autenticação seguro, gestão de utilizadores com diferentes níveis de permissão e um ecrã principal que exibe em tempo real quem está logado e há quanto tempo.

A arquitetura foi pensada para ser escalável e de fácil manutenção, separando as responsabilidades entre o frontend e o backend.

---

## ✨ **Funcionalidades Principais**

### **Frontend (React Native)**
-   **Sistema de Autenticação:** Ecrãs de Login e Cadastro com validação de dados.
-   **Gestão de Estado Global:** Controlo centralizado do estado de autenticação com **Zustand** e `AsyncStorage` para persistência da sessão.
-   **Arquitetura de Hooks:** Lógica de negócio abstraída em hooks customizados (`useAuth`, `useUsers`, `useSessions`) para um código mais limpo.
-   **Sistema de Ponto em Tempo Real:** Funcionalidade de "Logar Ponto" com cronómetro individual para cada sessão ativa.
-   **Gestão de Utilizadores:** Ecrã de administração para visualizar, editar e apagar utilizadores.
-   **Controlo de Acesso por Cargo (RBAC):** Apenas utilizadores "Admin" têm acesso às funcionalidades de edição e exclusão.
-   **Modal Global:** Sistema de modal reutilizável para exibir alertas, mensagens de sucesso e diálogos de confirmação em toda a aplicação.
-   **Navegação Inteligente:** As rotas reagem ao estado de autenticação, mostrando os ecrãs corretos para utilizadores logados e deslogados.

### **Backend (Node.js & Express)**
-   **API RESTful:** Endpoints bem definidos para todas as operações.
-   **Autenticação com JWT:** Geração e validação de JSON Web Tokens para proteger as rotas.
-   **Segurança de Senhas:** As senhas são criptografadas com `bcryptjs` antes de serem salvas no banco de dados.
-   **CRUD de Utilizadores:** Funcionalidades completas para Criar, Ler, Atualizar e Apagar utilizadores.
-   **Modelagem de Dados com Mongoose:** Schema de utilizador robusto com validações de dados.
-   **Middleware de Proteção:** Protege as rotas sensíveis, garantindo que apenas utilizadores autenticados possam acedê-las.

---

## 🛠️ **Tecnologias Utilizadas**

| Categoria   | Frontend                                                                                      | Backend                                                                                          |
| :---------- | :-------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| **Core** | [React Native (Expo)](https://reactnative.dev/)                                               | [Node.js](https://nodejs.org/en/)                                                                |
| **Framework** | -                                                                                             | [Express.js](https://expressjs.com/pt-br/)                                                       |
| **Estilo** | [Styled Components](https://styled-components.com/)                                           | -                                                                                                |
| **Navegação** | [React Navigation](https://reactnavigation.org/)                                              | -                                                                                                |
| **Estado** | [Zustand](https://github.com/pmndrs/zustand)                                                  | -                                                                                                |
| **Comunicação** | [Axios](https://axios-http.com/)                                                              | -                                                                                                |
| **Armazenamento** | [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage) | -                                                                                                |
| **Base de Dados** | -                                                                                             | [MongoDB](https://www.mongodb.com/) com [Atlas](https://www.mongodb.com/cloud/atlas)             |
| **ODM** | -                                                                                             | [Mongoose](https://mongoosejs.com/)                                                              |
| **Autenticação** | -                                                                                             | [JSON Web Token (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)                      |
| **Segurança** | -                                                                                             | [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)                                                |
| **Ambiente** | -                                                                                             | [Dotenv](https://github.com/motdotla/dotenv)                                                     |

---

## 🚀 **Como Começar**

Para executar este projeto localmente, siga os passos abaixo.

### **Pré-requisitos**
* [Node.js](https://nodejs.org/en/download/) (versão LTS recomendada)
* [Git](https://git-scm.com/downloads)
* [Expo Go](https://expo.dev/go) (instalado no seu telemóvel Android ou iOS)
* Uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) para o banco de dados

### **Instalação**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/gsbarroso/Cogestao_APP.git](https://github.com/gsbarroso/Cogestao_APP.git)
    ```
    *(Substitua pelo URL do seu repositório)*

2.  **Navegue para a pasta do projeto:**
    ```bash
    cd Cogestao_APP
    ```

3.  **Configure o Backend:**
    ```bash
    # 1. Entre na pasta do backend
    cd backend
    
    # 2. Instale as dependências
    npm install
    
    # 3. Crie um ficheiro .env na raiz da pasta 'backend' e adicione as suas variáveis
    # Exemplo de .env:
    # MONGODB_URI=seu_link_de_conexao_do_mongodb_atlas
    # PORT=3001
    # JWT_SECRET=seu_segredo_super_secreto_aqui
    
    # 4. Inicie o servidor do backend
    npm run dev
    ```
    O seu backend deverá estar a rodar na porta `3001`.

4.  **Configure o Frontend:**
    * Abra um **novo terminal**.
    * Navegue para a pasta do frontend:
        ```bash
        cd Cogestao_APP/frontend 
        ```
    * Instale as dependências:
        ```bash
        npm install
        ```
    * **Passo Crucial:** Abra o ficheiro `frontend/src/services/api.js` e altere a `baseURL` para o endereço de IP local da sua máquina. Não use `localhost`.
        ```javascript
        // Exemplo em api.js
        const baseURL = '[http://192.168.1.10:3001/api](http://192.168.1.10:3001/api)'; 
        ```
    * Inicie a aplicação frontend:
        ```bash
        npx expo start
        ```
    * Escaneie o QR Code com a aplicação Expo Go no seu telemóvel.

---

## 🗺️ **Endpoints da API**

-   `POST /api/auth/login` - Autentica um utilizador e retorna um token.
-   `POST /api/users` - Cria um novo utilizador.
-   `GET /api/users` - (Protegido) Retorna a lista de todos os utilizadores.
-   `GET /api/users/:id` - (Protegido) Retorna os detalhes de um utilizador específico.
-   `PUT /api/users/:id` - (Protegido) Atualiza os dados de um utilizador.
-   `DELETE /api/users/:id` - (Protegido) Elimina um utilizador.

---

## 👨‍💻 **Autores**

* **Gustavo Barroso** - *Desenvolvimento & Arquitetura* - [gsbarroso](https://github.com/gsbarroso)

