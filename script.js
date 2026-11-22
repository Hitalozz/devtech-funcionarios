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

// ELEMENTOS DA INTERFACE BOOTSTRAP
const busca = document.getElementById("busca-funcionario");
const filtro = document.getElementById("filtro-cargo");
const cancelar = document.getElementById("botao-cancelar");
const titulo = document.getElementById("titulo-formulario");
const normalizar = (texto) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

function mostrarMensagem(texto) {
    const area = document.getElementById("mensagem-sistema");
    const alerta = document.createElement("div");
    alerta.className = "alert alert-success";
    alerta.textContent = texto;
    area.replaceChildren(alerta);
}

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
    cancelar.hidden = true;
    titulo.textContent = "Cadastrar funcionário";
    idEdicao = null;
    botaoSalvar.textContent = "Cadastrar";
    campoNome.focus();
}

// MOSTRAR FUNCIONÁRIOS NA TABELA
function renderizarFuncionarios() {
    tabelaFuncionarios.textContent = "";

    atualizarResumoEFiltro();
    const resultados = funcionarios.filter((f) =>
        normalizar(f.getNome()).includes(normalizar(busca.value)) &&
        (!filtro.value || normalizar(f.getCargo()) === filtro.value)
    );
    document.getElementById("contador-resultados").textContent =
        `Exibindo ${resultados.length} de ${funcionarios.length} funcionários.`;
    if (!resultados.length) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");
        celula.colSpan = 5;
        celula.className = "text-center py-5";
        celula.textContent = funcionarios.length ? "Nenhum resultado. Altere a busca ou o filtro." : "Nenhum funcionário cadastrado. Comece pelo formulário.";
        linha.append(celula);
        tabelaFuncionarios.append(linha);
    }

    resultados.forEach((funcionario) => {
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
        celulaAcoes.className = "text-nowrap";

        const botaoEditar = document.createElement("button");
        botaoEditar.type = "button";
        botaoEditar.textContent = "Editar";
        botaoEditar.className = "btn btn-sm btn-outline-dark";
        botaoEditar.setAttribute("aria-label", `Editar ${funcionario.getNome()}`);

        // Evento onclick com função anônima.
        botaoEditar.onclick = function () {
            editarFuncionario(funcionario.id);
        };

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "btn btn-sm btn-outline-danger ms-2";
        botaoExcluir.setAttribute("aria-label", `Excluir ${funcionario.getNome()}`);

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
    campoSalario.value = funcionario.getSalario().toFixed(2);
    cancelar.hidden = false;
    titulo.textContent = "Editar funcionário";

    idEdicao = id;
    botaoSalvar.textContent = "Salvar alterações";
    campoNome.focus();

    console.log("Editando funcionário:", funcionario.getNome());
};

// EXCLUSÃO COM FILTER E ARROW FUNCTION
const excluirFuncionario = (id) => {
    const funcionario = buscarFuncionario(id);
    if (!funcionario || !window.confirm(`Excluir ${funcionario.getNome()}? Esta ação não pode ser desfeita.`)) return;
    funcionarios = funcionarios.filter(
        (funcionario) => funcionario.id !== id
    );

    if (idEdicao === id) {
        limparFormulario();
    }

    renderizarFuncionarios();
    mostrarMensagem("Funcionário excluído com sucesso!");
    busca.focus();
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

        mostrarMensagem("Funcionário cadastrado com sucesso!");
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

        mostrarMensagem("Alterações salvas com sucesso!");
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
    Object.entries(botoesRelatorios).forEach(([id, valor]) => {
        const botao = document.getElementById(id);
        botao.classList.toggle("active", valor === tipo);
        botao.setAttribute("aria-pressed", String(valor === tipo));
    });

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

            const cargosUnicos = [...new Set(cargos.map(normalizar))]
                .map((chave) => cargos.find((cargo) => normalizar(cargo) === chave));

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

// RESUMO, BUSCA E FILTRO (os relatórios usam todos os funcionários)
function atualizarResumoEFiltro() {
    const cargos = new Map();
    funcionarios.forEach((f) => {
        const chave = normalizar(f.getCargo());
        if (!cargos.has(chave)) cargos.set(chave, f.getCargo());
    });
    const selecionado = filtro.value;
    filtro.replaceChildren(new Option("Todos os cargos", ""));
    [...cargos].sort((a, b) => a[1].localeCompare(b[1], "pt-BR"))
        .forEach(([valor, texto]) => filtro.add(new Option(texto, valor)));
    filtro.value = cargos.has(selecionado) ? selecionado : "";
    document.getElementById("total-funcionarios").textContent = funcionarios.length;
    document.getElementById("total-cargos").textContent = cargos.size;
    document.getElementById("media-salarial").textContent = funcionarios.length
        ? formatarMoeda(funcionarios.reduce((soma, f) => soma + f.getSalario(), 0) / funcionarios.length)
        : "—";
}
busca.addEventListener("input", renderizarFuncionarios);
filtro.addEventListener("change", renderizarFuncionarios);
cancelar.onclick = function () {
    limparFormulario();
    mostrarMensagem("Edição cancelada. Os dados foram mantidos.");
};
campoSalario.addEventListener("blur", function () {
    const valor = Number(campoSalario.value);
    if (campoSalario.value !== "" && Number.isFinite(valor) && valor >= 0) campoSalario.value = valor.toFixed(2);
});
Object.keys(botoesRelatorios).forEach((id) => document.getElementById(id).setAttribute("aria-pressed", "false"));

// Função tradicional: funcionarios.map(function (f) { return f.getNome(); });
// Arrow equivalente: funcionarios.map((f) => f.getNome());

// INICIALIZAÇÃO
renderizarFuncionarios();