# DevTech — Gestão de Funcionários

Sistema acadêmico com HTML, JavaScript, Bootstrap 5.3.9 e Docker/Nginx.
Interface responsiva verde (#004643) e bege (#F0EDE5), com cores nas tags HTML e sem arquivo CSS próprio.

## Funcionalidades
- Cadastro, edição por métodos get/set da classe Funcionario e exclusão com confirmação.
- Cancelamento de edição, busca por nome e filtro por cargo.
- Resumo do total de funcionários, cargos únicos e média salarial.
- Relatórios: salários estritamente acima de R$ 5.000, média salarial, cargos únicos e nomes em maiúsculas.
- Busca ignora acentos e maiúsculas. Cargos equivalentes são agrupados ignorando acentos e maiúsculas.
- Relatórios e resumo consideram todos os registros, independentemente dos filtros.
- Salário permanece como input number. Dados ficam em memória e somem ao atualizar a página.

## Executar
Na pasta do projeto, com Docker Desktop iniciado:

```bash
docker build -t devtech-funcionarios .
docker run -d --name devtech-funcionarios -p 8081:80 devtech-funcionarios
```

Acesse http://localhost:8081. Bootstrap requer internet (CDN).
Se o container antigo já existir, após construir a nova imagem, substitua-o:

```bash
docker stop devtech-funcionarios
docker rm devtech-funcionarios
docker run -d --name devtech-funcionarios -p 8081:80 devtech-funcionarios
```

## Arquivos
index.html, script.js, puc-goias.svg, Dockerfile e README.md.

## Conferência
Cadastre Ana, 20, Desenvolvedor, 6000 e Bruno, 30, Analista, 4000.
Espere total 2, cargos 2 e média R$ 5.000,00. Apenas Ana deve aparecer no relatório acima de R$ 5.000.
Teste edição, cancelamento, busca, filtros, exclusão e os quatro relatórios.
