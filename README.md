# 📚 Documentação da API de Tarefas

**Base URL:** `http://localhost:3000`

**Autenticação:** Não requerida (desenvolvimento)

---

## 📋 Tabela de Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/tarefas` | Listar todas as tarefas |
| POST | `/tarefas` | Criar nova tarefa |
| PUT | `/tarefas/:id` | Atualizar tarefa por ID |
| DELETE | `/tarefas/:id` | Deletar tarefa por ID |

---

## 🔹 GET `/tarefas`

**Descrição:** Retorna uma lista de todas as tarefas cadastradas no banco de dados.

**Método HTTP:** `GET`

**Parâmetros:** Nenhum

**Exemplo de Request:**
```bash
curl http://localhost:3000/tarefas
```

**Exemplo de Response (200 - OK):**
```json
[
  {
    "_id": "6a0509c9b0f89bdb662b70ef",
    "titulo": "Estudar Java",
    "descricao": "Começar Java",
    "status": "a fazer",
    "createdAt": "2026-05-13T23:31:21.384Z",
    "updatedAt": "2026-05-13T23:31:21.384Z",
    "__v": 0
  },
  {
    "_id": "6a050a1c5f4d2e1a9c8b3f2e",
    "titulo": "Projeto React",
    "descricao": "Construir app com React e Tailwind",
    "status": "em progresso",
    "createdAt": "2026-05-13T23:32:45.120Z",
    "updatedAt": "2026-05-13T23:35:10.560Z",
    "__v": 0
  }
]
```

**Códigos de Status:**
- `200 OK` - Tarefas retornadas com sucesso (pode ser array vazio)
- `500 Internal Server Error` - Erro ao conectar ao banco de dados

**Exemplo de Erro (500):**
```json
{
  "erro": "Erro ao conectar ao MongoDB"
}
```

---

## 🔹 POST `/tarefas`

**Descrição:** Cria uma nova tarefa no banco de dados.

**Método HTTP:** `POST`

**Headers Obrigatórios:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "titulo": "string (obrigatório)",
  "descricao": "string (opcional)",
  "status": "string (opcional, padrão: 'a fazer')"
}
```

**Valores válidos para `status`:**
- `"a fazer"` (padrão)
- `"em progresso"`
- `"concluído"`

**Exemplo de Request (Postman/cURL):**
```bash
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Estudar JavaScript",
    "descricao": "Revisar conceitos de async/await",
    "status": "em progresso"
  }'
```

**Exemplo de Request (JavaScript/Axios):**
```javascript
const response = await axios.post('http://localhost:3000/tarefas', {
  titulo: 'Estudar JavaScript',
  descricao: 'Revisar conceitos de async/await',
  status: 'em progresso'
});
```

**Exemplo de Response (201 - Created):**
```json
{
  "_id": "6a050c2d8f9e1a3b4c5d6e7f",
  "titulo": "Estudar JavaScript",
  "descricao": "Revisar conceitos de async/await",
  "status": "em progresso",
  "createdAt": "2026-05-14T10:25:30.456Z",
  "updatedAt": "2026-05-14T10:25:30.456Z",
  "__v": 0
}
```

**Códigos de Status:**
- `201 Created` - Tarefa criada com sucesso
- `400 Bad Request` - Dados inválidos (título faltando)
- `500 Internal Server Error` - Erro no servidor

**Exemplos de Erro:**

Título faltando (400):
```json
{
  "erro": "titulo é obrigatório"
}
```

Erro do servidor (500):
```json
{
  "erro": "Erro ao salvar no banco de dados"
}
```

---

## 🔹 PUT `/tarefas/:id`

**Descrição:** Atualiza uma tarefa existente pelo ID.

**Método HTTP:** `PUT`

**Parâmetros de URL:**
- `:id` - ID da tarefa (ObjectId do MongoDB)

**Headers Obrigatórios:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "titulo": "string (opcional)",
  "descricao": "string (opcional)",
  "status": "string (opcional)"
}
```

