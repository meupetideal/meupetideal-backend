# Descrições de Casos de Uso

## Gerenciamento de Conta

### UC01 Registrar usuário

**Caso de Uso:** Registrar usuário

**Ator Principal:** Convidado

**Pré-condições:** O usuário não está registrado no sistema.

**Fluxo Principal:**

1. O usuário acessa a página de registro.
2. O sistema exibe um formulário de registro com campos obrigatórios, como nome completo, endereço de e-mail, senha, etc.
3. O usuário preenche os campos obrigatórios com as informações desejadas.
4. O usuário seleciona a opção "Registrar" ou "Criar Conta".
5. O sistema verifica se as informações fornecidas pelo usuário estão corretas e únicas.
6. Se as informações estiverem corretas e únicas, o sistema cria uma conta de usuário e a armazena no banco de dados.
7. O sistema exibe uma mensagem de confirmação do registro bem-sucedido, autentica e direciona o usuário para a página principal.

**Fluxo Alternativo 1** - Informações inválidas ou não únicas:
- 5a. Se o sistema detectar que as informações fornecidas pelo usuário são inválidas ou não únicas, como um e-mail ou cpf já registrado:
- 5b. O sistema exibe mensagens de erro específicas para cada campo com problemas.
- 5c. O usuário corrige as informações e tenta registrar novamente.

**Pós-condições:** O usuário é registrado no sistema e pode fazer login com as credenciais fornecidas durante o registro.

### UC02 Recuperar senha com e-mail

**Caso de Uso:** Recuperar senha com e-mail

**Ator Principal:** Usuário

**Pré-condições:** O usuário esqueceu a senha da sua conta no sistema.

**Fluxo Principal:**

1. O usuário acessa a página de recuperação de senha.
2. O sistema exibe um campo de entrada de e-mail.
3. O usuário insere o endereço de e-mail associado à sua conta.
4. O usuário seleciona a opção "Enviar solicitação de recuperação de senha".
5. O sistema verifica se o e-mail fornecido está associado a uma conta válida no sistema.
6. Se o e-mail for válido, o sistema gera um token de recuperação de senha exclusivo e o associa à conta do usuário.
7. O sistema envia um e-mail para o endereço fornecido pelo usuário, contendo um link para redefinir a senha.

**Fluxo Alternativo 1** - E-mail inválido ou não encontrado:
- 5a. Se o sistema não encontrar um registro com o e-mail fornecido:
- 5b. O sistema exibe uma mensagem de erro informando que o e-mail não foi encontrado.
- 5c. O usuário pode corrigir o e-mail e tentar novamente.

**Pós-condições:** O usuário recebe o e-mail que contém o link de verificação.

### UC03 Autenticar usuário

**Caso de Uso:** Autenticar usuário

**Ator Principal:** Usuário

**Pré-condições:** O usuário está registrado no sistema e não está autenticado.

**Fluxo Principal:**

1. O usuário acessa a página de login do sistema.
2. O sistema exibe campos de entrada para o nome de usuário (ou e-mail) e senha.
3. O usuário insere seu nome de usuário (ou e-mail) e senha.
4. O usuário seleciona a opção "Entrar" ou "Login".
5. O sistema verifica as credenciais fornecidas pelo usuário.
6. Se as credenciais estiverem corretas e correspondentes a um usuário registrado, o sistema autentica o usuário e o direciona para a página inicial do sistema.

**Fluxo Alternativo 1** - Credenciais incorretas:
- 5a. Se o sistema não encontrar correspondência para as credenciais fornecidas pelo usuário ou se as credenciais estiverem incorretas:
- 5b. O sistema exibe uma mensagem de erro informando que as credenciais são inválidas.
- 5c. O usuário pode corrigir as credenciais e tentar fazer login novamente.

**Pós-condições:** O usuário é autenticado no sistema e tem acesso às funcionalidades.

### UC04 Redefinir senha com token

**Caso de Uso:** Redefinir senha com token

**Ator Principal:** Usuário

**Pré-condições:** O usuário solicitou a recuperação de senha e recebeu um link por e-mail (UC02).

**Fluxo Principal:**

1. O usuário clica no link recebido por e-mail
2. O sistema exibe um campo de entrada para a nova senha e confirmação da nova senha.
3. O usuário insere a nova senha e a confirmação da nova senha.
4. O usuário seleciona a opção "Redefinir senha".
5. O sistema verifica se o token é válido e se as senhas fornecidas correspondem e atendem aos requisitos de segurança.
6. Se o token for válido e as senhas forem aceitáveis, o sistema atualiza a senha do usuário no banco de dados.
7. O sistema exibe uma mensagem de confirmação da redefinição de senha bem-sucedida.
8. O usuário é redirecionado para a página de login e pode usar a nova senha para autenticar-se no sistema.

**Fluxo Alternativo 1** - Token inválido ou expirado:
- 5a. Se o sistema detectar que o token é inválido ou expirou:
- 5b. O sistema exibe uma mensagem de erro informando que o token é inválido ou expirou.
- 5c. O usuário pode solicitar uma nova recuperação de senha, se necessário.

**Fluxo Alternativo 2** - Senhas não correspondentes ou inválidas:
- 5d. Se as senhas fornecidas pelo usuário não corresponderem ou não atenderem aos requisitos de segurança estabelecidos pelo sistema:
- 5e. O sistema exibe uma mensagem de erro detalhando os requisitos de senha não atendidos.
- 5f. O usuário deve escolher novas senhas que cumpram os requisitos.

