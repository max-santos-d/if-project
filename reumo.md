# Resumo

Uma lista de passo a passo, visando facilitar o entendimento no desenvolvimento do projeto, de acordo com videos e conteúdos explorados na internet

## Funcionalidades referente aos Posts de Eventos

### Criar uma nova models para os posts de eventos

- Para a criação da model, inicializar o script com a definição do Schema com recursos do moongose
- Relacionamento do Schema da model posts com User em um campo user
- Relacionamento para funcionalidade de likes

### Desenvolvimento das rotas, controllers e services de acordo com o desenvolvimento das funcionalidades

- Desenvolvimeto do scripts de controlles para cada funcionalidade estipulada por cada rota - no controller, criação das funçoes:
  - store para criação de novos posts
  - index para mostrar todos os posts no banco de dados
  - show para mostrar um post especificando o ID do post por parâmetro de rota
  - update para edição de um post epecificando o ID do post por parâmetro de rota e os dados para serem editados por body da requisição
  - delete para apagar um post epecificando o ID do post por parâmetro de rota

- Em paralelo ao desenvolvimeto do scripts das funcionalidades estipuladas no controller e rotas, desenvolver as funcionalidades de sevices que necessite de requisição ao banco de dados

- Desenvolvimento paralelo, ao decorrer da necessidade dos controllers, a criação das rotas - no script de rotas, criar as rotas para:
  - criação de novos post
  - mostrar todos os posts no banco de dados
  - mostrar um post especificando o ID do post por parâmetro de rota
  - edição de um post epecificando o ID do post por parâmetro de rota
  - apagar um post epecificando o ID do post por parâmetro de rota

### implementar no index o acesos as rotas criadas

### Criação do middleware para verificação de token para apenas usuários válidos, por rota, que possam realizar o pocesso para criação, edição e apagamento de post de eventos

- com o middleware de verificaçao, o retorno do ID do usuário, que está criando a noticia, deve ser parametrizado como refercia no campo definido no schema do post: user

### Desenvolver a funcionalidade de paginação para retorno dos posts

### Desenvolver a funcionalidade de busca do ultimo post criado

### Desenvolver funcionalidade para busca de um post utilizando caracteres do Titulo do post como parâmetro utilizando-o como expressão regular para verificar variadas formas de input

### Fucionalidade para curtida e descurtida no post, possibilitando identificar todos os usuários que realizaram a curtida

## Funcionalidades referente aos Posts de Perguntas

### Funcionalidade para buscar os post de determinado tipo de user

### Funcionalidade para edição de post somente pelo usuário que a criou

### Funcionalidade para apagar um post somente pelo usuário que a criou

### Fucionalidade para criar, editar e apagar um comentário no post

## Documentando a API

Documentar toda a API com o Swagger

modificação do Schema de users para diferenciação de tipos de usuários: administrador, organizador e usuário comum;

implementação de funcionalidade para promoção de usuário comum para organizador e ajustes

implementação de funcionalidade para remoção de promoção


