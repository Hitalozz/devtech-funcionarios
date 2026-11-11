# DevTech — Gestão de Funcionários

Projeto acadêmico desenvolvido com HTML, JavaScript e Docker.
- Hitalo Augusto Lourenço Guedes
- MAtricula: 20241002803983

## Funcionalidades

- Cadastro, listagem, edição e exclusão de funcionários.
- Classe Funcionario com construtor, métodos get/set e toString().
- Atualização dos atributos pelos métodos da classe.
- Eventos com funções anônimas e manipulação de dados com arrow functions.

## Relatórios

- Funcionários com salário acima de R$ 5.000.
- Média salarial.
- Cargos sem repetição.
- Nomes dos funcionários em maiúsculas.

## Tecnologias

HTML, JavaScript, Docker e Nginx.

## Como executar

Com o Docker instalado e iniciado, execute na pasta do projeto:

```bash
docker build -t devtech-funcionarios .
docker run -d --name devtech-funcionarios -p 8081:80 devtech-funcionarios
```

Acesse: http://localhost:8081

Se o container já existir e estiver parado:

```bash
docker start devtech-funcionarios
```

## Armazenamento

Os dados ficam em um array na memória do navegador.
Ao atualizar ou fechar a página, os cadastros são perdidos.

## Arquivos

- index.html: formulário, tabela e botões dos relatórios.
- script.js: classe Funcionario, cadastro, edição, exclusão e relatórios.
- Dockerfile: configuração do servidor Nginx.
- README.md: documentação do projeto.