**Pós-condições:** A senha do usuário é redefinida com sucesso e o usuário pode fazer login no sistema com a nova senha.

### UC05 Redefinir senha com senha atual

**Caso de Uso:** Redefinir senha com senha atual

**Ator Principal:** Usuário

**Pré-condições:** O usuário está autenticado no sistema.

**Fluxo Principal:**

1. O usuário acessa a página de configurações de conta ou perfil.
2. O sistema exibe campos de entrada para a senha atual e a nova senha, juntamente com a confirmação da nova senha.
3. O usuário insere a senha atual, a nova senha e a confirmação da nova senha.
4. O usuário seleciona a opção "Atualizar senha".
5. O sistema verifica se a senha atual fornecida corresponde à senha registrada na conta do usuário.
6. O sistema verifica se a nova senha atende aos requisitos de segurança estabelecidos pelo sistema.
7. Se a senha atual corresponder e a nova senha for aceitável, o sistema atualiza a senha do usuário no banco de dados.
8. O sistema exibe uma mensagem de confirmação da atualização de senha bem-sucedida.

**Fluxo Alternativo 1** - Senha atual incorreta:
- 5a. Se o sistema detectar que a senha atual fornecida pelo usuário não corresponde à senha registrada na conta:
- 5b. O sistema exibe uma mensagem de erro informando que a senha atual é incorreta.
- 5c. O usuário pode corrigir a senha atual e tentar atualizar a senha novamente.

**Fluxo Alternativo 2** - Senha não correspondente ou inválida:
- 6a. Se a nova senha fornecida pelo usuário não corresponder à confirmação da nova senha ou não atender aos requisitos de segurança estabelecidos pelo sistema:
- 6b. O sistema exibe uma mensagem de erro detalhando os requisitos de senha não atendidos.
- 6c. O usuário deve escolher uma nova senha que cumpra os requisitos e corresponda à confirmação.

**Pós-condições:** A senha do usuário é atualizada com sucesso e pode ser usada para autenticação no sistema.

### UC06 Atualizar perfil

**Caso de Uso:** Atualizar perfil

**Ator Principal:** Usuário

**Pré-condições:** O usuário está autenticado no sistema.

**Fluxo Principal:**

1. O usuário acessa a página de perfil.
2. O sistema exibe as informações atuais do perfil do usuário, como nome, sobrenome, endereço de e-mail, foto de perfil, etc.
3. O usuário seleciona a opção "Editar perfil".
4. O sistema exibe um formulário de edição de perfil preenchido com as informações atuais.
5. O usuário atualiza as informações desejadas, como nome, sobrenome, endereço de e-mail, foto de perfil, etc.
6. O usuário confirma as alterações selecionando a opção "Salvar".
7. O sistema valida as informações atualizadas e as armazena no banco de dados.
8. O sistema exibe uma mensagem de confirmação das alterações realizadas.
9. O perfil do usuário é atualizado com as informações editadas.

**Fluxo Alternativo 1** - Erro de validação:
- 7a. Se ocorrer algum erro de validação ao tentar salvar as informações atualizadas, como um endereço de e-mail inválido:
- 7b. O sistema exibe uma mensagem de erro informando o problema.
- 7c. O usuário corrige as informações e tenta salvar novamente.

**Pós-condições:** As informações do perfil do usuário são atualizadas no sistema de acordo com as alterações feitas pelo usuário.

### UC07 Visualizar perfil

**Caso de Uso:** Visualizar perfil

**Ator Principal:** Usuário

**Pré-condições:** O usuário está autenticado no sistema.

**Fluxo Principal:**

1. O usuário acessa a página de perfil.
2. O sistema exibe as informações atuais do perfil do usuário, incluindo nome, sobrenome, endereço de e-mail, foto de perfil, etc.
3. O usuário pode visualizar as informações do perfil.

**Pós-condições:** O usuário pode visualizar as informações do seu próprio perfil.

### UC08 Atualizar foto de perfil

**Caso de Uso:** Atualizar foto de perfil

**Ator Principal:** Usuário

**Pré-condições:** O usuário está autenticado no sistema.

**Fluxo Principal:**

1. O usuário acessa a página de perfil.
2. O sistema exibe as informações atuais do perfil do usuário, incluindo a foto de perfil atual.
3. O usuário seleciona a opção "Editar foto de perfil" ou clica na própria imagem de perfil.
4. O usuário seleciona e faz upload da nova imagem de perfil.
5. O sistema valida a imagem, garantindo que ela atenda aos requisitos de formato e tamanho especificados.
6. O sistema armazena a nova imagem de perfil no banco de dados ou em um sistema de armazenamento apropriado.
7. O sistema atualiza a foto de perfil do usuário com a nova imagem.
8. O sistema exibe uma mensagem de confirmação de que a foto de perfil foi atualizada com sucesso.

**Fluxo Alternativo 1** - Formato de imagem inválido:
- 6a. Se a imagem enviada pelo usuário não estiver no formato correto (por exemplo, JPEG, PNG, etc.) ou exceder o tamanho máximo permitido:
- 6b. O sistema exibe uma mensagem de erro informando que o formato ou tamanho da imagem é inválido.
- 6c. O usuário deve selecionar uma imagem que atenda aos requisitos especificados.

**Pós-condições:** A foto de perfil do usuário é atualizada com sucesso com a nova imagem.
