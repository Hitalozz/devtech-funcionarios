// CLASSE FUNCIONARIO
class Funcionario {
    constructor(id, nome, idade, cargo, salario) {
        this.id = id;
        this.setNome(nome);
        this.setIdade(idade);
        this.setCargo(cargo);
        this.setSalario(salario);
    }

    getNome() {
        return this.nome;
    }

    setNome(nome) {
        this.nome = nome;
    }

    getIdade() {
        return this.idade;
    }

    setIdade(idade) {
        this.idade = idade;
    }

    getCargo() {
        return this.cargo;
    }

    setCargo(cargo) {
        this.cargo = cargo;
    }

    getSalario() {
        return this.salario;
    }

    setSalario(salario) {
        this.salario = salario;
    }

    toString() {
        return `${this.getNome()} | Idade: ${this.getIdade()} | Cargo: ${this.getCargo()} | Salário: ${formatarMoeda(this.getSalario())}`;
    }
}

// DADOS EM MEMÓRIA
let funcionarios = [];
let proximoId = 1;
let idEdicao = null;
let relatorioAtual = null;

// ELEMENTOS DO HTML
const formulario = document.getElementById("formulario-funcionario");
const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("idade");
const campoCargo = document.getElementById("cargo");
const campoSalario = document.getElementById("salario");
const tabelaFuncionarios = document.getElementById("tabela-funcionarios");
const botaoSalvar = document.getElementById("botao-salvar");
const resultadoRelatorio = document.getElementById("resultado-relatorio");

// FORMATAÇÃO MONETÁRIA
const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
};

// BUSCA COM ARROW FUNCTION
const buscarFuncionario = (id) => {
    return funcionarios.find((funcionario) => funcionario.id === id);
};

// ATUALIZAÇÃO PELOS MÉTODOS DA CLASSE
const atualizarFuncionario = (id, nome, idade, cargo, salario) => {
    const funcionario = buscarFuncionario(id);

    if (!funcionario) {
        return false;
    }

    funcionario.setNome(nome);
    funcionario.setIdade(idade);
    funcionario.setCargo(cargo);
    funcionario.setSalario(salario);

    return true;
};

// LIMPAR FORMULÁRIO
function limparFormulario() {
    formulario.reset();
    idEdicao = null;
    botaoSalvar.textContent = "Cadastrar";
    campoNome.focus();
}

