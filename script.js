// ==================================================
// MENTORA - SCRIPT.JS
// ==================================================



// ==================================================
// 📝 TAREFAS
// ==================================================

const inputTarefa = document.getElementById("input-tarefa");
const btnAdicionar = document.getElementById("btn-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");


// --------------------------------------------------
// ADICIONAR TAREFA
// --------------------------------------------------

if (btnAdicionar) {

    btnAdicionar.addEventListener("click", adicionarTarefa);

}


function adicionarTarefa() {

    const textoTarefa = inputTarefa.value.trim();

    // Não permite tarefa vazia
    if (textoTarefa === "") {
        return;
    }

    criarTarefa(textoTarefa, false);

    salvarTarefas();

    inputTarefa.value = "";

}



// --------------------------------------------------
// CRIAR TAREFA
// --------------------------------------------------

function criarTarefa(textoTarefa, concluida) {

    const novaTarefa = document.createElement("li");

    const texto = document.createElement("span");

    texto.textContent = textoTarefa;


    // Se a tarefa já estava concluída
    if (concluida) {
        texto.classList.add("concluida");
    }


    // Botão CONCLUIR
    const btnConcluir = document.createElement("button");

    btnConcluir.textContent = "Concluir";


    btnConcluir.addEventListener("click", function() {

        texto.classList.toggle("concluida");

        salvarTarefas();

    });



    // Botão EXCLUIR
    const btnExcluir = document.createElement("button");

    btnExcluir.textContent = "Excluir";


    btnExcluir.addEventListener("click", function() {

        novaTarefa.remove();

        salvarTarefas();

    });



    // Coloca tudo dentro da tarefa
    novaTarefa.appendChild(texto);

    novaTarefa.appendChild(btnConcluir);

    novaTarefa.appendChild(btnExcluir);


    // Coloca a tarefa na lista
    listaTarefas.appendChild(novaTarefa);

}



// --------------------------------------------------
// 💾 SALVAR TAREFAS
// --------------------------------------------------

function salvarTarefas() {

    const tarefas = [];


    listaTarefas.querySelectorAll("li").forEach(function(tarefa) {

        const texto = tarefa.querySelector("span");


        tarefas.push({

            texto: texto.textContent,

            concluida: texto.classList.contains("concluida")

        });

    });


    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

}



// --------------------------------------------------
// 💾 CARREGAR TAREFAS
// --------------------------------------------------

function carregarTarefas() {

    const tarefasSalvas =
        JSON.parse(localStorage.getItem("tarefas")) || [];


    tarefasSalvas.forEach(function(tarefa) {

        criarTarefa(
            tarefa.texto,
            tarefa.concluida
        );

    });

}


// Carrega as tarefas quando a página abre
if (listaTarefas) {

    carregarTarefas();

}



// ==================================================
// 🍅 POMODORO
// ==================================================

const timer = document.getElementById("timer");

const btnStart = document.getElementById("btn-start");

const btnPause = document.getElementById("btn-pause");

const btnReset = document.getElementById("btn-reset");

const btnPausaCurta =
    document.getElementById("btn-pausa-curta");


// 25 minutos em segundos
let tempo = 25 * 60;

let intervalo = null;



// --------------------------------------------------
// ATUALIZAR TIMER
// --------------------------------------------------

function atualizarTimer() {

    const minutos = Math.floor(tempo / 60);

    const segundos = tempo % 60;


    timer.textContent =
        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

}



// --------------------------------------------------
// ▶️ INICIAR
// --------------------------------------------------

if (btnStart) {

    btnStart.addEventListener("click", function() {

        // Impede iniciar vários timers ao mesmo tempo
        if (intervalo !== null) {
            return;
        }


        intervalo = setInterval(function() {

            if (tempo > 0) {

                tempo--;

                atualizarTimer();

            } else {

                clearInterval(intervalo);

                intervalo = null;

                alert(
                    "Tempo encerrado! Hora de fazer uma pausa. 🌿"
                );

            }

        }, 1000);

    });

}



// --------------------------------------------------
// ⏸️ PAUSAR
// --------------------------------------------------

if (btnPause) {

    btnPause.addEventListener("click", function() {

        clearInterval(intervalo);

        intervalo = null;

    });

}



// --------------------------------------------------
// 🔄 RESETAR
// --------------------------------------------------

if (btnReset) {

    btnReset.addEventListener("click", function() {

        clearInterval(intervalo);

        intervalo = null;

        tempo = 25 * 60;

        atualizarTimer();

    });

}



// --------------------------------------------------
// ☕ PAUSA DE 5 MINUTOS
// --------------------------------------------------

if (btnPausaCurta) {

    btnPausaCurta.addEventListener("click", function() {

        clearInterval(intervalo);

        intervalo = null;

        tempo = 5 * 60;

        atualizarTimer();

    });

}



// Atualiza o visor quando a página abre
if (timer) {

    atualizarTimer();

}
