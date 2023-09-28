
# Requisitos Funcionais

## RF01 - Autenticação de Usuário

- O sistema deve permitir que os usuários se autentiquem usando credenciais válidas.

## RF02 - Cadastro de Usuário

- O sistema deve permitir que novos usuários se cadastrem.

## RF03 - Recuperação de Senha

- Os usuários devem ter a opção de recuperar sua senha caso a esqueçam.
- O sistema deve permitir que os usuários solicitem a recuperação de senha por e-mail.
- Após solicitar a recuperação de senha, um link de redefinição de senha deve ser enviado para o endereço de e-mail registrado.
- Os usuários devem poder redefinir sua senha seguindo o link de redefinição de senha.

## RF04 - Listagem de Animais

- O sistema deve fornecer uma lista de animais disponíveis para adoção.

## RF05 - Filtragem de Animais por Características

- O sistema deve permitir que os usuários filtrem a lista de animais com base em características específicas.
- Após aplicar os filtros, o sistema deve exibir uma lista de animais que atendam aos critérios especificados.

## RF06 - Visualização Detalhada do Animal

- O sistema deve permitir que os usuários visualizem informações detalhadas sobre um animal específico.

## RF07 - Demonstração de Interesse em um Animal

- Os usuários registrados devem poder demonstrar interesse em um animal específico.
- O sistema deve fornecer uma opção para "demonstrar interesse" quando visualizarem um animal.
- Ao demonstrar interesse, deve ser enviada uma notificação para o dono do animal
- Ao demonstrar interesse, devem ser disponibilizados para o usuário as informações para contato do dono do animal

## RF08 - Listagem de Interesses em Animais

- Os usuários devem poder acessar uma lista de animais pelos quais demonstraram interesse.
- A lista deve exibir os nomes dos animais e suas informações básicas.

## RF09 - Listagem dos Animais Cadastrados pelo Usuário

- Os usuários devem poder visualizar uma lista dos animais que eles próprios cadastraram no sistema.
- A lista deve incluir informações sobre cada animal cadastrado, como nome, espécie, idade, etc.

## RF10 - Alteração de Dados do Animal Cadastrado pelo Usuário

- Os usuários devem poder fazer alterações nos dados de animais que eles cadastraram.
- O sistema deve permitir que os usuários editem dados dos animais cadastrados por eles.

## RF11 - Marcar Animal como "Adotado"

- Os usuários registrados devem ter a opção de marcar um animal como "Adotado”.
- O sistema deve atualizar o status do animal para "Adotado" quando esta ação for realizada.

## RF12 - Listagem de Animais com Interesse Demonstrado

- Os usuários devem poder acessar uma lista de animais pelos quais demonstraram interesse.
- A lista deve exibir os nomes dos animais e suas informações básicas.

## RF13 - Alteração de Dados do Perfil de Usuário

 - Os usuários devem poder editar as informações do seu perfil de usuário.
- As informações que podem ser editadas podem incluir nome, endereço de e-mail, número de telefone, etc.

## RF14 - Alteração de Senha com Confirmação de Senha Atual

- Os usuários devem poder alterar sua senha atual para uma nova senha.
- Para efetuar a alteração, os usuários devem fornecer a senha atual e a nova senha.
- O sistema deve verificar a senha atual antes de permitir a alteração.

## RF15 - Alteração da Foto de Perfil do Usuário

- Os usuários devem poder alterar sua foto de perfil.
- O sistema deve permitir que os usuários carreguem uma nova imagem para a foto de perfil.

## RF16 - Notificações do Sistema

- O sistema deve ser capaz de enviar notificações aos usuários sobre eventos relevantes.
- As notificações devem ser exibidas no sistema assim que o usuário fizer login.

## RF17 - Marcar Notificação como Lida

- Os usuários devem poder marcar as notificações como lidas.
- Quando uma notificação for marcada como lida, ela deve ser arquivada no sistema.
- As notificações marcadas como lidas não devem mais ser exibidas na lista de notificações não lidas.

## RF18 - Listagem de Todas as Notificações do Sistema

- Os usuários devem poder acessar uma lista de todas as notificações do sistema.
- A lista deve incluir notificações lidas e não lidas.

## RF19 - Denúncia de Animais Irregulares

- Os usuários devem poder denunciar animais que parecem estar cadastrados no sistema de forma irregular, ou seja, oferecendo venda/troca, animais de espécies não permitidas, etc.