// MOSTRAR FUNCIONÁRIOS NA TABELA
function renderizarFuncionarios() {
    tabelaFuncionarios.textContent = "";

    funcionarios.forEach((funcionario) => {
        const linha = document.createElement("tr");

        const dados = [
            funcionario.getNome(),
            funcionario.getIdade(),
            funcionario.getCargo(),
            formatarMoeda(funcionario.getSalario())
        ];

        dados.forEach((valor) => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const celulaAcoes = document.createElement("td");

        const botaoEditar = document.createElement("button");
        botaoEditar.type = "button";
        botaoEditar.textContent = "Editar";

        // Evento onclick com função anônima.
        botaoEditar.onclick = function () {
            editarFuncionario(funcionario.id);
        };

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.onclick = function () {
            excluirFuncionario(funcionario.id);
        };

        celulaAcoes.appendChild(botaoEditar);
        celulaAcoes.appendChild(botaoExcluir);
        linha.appendChild(celulaAcoes);
        tabelaFuncionarios.appendChild(linha);
    });

    if (relatorioAtual !== null) {
        exibirRelatorio(relatorioAtual);
    }
}

// CARREGAR FUNCIONÁRIO PARA EDIÇÃO
const editarFuncionario = (id) => {
    const funcionario = buscarFuncionario(id);

    if (!funcionario) {
        return;
    }

    campoNome.value = funcionario.getNome();
    campoIdade.value = funcionario.getIdade();
    campoCargo.value = funcionario.getCargo();
    campoSalario.value = funcionario.getSalario();

    idEdicao = id;
    botaoSalvar.textContent = "Salvar alterações";
    campoNome.focus();

    console.log("Editando funcionário:", funcionario.getNome());
};

// EXCLUSÃO COM FILTER E ARROW FUNCTION
const excluirFuncionario = (id) => {
    funcionarios = funcionarios.filter(
        (funcionario) => funcionario.id !== id
    );

    if (idEdicao === id) {
        limparFormulario();
    }

    renderizarFuncionarios();
    console.log("Funcionário excluído com sucesso!");
};

// VALIDAR E SALVAR OS DADOS
const salvarFuncionario = () => {
    if (!formulario.reportValidity()) {
        return;
    }

    const nome = campoNome.value.trim();
    const idade = Number(campoIdade.value);
    const cargo = campoCargo.value.trim();
    const salario = Number(campoSalario.value);

    if (nome === "") {
        alert("Digite o nome do funcionário.");
        campoNome.focus();
        return;
    }

    if (!Number.isInteger(idade) || idade < 1) {
        alert("Digite uma idade inteira maior que zero.");
        campoIdade.focus();
        return;
    }

    if (cargo === "") {
        alert("Digite o cargo do funcionário.");
        campoCargo.focus();
        return;
    }

    if (
        campoSalario.value === "" ||
        !Number.isFinite(salario) ||
        salario < 0
    ) {
        alert("Digite um salário válido, maior ou igual a zero.");
        campoSalario.focus();
        return;
    }

    if (idEdicao === null) {
        const funcionario = new Funcionario(
            proximoId,
            nome,
            idade,
            cargo,
            salario
        );

        funcionarios.push(funcionario);
        proximoId++;

        console.log("Funcionário cadastrado com sucesso!");
    } else {
        const atualizado = atualizarFuncionario(
            idEdicao,
            nome,
            idade,
            cargo,
            salario
        );

        if (!atualizado) {
            alert("Funcionário não encontrado.");
            return;
        }

        console.log("Alterações salvas com sucesso!");
    }

    renderizarFuncionarios();
    limparFormulario();
};

// CLIQUE COM FUNÇÃO ANÔNIMA
botaoSalvar.onclick = function (evento) {
    evento.preventDefault();
    salvarFuncionario();
};

// Também permite enviar o formulário pela tecla Enter.
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    salvarFuncionario();
});

// RELATÓRIOS
function exibirRelatorio(tipo) {
    relatorioAtual = tipo;

    if (funcionarios.length === 0) {
        resultadoRelatorio.textContent =
            "Cadastre pelo menos um funcionário para gerar relatórios.";
        return;
    }

    let texto = "";

    switch (tipo) {
        case "salarios-altos": {
            const selecionados = funcionarios.filter(
                (funcionario) => funcionario.getSalario() > 5000
            );

            texto = selecionados.length > 0
                ? "Funcionários com salário acima de R$ 5.000:\n" +
                  selecionados
                      .map((funcionario) => funcionario.toString())
                      .join("\n")
                : "Nenhum funcionário recebe acima de R$ 5.000.";

            break;
        }

        case "media-salarial": {
            const soma = funcionarios.reduce(
                (total, funcionario) =>
                    total + funcionario.getSalario(),
                0
            );

            const media = soma / funcionarios.length;
            texto = `Média salarial: ${formatarMoeda(media)}`;
            break;
        }

        case "cargos": {
            const cargos = funcionarios.map(
                (funcionario) => funcionario.getCargo()
            );

            const cargosUnicos = [...new Set(cargos)];

            texto = "Cargos sem repetição:\n" +
                cargosUnicos.join("\n");

            break;
        }

        case "nomes": {
            const nomes = funcionarios.map(
                (funcionario) => funcionario.getNome().toUpperCase()
            );

            texto = "Nomes em maiúsculas:\n" + nomes.join("\n");
            break;
        }
    }

    resultadoRelatorio.textContent = texto;
}

// EVENTOS DOS RELATÓRIOS
const botoesRelatorios = {
    "btn-salarios-altos": "salarios-altos",
    "btn-media-salarial": "media-salarial",
    "btn-cargos": "cargos",
    "btn-nomes": "nomes"
};

Object.entries(botoesRelatorios).forEach(([id, tipo]) => {
    document.getElementById(id).onclick = function () {
        exibirRelatorio(tipo);
    };
});

// INICIALIZAÇÃO
renderizarFuncionarios();