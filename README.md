# Passo a Passo do Porjeto

## Passo 1 - Inicialização do npm

## Passo 2 - instalação das dependências

As bibliotecas `bcrypt`, `dotenv`, `express`, `jsonwebtoken`, `mongoose` e `nodemon` serão utilizadas.

- As bibliotecas `bcrypt` e `jsonwebtoken` serão utilzadas para segurança;
- A biblioteca `dotenv` será utilizada para gerencialmente das variáveis de ambiente (segurança do código do projeto).
- As bibliotecas  `express`, `mongoose` e `nodemon` serão utilizadas para criação das funcionalidades;

## Criação do script para execulção do projeto para desenvolvimento e troca para o modo de importação ES6 Modules

Criação do script `dev` no arquivo `pakage.json` para utilziação do nodemon, buscando produtividade no desenvolvimento.

- Código: `"dev": "nodemon index",`.

Mudança no formato de importação e exportação para o modelo EcmaScript ES6 Modules.

- Código: `"type": "module",`.

## Estruturação das pastas

Estruturando o projeto de forma organizada seguindo:

~~~~text
projeto/
│   
├── src/
│   ├── controllers
│   ├── database
|   ├── middlewares
|   ├── models
|   ├── routes
│   └── services  
│
├── .env
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
~~~~

## Inicialização do projeto com a códificação inicial do arquivo raiz `index.js`

## Criação do banco de dados no MongoDB Atlas

É necessario a criação de uma conta na plataforma do MongoDB Atlas, a conta pode ser feita de forma gratuia, assim como seu uso para estudo, de forma limitada.

Após a criação da conta, um banco de dados foi criado e será gerenciado pela API.

## Conxão com o banco de dados

## Criação da Model de User

A Model de User conterá o esquema da tabela correspondente aos dados que irá compor. Como o mongoDb não há critérios para incerção no banco de dados, o moongose é utilizado para criar regras para os dados que irão compor no banco chamado Schema.

## Criação da rota, controller e service do user para funcionalidade de criação de um novo usuário no bd

## Implementação de funcionalidade de segurança para hash de senha

## Criação de rota para visualização de todos os usuários

## Criação de rota para mostrar somente um usuário, informando o ID válido

## Criação de rota para update de usuário

## Criação de middleware para verificação do ID de usuário informado

## Criação de rota para autenticação de usuário (login)

## Criação de rota para deletar um usuário

## Criação de token para privatização de rotas com o jsonwebtoken

## Criação de middleware para verificação de token pelo headers da requisição