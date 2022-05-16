const portas = [];
const premio = "💰";
const lixo = "💩";
const fases = {
  "ESCOLHA":0,
  "REVELA_ERRADA":1,
  "TROCA":2,
  "REVELA_CERTA":3,
}

let fase = fases.ESCOLHA;
let portaSelecionada;
let portaRevelada;

function escolhe_porta(){
  if(fase !== fases.ESCOLHA){
    return;
  }
  portaSelecionada = this;
  this.classList.add('portaEscolhida');
  revela_porta_sem_premio();
}

function cria_porta(){
  let porta = document.createElement("div");
  portas.push(porta);
  porta.classList.add('porta');
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

function revela_porta_sem_premio(){
  fase = fases.REVELA_ERRADA;
  let resultadosPossiveis = [];
  for(let i = 0;i < portas.length; i++){
    if(portas[i] != portaSelecionada && portas[i].conteudo === lixo){
      resultadosPossiveis.push(i);
    }
  }
  let portaAleatoria = escolhe_aleatorio(resultadosPossiveis);
  portaRevelada = portas[portaAleatoria];
  portaRevelada.innerHTML = lixo;
  //portaRevelada.classList.add('portaErrada');
  pergunta_se_deve_trocar_porta();
}

function pergunta_se_deve_trocar_porta(){
  fase = fases.TROCA;
  document.getElementById("escolhaTroca").style.display = "initial";
}

function trocar_porta_escolhida(){
  if(fase !== fases.TROCA){
    return;
  }
  document.getElementById("escolhaTroca").style.display = "none";
  for(let i = 0; i < portas.length; i++){
    if(i!== portaSelecionada.index && i!== portaRevelada.index){
      portaSelecionada.classList.remove('portaEscolhida');
      portaSelecionada = portas[i];
      portaSelecionada.classList.add('portaEscolhida');
      break;
    }
  }
  revela_portas();
}

function revela_portas(){
  fase = fases.REVELA_CERTA;
  document.getElementById("escolhaTroca").style.display = "none";
  for(let i = 0; i < portas.length; i++){
    portas[i].innerHTML = portas[i].conteudo;
  }
  analisa_vitoria();
}

function analisa_vitoria(){
  if(portaSelecionada.conteudo === premio){
    portaSelecionada.classList.add('portaCerta');
    document.getElementById("recomecarParagrafo").innerHTML = "VOCÊ VENCEU!";
  }
  else{
    portaSelecionada.classList.add('portaErrada');
    document.getElementById("recomecarParagrafo").innerHTML = "VOCÊ PERDEU!";
  }
  document.getElementById("recomecar").style.display = "initial";
}

function reverter_para_comeco(){
  for(let i = 0; i < portas.length; i++){
    portas[i].setAttribute("class","porta");
    portas[i].innerHTML = "";
    portas[i].conteudo = lixo;
  }
  document.getElementById("recomecar").style.display = "none";
  document.getElementById("escolhaTroca").style.display = "none";
  adiciona_premio_a_porta(escolhe_aleatorio(portas));
  fase = fases.ESCOLHA;
}


document.getElementById("recomecarBotao").addEventListener("click", reverter_para_comeco);
document.getElementById("trocaSim").addEventListener("click", trocar_porta_escolhida);
document.getElementById("trocaNao").addEventListener("click", revela_portas);
for(let p = 0; p < 3; p++){
  cria_porta();
}
reverter_para_comeco();