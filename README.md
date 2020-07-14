<h1 align="center">
  <img alt="Logo" src="https://i.imgur.com/8bVasPx.png" width="100%">
</h1>

## Indice

- [Sobre](#-sobre)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Como baixar o projeto](#-como-baixar-o-projeto)
- [Funcionalidades](#-Funcionalidades)

---

## ℹ️ Sobre

o Projeto **GoBarber** é uma das aplicações feitas no bootcamp da rocketseat

---

## 💻 Tecnologias utilizadas

O projeto foi feito utilizando das seguines tecnologias

- NodeJs
- Redis
- MongoDb
- Postgres
- Typescript
- date-fns
- Docker

---

## 📦 Como baixar o projeto

```bash
  #clonar o repositorio
  $ git clone https://github.com/RgMellon/goBarber-node-bootcamp-2020

  #entrar na pasta do projeto
  $ cd goBarber-node-bootcamp-2020

  #instalar as dependencias
  $ npm install

  #executar o projeto
  $ npm run start

  #criando imagem do postgres com o docker
  $ docker run --name nomeDatabase  -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres:11

  #criando imagem redis com docker
  $ docker run --name redisGoBarber -p 6379:6379 -d -t redis:alpine

  #criando imagem redis com Docker

  $ docker run --name redisGoBarber -p 6379:6379 -d -t redis:alpine


```

---

## 💻 Funcionalidades

### Recuperação de senha

**RF** (Requisito funcionais)

- O usuario deve poder recuperar sua senha informando o e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha
- O usuário deve poder resetar sua senha

**RNF** (Requisitos não funcionais)

- Utilizar mailtrap para testar envios em desenvolvimento
- Utilizar o amazon SES para envios em produção
- O envio de e-mail deve acontecer em segundo plano (Background Job)

**RN** (Regras de negocio)

- O Link enviado por email para resetar senha deve expirar em 2hrs
- O usuário precisa confirmar a nova senha, ao reseta-la

### Atualização do perfil

**RF**

- O usuario deve poder atualizar seu nome, e-mail e senha;

**RN**

- O usuário n pode alterar seu e-mail para um e-mail ja utilizado;
- Para atualizar sua senha o usuário ele deve informar a senha antiga;
- Para atualizar sua senha o usuário deve confirmar a senha nova;

### Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia especifico
- O Prestador deve receber uma notificação sempre que houver um novo agendamento
- O Prestador deve visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia, devem ser armazenados em cache
- As notificações do prestador devem ser armazenadas no MongDB
- As notificaçoes do prestador devem ser enviadas em tempo real

**RN**

- A notificação deve ter um status de lida / naão lida para o prestador controlar

### Agendamento de serviços

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastros;
- O usuário deve poder listar os dias de um mês com pelo menos um horario disponível de um prestador
- O usuário deve poder listar horarios disponiveis de um dia especifico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1hora exatamente;
- Os agendamentos devem estar disponiveis entre 8:00 ás 17:00 (Primeiro ás 8:00 ultimo as 17:00);
- O usuário n pode agendar em um horario ja ocupado;
- O usuário n pode agendar em um horario que ja passsou
- O usuário n pode agendar serviço consigo mesmo

## Como usar

### Fazer login

```json

  #rota para se autenticar
  localhost:3333/sessions

  #request body

  {
    "email": "tony@mail.com",
    "password": "123456"
  }

  # retorno do esperado

  {
    "user": {
      "id": "63335cb3-4340-42de-a8c9-86a3f96d240c",
      "name": "Tony Maneiro",
      "email": "tony@mail.com",
      "avatar": "103646e10860909d6d32-45109055.jpeg",
      "created_at": "2020-07-05T01:11:38.550Z",
      "updated_at": "2020-07-05T01:13:20.042Z",
      "avatar_url": "http://localhost:3333/files/103646e10860909d6d32-45109055.jpeg"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTQ3NjQ1OTEsImV4cCI6MTU5NDg1MDk5MSwic3ViIjoiNjMzMzVjYjMtNDM0MC00MmRlLWE4YzktODZhM2Y5NmQyNDBjIn0.lvHG5peuT3vpmZnAFTOz67aKsZ57tjyOdopwOylhUL4"
  }

```

### Registrar-se

```json

  #rota para se registrar
  localhost:3333/users

  #request body

  {
    "name": "Tony Maneiro",
    "email": "tony@mail.com",
    "password": "123456"
  }

  # retorno do esperado

  {
    "name": "Tony Maneiro",
    "email": "tony@mail.com",
    "id": "63335cb3-4340-42de-a8c9-86a3f96d240c",
    "created_at": "2020-07-05T01:11:38.550Z",
    "updated_at": "2020-07-05T01:11:38.550Z",
    "avatar_url": null
  }

```

### Update avatar

```json

  #rota update avatar
  localhost:3333/users

  #request multipart

  input name : avatar
  passando o arquivo desejado

  # retorno do esperado

 {
  "id": "d4a99b8c-983c-4b3d-ad85-d1ab64d53648",
  "name": "adm",
  "email": "adm@gobarber.com",
  "avatar": "cd646e2b23b1967e74c6-eeeeee.jpeg",
  "created_at": "2020-07-15T01:05:18.034Z",
  "updated_at": "2020-07-15T01:08:42.658Z",
  "avatar_url": "http://localhost:3333/files/cd646e2b23b1967e74c6-eeeeee.jpeg"
}

```

Desenvolvido com ♥ por Renan Melo
