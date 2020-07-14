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
  (POST) - localhost:3333/sessions

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
  (POST) -  localhost:3333/users

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

\*\* O usuário deve estar logado, enviando Bearer token

```json

  #rota update avatar
  (PATCH) -  localhost:3333/users/avatar

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

### Update profile

\*\* O usuário deve estar logado, enviando Bearer token

```json

  #rota update profile ()
  (PUT) -  localhost:3333/profile

  #request body

  {
    "name": "Josezao2",
    "email": "teste243@mail.com",
    "password": "1234561234",
    "old_password": "1234324342",
  }

  # retorno do esperado

  {
    "id": "63335cb3-4340-42de-a8c9-86a3f96d240c",
    "name": "Josezao212",
    "email": "teste243@mail.com",
    "avatar": "103646e10860909d6d32-45109055.jpeg",
    "created_at": "2020-07-05T01:11:38.550Z",
    "updated_at": "2020-07-15T01:52:25.215Z",
    "avatar_url": "http://localhost:3333/files/103646e10860909d6d32-45109055.jpeg"
  }

```

### Resete password

\*\* O usuário deve estar logado, enviando Bearer token

```json

  #rota Resete password ()
  (POST) -  localhost:3333/password/reset

  #request body

  {
	"token": "c4b28134-f951-41dc-ba3f-f84b77387fe2",
	"password": "12312332",
	"password_confirmation": "123232332"
}

# retorno do esperado


```

### Esqueci senha

\*\* O usuário deve estar logado, enviando Bearer token

```json

  #rota esqueci minha senha
  (POST) -  localhost:3333/password/forgot

  #request body

  {
	  "email": "teste243@mail.com"
  }

# retorno do esperado
 (204) - no content


```

### Criar agendamento

\*\* O usuário deve estar logado, enviando Bearer token

```json

  #rota criar agendamento
  (Post) -  localhost:3333/appointments

  #request body

  {
	  "provider_id": "d4a99b8c-983c-4b3d-ad85-d1ab64d53648",
	  "date": "2020-07-15 10:00:00"
  }

  # retorno do esperado

  {
    "provider_id": "d4a99b8c-983c-4b3d-ad85-d1ab64d53648",
    "user_id": "63335cb3-4340-42de-a8c9-86a3f96d240c",
    "date": "2020-07-15T13:00:00.000Z",
    "id": "54d49229-07d9-41d8-acb2-e6aab8851ac6"
  }

```

### Listar prestadores

\*\* O usuário deve estar logado, enviando Bearer token

```json

  #rota listar prestadores
  (GET) -  localhost:3333/providers

  #request body

  ---

  # retorno do esperado
  [
    {
      "id": "de408c5e-0c87-46f1-9e8e-b587b6e009fd",
      "name": "mocinga baigula",
      "email": "mocinga@mail.com",
      "avatar": "1e2377a3d5f1f916a1b6-247731.486281-Zatnikotel.jpg",
      "created_at": "2020-06-21T22:05:41.314Z",
      "updated_at": "2020-07-02T01:54:55.768Z",
      "avatar_url": "http://localhost:3333/files/1e2377a3d5f1f916a1b6-247731.486281-Zatnikotel.jpg"
    },
    {
      "id": "63335cb3-4340-42de-a8c9-86a3f96d240c",
      "name": "Tony Maneiro",
      "email": "tony@mail.com",
      "avatar": null,
      "created_at": "2020-07-05T01:11:38.550Z",
      "updated_at": "2020-07-05T01:11:38.550Z",
      "avatar_url": null
    }
  ]
```

### Listar appointments

\*\* O usuário deve estar logado, enviando Bearer token

```json

  #rota listar agendamento
  (GET) -  localhost:3333/appointments

  #request body

  ---

  # retorno do esperado
  [
    {
      "id": "e5b2c4f9-76a9-4861-9731-280c1d1c47f2",
      "provider_id": "ea854538-8dea-4aa0-93e8-050272d9c7fb",
      "date": "2020-04-21T23:00:00.000Z"
    }
  ]

