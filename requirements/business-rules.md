# Regras de Negócio

## RN01 - Autenticação de Usuário

- Os usuários só podem acessar o sistema após uma autenticação bem-sucedida com um nome de usuário e senha válidos.

## RN02 - Cadastro de Usuário

- O sistema deve validar a unicidade do CPF e do endereço de e-mail para evitar registros duplicados.
- A senha do usuário deve ser armazenada de forma criptografada.
- Os dados obrigatórios para o cadastro são: nome completo, CPF, data de nascimento, número de telefone, endereço (bairro, cidade, estado e país), endereço de e-mail e senha.
- Não deve ser possível que pessoas menores de 18 anos se cadastrem no sistema.

## RN03 - Recuperação de Senha

- O link de redefinição de senha deve ser temporário e expirar após um período de duas horas.

## RN04 - Listagem de Animais

- Animais com status “adotado” não devem ser listados na listagem principal de animais.
- Os usuários podem acessar a listagem de animais sem estarem autenticados.
- Os filtros disponíveis são: espécie, raça, idade, sexo, porte, temperamento, cor da pelagem e distância.

## RN05 - Demonstração de Interesse em um Animal

- A notificação enviada ao dono do animal deve conter o nome, telefone e e-mail do usuário que demonstrou interesse.
- Ao demonstrar interesse, o usuário deve ter acesso ao nome, telefone e e-mail do dono do animal.

## RN06 - Cadastro de Animais

- Os dados obrigatórios para o cadastro de animais são: nome do animal, fotos, espécie (cachorro ou gato), raça, sexo, idade, porte, temperamento, cor da pelagem, peso, vacinação, vermifugação, castração.
- Não deve ser permitido cadastrar mais do que 3 fotos por animal.

## RN07 - Alteração de Dados do Animal Cadastrado pelo Usuário

- Os usuários só podem fazer alterações nos dados de animais que eles próprios cadastraram.

## RN08 - Marcar Animal como "Adotado"

- A ação de marcar um animal como "Adotado" não pode ser desfeita.
