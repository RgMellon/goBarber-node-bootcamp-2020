# Recuperação de senha

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

# Atualização do perfil

**RF**

- O usuario deve poder atualizar seu nome, e-mail e senha;

**RN**

- O usuário n pode alterar seu e-mail para um e-mail ja utilizado;
- Para atualizar sua senha o usuário ele deve informar a senha antiga;
- Para atualizar sua senha o usuário deve confirmar a senha nova;

# Painel do prestador

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

# Agendamento de serviços

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