**Exemplo de Request:**
```bash
curl -X PUT http://localhost:3000/tarefas/6a050c2d8f9e1a3b4c5d6e7f \
  -H "Content-Type: application/json" \
  -d '{
    "status": "concluído",
    "descricao": "JavaScript aprendido com sucesso"
  }'
```

**Exemplo de Request (JavaScript/Axios):**
```javascript
const response = await axios.put(
  'http://localhost:3000/tarefas/6a050c2d8f9e1a3b4c5d6e7f',
  {
    status: 'concluído',
    descricao: 'JavaScript aprendido com sucesso'
  }
);
```

**Exemplo de Response (200 - OK):**
```json
{
  "_id": "6a050c2d8f9e1a3b4c5d6e7f",
  "titulo": "Estudar JavaScript",
  "descricao": "JavaScript aprendido com sucesso",
  "status": "concluído",
  "createdAt": "2026-05-14T10:25:30.456Z",
  "updatedAt": "2026-05-14T10:30:15.789Z",
  "__v": 0
}
```

**Códigos de Status:**
- `200 OK` - Tarefa atualizada com sucesso
- `404 Not Found` - ID da tarefa não existe
- `400 Bad Request` - Dados inválidos
- `500 Internal Server Error` - Erro no servidor

**Exemplos de Erro:**

Tarefa não encontrada (404):
```json
{
  "erro": "Tarefa não encontrada"
}
```

ID inválido (400):
```json
{
  "erro": "ID inválido"
}
```

---

## 🔹 DELETE `/tarefas/:id`

**Descrição:** Deleta uma tarefa existente pelo ID.

**Método HTTP:** `DELETE`

**Parâmetros de URL:**
- `:id` - ID da tarefa (ObjectId do MongoDB)

**Body:** Nenhum

**Exemplo de Request:**
```bash
curl -X DELETE http://localhost:3000/tarefas/6a050c2d8f9e1a3b4c5d6e7f
```

**Exemplo de Request (JavaScript/Axios):**
```javascript
const response = await axios.delete(
  'http://localhost:3000/tarefas/6a050c2d8f9e1a3b4c5d6e7f'
);
```

**Exemplo de Response (200 - OK):**
```json
{
  "mensagem": "Tarefa deletada com sucesso"
}
```

**Códigos de Status:**
- `200 OK` - Tarefa deletada com sucesso
- `404 Not Found` - ID da tarefa não existe
- `400 Bad Request` - ID inválido
- `500 Internal Server Error` - Erro no servidor

**Exemplos de Erro:**

Tarefa não encontrada (404):
```json
{
  "erro": "Tarefa não encontrada"
}
```

ID inválido (400):
```json
{
  "erro": "ID inválido"
}
```

---

## 📊 Modelo de Dados - Tarefa

```typescript
interface Tarefa {
  _id: string;              // ID único do MongoDB
  titulo: string;           // Título da tarefa (obrigatório)
  descricao?: string;       // Descrição opcional
  status: string;           // Status da tarefa (padrão: "a fazer")
  createdAt: Date;          // Data de criação (automática)
  updatedAt: Date;          // Data de última atualização (automática)
  __v: number;              // Versão do documento (interno do Mongoose)
}
```

---

## 🔗 Fluxo de Uso Típico

### 1. Listar todas as tarefas
```javascript
GET /tarefas
```

### 2. Criar uma nova tarefa
```javascript
POST /tarefas
Body: { titulo, descricao, status }
```

### 3. Atualizar status de uma tarefa
```javascript
PUT /tarefas/:id
Body: { status: "concluído" }
```

### 4. Deletar uma tarefa
```javascript
DELETE /tarefas/:id
```

---

## 🛠️ Implementação com Axios (Frontend)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

// Listar tarefas
export const getTarefas = async () => {
  return await api.get('/tarefas');
};

// Criar tarefa
export const criarTarefa = async (dados) => {
  return await api.post('/tarefas', dados);
};

// Atualizar tarefa
export const atualizarTarefa = async (id, dados) => {
  return await api.put(`/tarefas/${id}`, dados);
};

