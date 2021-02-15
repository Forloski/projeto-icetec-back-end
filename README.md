# Back-End REST API Projeto ICETEC
> API que fornece CRUD para cadastro de candidatos e CR para autenticação de usuários.

API desenvolvida em NodeJS (Express), utilizando TypeScript, dentro dos padrões REST com objetivo de fornecer CRUD para uma entidade de candidatos e C para a autenticação de usuários. 
Foi desenvolvida como parte do teste requisitado pela [ICETEC Solutions](https://icetecsolutions.com.br). Teste requisitado às 11:00 do dia 10/02/2021 e entregue às 09:00 dia 15/02/2021


## Configuração para Desenvolvimento
Instalar as dependências com:
```sh
npm install 
```
Criar uma Database Postgres (de maneira que preferir). 
Exemplo meu usando Docker:
```sh
docker run --name icetec_test -e POSTGRES_PASSWORD=docker -p 5432:5432 
-d postgres
```
Rodar as migrations da database:
```sh
npm run typeorm -- migration:run
```

Para inicializar a API:
```sh
npm run devServer
```
Para rodas os testes unitários:
```sh
npm run test
```
## Exemplo de uso

### Rotas CRUD para entidade de candidatos

Todas as rotas de candidatos requerem autenticação por meio de Bearer Token.

* **Rota de criação de candidatos**

Cria um candidato dentro do banco de dados com os dados informados e retorna um objeto com os dados criados.
```sh
POST {apiURL}/candidates
```
 Espera que seja enviado um HTTP request com o seguinte body:

     {
    "name":  "string", // required
    "email":  "string", // required
    "age":  "number",
    "linkedinUrl":  "string",
    "technologies":  string[]
    }
 Caso a criação tenha sucesso retorna no body da resposta:

     {
    	"id": "string", 
        "name":  "string",
        "email":  "string",
        "age":  "number",
        "linkedinUrl":  "string",
        "technologies":  string[],
        "createdAt": "date",
        "updatedAt": "date",
     }
* **Rota de leitura de um único candidato**

Lê um candidato especifico da database.

Espera que o ID do candidato seja passado como parâmetro na URL.
```sh
GET {apiURL}/candidates/:id
```
 Retorna um um candidato, com o seguinte formato, no body da resposta:

     {
    	"id": "string", 
        "name":  "string",
        "email":  "string",
        "age":  "number",
        "linkedinUrl":  "string",
        "technologies":  string[],
        "createdAt": "date",
        "updatedAt": "date",
     }
* **Rota de leitura de uma lista de candidatos**

Aceita query string para filtro. Caso URL não contenha nenhuma query string irá retornar um array com todos os candidatos, caso haja alguma query string retornará um array com os candidatos filtrados.
```sh
GET {apiURL}/candidates
```
Formato das query strings na URL para filtro de tecnologias:
```sh
GET {apiURL}/candidates?&tech=tecnologia1&tech=tecnologia2
```
Retorna um array de candidatos onde cada um tem o formato da resposta da rota de criação de candidatos.
```sh
["candidate1", "candidate2", ... , "lastCandidate"] 
```
* **Rota de atualização de candidatos**

Atualiza todas as informações de um candidato salvo na database, com exceção do "id". 

Espera que o ID do usuário seja passado como parâmetro na URL.
```sh
PUT {apiURL}/candidates/:id
```
Espera que seja enviado um HTTP request com o seguinte body:

     {
    "id": "string", // uuid, required
    "name":  "string", // required
    "email":  "string", // required
    "age":  "number",
    "linkedinUrl":  "string",
    "technologies":  string[]
    }
 Caso a atualização tenha sucesso retorna no body da resposta:

     {
    	"id": "string",
        "name":  "string",
        "email":  "string",
        "age":  "number",
        "linkedinUrl":  "string",
        "technologies":  string[],
        "createdAt": "date",
        "updatedAt": "date"
     }
* **Rota de exclusão de candidatos**

Exclui um candidato da database.

Espera que o ID do usuário seja passado como parâmetro na URL.
```sh
DELETE {apiURL}/candidates/:id
```
Retorna HTTP **`200 OK`** success status, caso o usuário seja excluído.

### Rota C para entidade de usuários

Essa rota não foi requisitada no teste, porém prefiro usar um HTTP request para criação de usuários que inserção direta no banco.

* **Rota de criação de usuários**

Cria um usuário na database.

```sh
POST {apiURL}/users
```
 Espera que seja enviado um HTTP request com o seguinte body:

     {
    "name":  "string", // required
    "email":  "string", // required
    "password":  "string",// required, min 6 chars
    }
 Caso a criação tenha sucesso retorna no body da resposta:

     {
        "name":  "string",
        "email":  "string",
        "password":  "*********",
        "createdAt": "date",
        "updatedAt": "date",
     }

### Rotas de autenticação
* **Rota de criação de sessão para usuários**

Cria uma sessão para o usuário com um JWT token de duração de 1 dia.
```sh
POST {apiURL}/users
```
Espera que seja enviado um HTTP request com o seguinte body:

     {
    "email":  "string", // required
    "password":  "string",// required
    }
 Caso a criação da sessão seja um sucesso retorna no body da resposta:
 

     {
	    "user":  {
			    "id":  "string", //uuid
			    "name":  "string",
			    "email":  "string",
				"created_at":  "date",
			    "updated_at":  "date"
			    },
	    "token":  "string" // jwt token
    }
### Melhorias futuras
 - [ ] Melhorar o tratamento de erros
 - [ ] Criar CRUD para usuários
 - [ ] Melhorar testes unitários  
 - [ ] Criar testes de integração

