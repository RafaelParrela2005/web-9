function obterTarefasDoLocalStorage() {
    const tarefas = localStorage.getItem('tarefas');
    return tarefas ? JSON.parse(tarefas) : [];
}

function salvarTarefasNoLocalStorage(tarefas) {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function adicionarTarefa(tarefa) {
    const tarefas = obterTarefasDoLocalStorage();
    tarefas.push({ texto: tarefa, concluida: false });
    salvarTarefasNoLocalStorage(tarefas);
    renderizarTarefas();
}

function removerTarefa(indice) {
    if (!confirm('Deseja realmente remover esta tarefa?')) return;
    const tarefas = obterTarefasDoLocalStorage();
    tarefas.splice(indice, 1);
    salvarTarefasNoLocalStorage(tarefas);
    renderizarTarefas();
}

function alternarConclusaoTarefa(indice) {
    const tarefas = obterTarefasDoLocalStorage();
    tarefas[indice].concluida = !tarefas[indice].concluida;
    salvarTarefasNoLocalStorage(tarefas);
    renderizarTarefas();
}

function limparConcluidas() {
    let tarefas = obterTarefasDoLocalStorage();
    tarefas = tarefas.filter(t => !t.concluida);
    salvarTarefasNoLocalStorage(tarefas);
    renderizarTarefas();
}

let filtroAtual = 'todas';

function filtrarTarefas(filtro) {
    filtroAtual = filtro;
    renderizarTarefas();
}

function renderizarTarefas() {
    const tarefas = obterTarefasDoLocalStorage();
    const listaTarefas = document.getElementById('listaTarefas');
    listaTarefas.innerHTML = '';

    const tarefasFiltradas = tarefas.filter(t => {
        if (filtroAtual === 'pendentes') return !t.concluida;
        if (filtroAtual === 'concluidas') return t.concluida;
        return true;
    });

    tarefasFiltradas.forEach((tarefa, indice) => {
        const li = document.createElement('li');
        li.className = tarefa.concluida ? 'concluida' : '';

        li.innerHTML = `
            <span>${tarefa.texto}</span>
            <div class="acoes">
                <button onclick="alternarConclusaoTarefa(${indice})" title="Concluir">
                    <i class="fa-solid ${tarefa.concluida ? 'fa-rotate-left' : 'fa-check'}"></i>
                </button>
                <button onclick="removerTarefa(${indice})" title="Remover">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        listaTarefas.appendChild(li);
    });

    atualizarContador();
}

function atualizarContador() {
    const tarefas = obterTarefasDoLocalStorage();
    const pendentes = tarefas.filter(t => !t.concluida).length;
    document.getElementById('contadorPendentes').textContent = `${pendentes} tarefa(s) pendente(s)`;
}

document.getElementById('entradaTarefa').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const entradaTarefa = document.getElementById('entradaTarefa');
        const textoTarefa = entradaTarefa.value.trim();

        if (textoTarefa) {
            adicionarTarefa(textoTarefa);
            entradaTarefa.value = '';
        }
    }
});

renderizarTarefas();
