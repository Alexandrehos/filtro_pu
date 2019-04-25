function sort(dias){
  var procura = "0,2"
  for(i=0; i<2; i++){
    var temp = true;
    contadorFinal = dias.length - 1;
    contadorInicial = 0;
    while(temp == true){
      if(dias[contadorInicial].slice(procura) < dias[contadorInicial+1].slice(procura)){
        maior = dias[contadorInicial+1];
        menor = dias[contadorInicial];
        dias.splice(contadorInicial, 1, maior)
        dias.splice(contadorInicial+1, 1, menor)
        contadorInicial = -1;
      }
      contadorInicial += 1;
      if(contadorInicial == contadorFinal){
        temp = false;
        procura = "-2";
      }
    }
  }
  return dias;
}

module.exports = sort