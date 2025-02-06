# Documentação da API

Esta é a documentação dos principais endpoints da nossa API. Eles permitem interações com usuários, produtos, autenticação e compras.

## Endpoints

### 1. **GET /users**
- **Descrição**: Retorna uma lista de todos os usuários cadastrados.
- **Método**: `GET`
- **Autorização**: Não necessária.

---

### 2. **GET /products**
- **Descrição**: Retorna uma lista de todos os produtos disponíveis.
- **Método**: `GET`
- **Autorização**: Não necessária.

---

### 3. **POST /login**
- **Descrição**: Realiza o login de um usuário e retorna um token de autenticação.
- **Método**: `POST`
- **Autorização**: Não necessária.

---

### 4. **POST /register**
- **Descrição**: Realiza o registro de um usuário verificando se já existe o email cadastrado.
- **Método**: `POST`
- **Autorização**: Não necessária.

---

### 5. **POST /auth**
- **Descrição**: Realiza a autenticação do usuário quando faz login.
- **Método**: `POST`
- **Autorização**: Não necessária.

---

### 6. **POST /finalizePurchase**
- **Descrição**: Finalização de compra apenas para usuário autenticado, solicitando Nome, Endereço e Email.
- **Método**: `POST`
- **Autorização**: Necessária.

---

### 7. **PATCH /products/stock**
- **Descrição**: Remover ou devolver produtos ao estoque no banco de dados.
- **Método**: `PATCH`
- **Autorização**: Necessária.