// Deletar tarefa
export const deletarTarefa = async (id) => {
  return await api.delete(`/tarefas/${id}`);
};
```

---

## 📝 Implementação no Express (Backend)

```javascript
// GET - Listar todas as tarefas
app.get("/tarefas", async (req, res) => {
  try {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// POST - Criar nova tarefa
app.post("/tarefas", async (req, res) => {
  try {
    const novaTarefa = await Tarefa.create(req.body);
    res.status(201).json(novaTarefa);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// PUT - Atualizar tarefa
app.put("/tarefas/:id", async (req, res) => {
  try {
    const tarefaAtualizada = await Tarefa.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!tarefaAtualizada) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    
    res.json(tarefaAtualizada);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// DELETE - Deletar tarefa
app.delete("/tarefas/:id", async (req, res) => {
  try {
    const tarefaDeletada = await Tarefa.findByIdAndDelete(req.params.id);
    
    if (!tarefaDeletada) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    
    res.json({ mensagem: "Tarefa deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
```

---

## ⚙️ Variáveis de Ambiente

```env
# .env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/banco-dados
PORT=3000
NODE_ENV=development
```

---

## 🔒 Validações

### Validações do Schema

- **titulo**: Obrigatório, tipo String
- **descricao**: Opcional, tipo String
- **status**: Opcional, tipo String, padrão "a fazer"

### Validações Recomendadas (Frontend)

```javascript
// Título não pode estar vazio
if (!titulo.trim()) {
  alert('Por favor, digite um título');
  return;
}

// Título deve ter no mínimo 3 caracteres
if (titulo.length < 3) {
  alert('Título deve ter no mínimo 3 caracteres');
  return;
}

// Status deve ser válido
const statusValidos = ['a fazer', 'em progresso', 'concluído'];
if (!statusValidos.includes(status)) {
  alert('Status inválido');
  return;
}
```

---

## 🚨 Tratamento de Erros

```javascript
try {
  const response = await api.get('/tarefas');
  // Sucesso
} catch (error) {
  if (error.response) {
    // Erro da API (4xx, 5xx)
    console.error('Status:', error.response.status);
    console.error('Mensagem:', error.response.data.erro);
  } else if (error.request) {
    // Erro de conexão
    console.error('Erro de conexão:', error.request);
  } else {
    // Outro erro
    console.error('Erro:', error.message);
  }
}
```

---

## 📱 Testando com Postman

### 1. GET /tarefas
- **Método:** GET
- **URL:** `http://localhost:3000/tarefas`
- **Headers:** Nenhum obrigatório

### 2. POST /tarefas
- **Método:** POST
- **URL:** `http://localhost:3000/tarefas`
- **Headers:** `Content-Type: application/json`
- **Body (raw):**
```json
{
  "titulo": "Minha nova tarefa",
  "descricao": "Descrição da tarefa",
  "status": "a fazer"
}
```

### 3. PUT /tarefas/:id
- **Método:** PUT
- **URL:** `http://localhost:3000/tarefas/6a050c2d8f9e1a3b4c5d6e7f`
- **Headers:** `Content-Type: application/json`
- **Body (raw):**
```json
{
  "status": "concluído"
}
```

### 4. DELETE /tarefas/:id
- **Método:** DELETE
- **URL:** `http://localhost:3000/tarefas/6a050c2d8f9e1a3b4c5d6e7f`
- **Headers:** Nenhum obrigatório

---

## 🔄 Status HTTP Resumo

| Código | Significado | Descrição |
|--------|-------------|-----------|
| 200 | OK | Requisição bem-sucedida |
| 201 | Created | Recurso criado com sucesso |
| 400 | Bad Request | Dados inválidos |
| 404 | Not Found | Recurso não encontrado |
| 500 | Internal Server Error | Erro no servidor |

---

## 📞 Suporte

Para dúvidas ou erros:
1. Verifique se o servidor está rodando em `http://localhost:3000`
2. Verifique se o MongoDB está conectado
3. Consulte os logs do terminal do Node.js
4. Abra DevTools (F12) no navegador para ver detalhes do erro

---

**Versão:** 1.0.0  
**Última atualização:** 2026-05-14  
**Ambiente:** Desenvolvimento