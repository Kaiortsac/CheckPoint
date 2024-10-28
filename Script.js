// Atualiza a data e hora atuais
function atualizarDataHora() {
    const currentDateTime = new Date().toLocaleString("pt-BR", {
        dateStyle: "full",
        timeStyle: "medium",
    });
    document.getElementById("currentDateTime").innerText = currentDateTime;
}
setInterval(atualizarDataHora, 1000);

// Função para definir o máximo da data para hoje e impedir datas futuras
function validarData() {
    const dataPonto = document.getElementById("dataPonto");
    const today = new Date().toISOString().split("T")[0]; 
    dataPonto.setAttribute("max", today);
}

// Armazena os registros de ponto no LocalStorage
function registrarPonto(tipo) {
    const dataPontoInput = document.getElementById("dataPonto").value;
    const dataPonto = dataPontoInput ? new Date(dataPontoInput) : new Date(); // Data selecionada ou data atual

    if (dataPonto > new Date()) {
        alert("Não é permitido registrar ponto em data futura.");
        return;
    }

    const registros = JSON.parse(localStorage.getItem("registros") || "[]");
    const novoRegistro = {
        tipo,
        dataHora: dataPonto.toISOString(),
        observacao: null,
        justificativa: null,
        passado: dataPonto < new Date().setHours(0, 0, 0, 0), // Marca como passado se for antes de hoje
    };
    registros.push(novoRegistro);
    localStorage.setItem("registros", JSON.stringify(registros));
    alert(`${tipo} registrado com sucesso para a data selecionada.`);
}

// Adicionar observação a um registro
function adicionarObservacao() {
    const observacao = document.getElementById("observacao").value;
    if (!observacao) return alert("Observação não pode estar vazia.");

    const registros = JSON.parse(localStorage.getItem("registros"));
    registros[registros.length - 1].observacao = observacao;
    localStorage.setItem("registros", JSON.stringify(registros));
    alert("Observação adicionada ao registro.");
}

// Justifica ausência com upload de arquivo
function justificarAusencia() {
    const justificativa = document.getElementById("justificativa").value;
    const arquivo = document.getElementById("arquivoJustificativa").files[0];
    if (!justificativa || !arquivo) return alert("Complete todos os campos.");

    const registros = JSON.parse(localStorage.getItem("registros"));
    const novoRegistro = {
        tipo: "ausencia",
        dataHora: new Date().toISOString(),
        justificativa,
        arquivo: arquivo.name,
    };
    registros.push(novoRegistro);
    localStorage.setItem("registros", JSON.stringify(registros));
    alert("Justificativa registrada com sucesso.");
}

// Visualiza o relatório de registros
function visualizarRelatorio() {
    window.location.href = "relatorio.html";
}
