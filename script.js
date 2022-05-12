const portas = [];
const premio = "1";
const lixo = "0";
const fases = {
  "ESCOLHA":0,
  "REVELA_ERRADA":1,
  "TROCA":2,
  "REVELA_CERTA":3,
}

let fase = fases.ESCOLHA;
let portaSelecionada;

function escolhe_porta(){
  if(fase !== fases.ESCOLHA){
    return;
  }
  portaSelecionada = this.index;
  revela_uma_porta_sem_premio();
}

function cria_porta(){
  let porta = document.createElement("div");
  portas.push(porta);
  porta.setAttribute('class', 'porta');
  porta.index = portas.length-1;
  porta.conteudo = lixo;
  porta.addEventListener("click", escolhe_porta);
  document.getElementById("portas").appendChild(porta);
}

function adiciona_premio_a_porta(porta){
  porta.conteudo = premio;
}

function escolhe_aleatorio(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function revela_uma_porta_sem_premio(){
  fase = fases.REVELA_ERRADA;
  let resultadosPossiveis = [];
  for(let i = 0;i < portas.length;i++){
    if(i != portaSelecionada && portas[i].conteudo === lixo){
      resultadosPossiveis.push(i);
    }
  }
  portas[escolhe_aleatorio(resultadosPossiveis)].innerHTML = lixo;
  trocar_porta_escolhida();
}

function trocar_porta_escolhida(){
  fase = fases.TROCA;
  document.getElementById("escolhaTroca").style.display = "initial";
}

cria_porta();
cria_porta();
cria_porta();
adiciona_premio_a_porta(escolhe_aleatorio(portas));