```

### Listar mes disponivel do prestador

\*\* O usuário deve estar logado, enviando Bearer token

```json

  #rota listar mes disponivel do prestador (o id do prestador deve ser passado)
  (GET) -  localhost:3333/providers/ea854538-8dea-4aa0-93e8-050272d9c7fb/month-availability

  #request body

  ---

  # retorno do esperado
  [
    {
      "day": 1,
      "available": true
    },
    {
      "day": 2,
      "available": true
    },
    {
      "day": 3,
      "available": true
    },
    {
      "day": 4,
      "available": true
    },
    {
      "day": 5,
      "available": true
    },
    {
      "day": 6,
      "available": true
    },
    {
      "day": 7,
      "available": true
    },
    {
      "day": 8,
      "available": true
    },
    {
      "day": 9,
      "available": true
    },
    {
      "day": 10,
      "available": true
    },
    {
      "day": 11,
      "available": true
    },
    {
      "day": 12,
      "available": true
    },
    {
      "day": 13,
      "available": true
    },
    {
      "day": 14,
      "available": true
    },
    {
      "day": 15,
      "available": true
    },
    {
      "day": 16,
      "available": true
    },
    {
      "day": 17,
      "available": true
    },
    {
      "day": 18,
      "available": true
    },
    {
      "day": 19,
      "available": true
    },
    {
      "day": 20,
      "available": true
    },
    {
      "day": 21,
      "available": true
    },
    {
      "day": 22,
      "available": true
    },
    {
      "day": 23,
      "available": true
    },
    {
      "day": 24,
      "available": true
    },
    {
      "day": 25,
      "available": true
    },
    {
      "day": 26,
      "available": true
    },
    {
      "day": 27,
      "available": true
    },
    {
      "day": 28,
      "available": true
    },
    {
      "day": 29,
      "available": true
    },
    {
      "day": 30,
      "available": true
    }
  ]

```

### Listar dias disponivel do prestador

\*\* O usuário deve estar logado, enviando Bearer token

```json

  #rota listar os dias disponivel do prestador (o id do prestador deve ser passado)
  (GET) -  localhost:3333/providers/ea854538-8dea-4aa0-93e8-050272d9c7fb/day-availability

  #request body

  {
    "day": 22,
    "month": 6,
    "year": 2020
  }

  # retorno do esperado
  [
    {
      "hour": 8,
      "available": true
    },
    {
      "hour": 9,
      "available": true
    },
    {
      "hour": 10,
      "available": true
    },
    {
      "hour": 11,
      "available": true
    },
    {
      "hour": 12,
      "available": true
    },
    {
      "hour": 13,
      "available": true
    },
    {
      "hour": 14,
      "available": true
    },
    {
      "hour": 15,
      "available": true
    },
    {
      "hour": 16,
      "available": true
    },
    {
      "hour": 17,
      "available": true
    }
  ]

```

### Listar agendamento do prestador

\*\* O usuário deve estar logado, enviando Bearer token

```json

  #rota listar o agendamentos do prestador
  (GET) -  localhost:3333/appointments/me

  #request body

  {
    "day" : 20,
    "month": 6,
    "year": 2020
  }

  # retorno do esperado
  [
  {
    "id": "234a8322-0dc8-424b-aa49-08dc0eee7c1a",
    "provider_id": "8495069c-062d-4c96-876e-924526c36b6e",
    "user_id": "ffed64ad-0bfd-4b55-a619-b3b422252867",
    "date": "2020-06-20T11:00:00.000Z"
  },
  {
    "id": "244990e3-1856-4dc5-82bc-b943e29b0f46",
    "provider_id": "8495069c-062d-4c96-876e-924526c36b6e",
    "user_id": "ffed64ad-0bfd-4b55-a619-b3b422252867",
    "date": "2020-06-20T13:00:00.000Z"
  },
  {
    "id": "1c7f825f-03f8-4f3c-97a3-c9c9405a8db0",
    "provider_id": "8495069c-062d-4c96-876e-924526c36b6e",
    "user_id": "ffed64ad-0bfd-4b55-a619-b3b422252867",
    "date": "2020-06-20T15:00:00.000Z"
  },
  {
    "id": "bbfa4ff8-8ccd-4166-a305-c6e16c31e602",
    "provider_id": "8495069c-062d-4c96-876e-924526c36b6e",
    "user_id": "ffed64ad-0bfd-4b55-a619-b3b422252867",
    "date": "2020-06-20T17:00:00.000Z"
  }
]

```

Desenvolvido com ♥ por Renan Melo
