function filtro(textoInicial) {
    var datas = [],
        final = {},
        setores = {
            'Bronze ou Prata R$14.': 'Br/Pr até 12',
            'Bronze ou PrataR$14.':  'Br/Pr até 12',
            'Ouro R$19.': 'Ouro até 12',
            'OuroR$19.': 'Ouro até 12',
            'Bronze R$23.': 'Bronze',
            'BronzeR$23.': 'Bronze',
            'Prata R$31.': 'Prata',
            'PrataR$31.': 'Prata',
            'Ouro R$39.': 'Ouro',
            'OuroR$39.': 'Ouro'
        },
        linhasSeparadas = textoInicial.match(/\d+\/\d.+\$.+/g);
    
    for (i = 0; i < linhasSeparadas.length; i++) {
        // Pega uma linha por vez para trabalhar:
        linhaAtual = linhasSeparadas[i];
        // Separa o dia da linha:
        var dia = linhaAtual.slice(0, 5);
        // Verifica se a saida já tem aquele dia, caso não tenha, add ele
        if (!(dia in final)) {
            final[dia] = {};
        }
        // Aqui ele tira o horario da linha:
        var hora = limpaHora(linhaAtual.match(/\d+[:|h]\d?/)[0]);
        // Novamente o mesmo processo de verificar se ja existe:
        if (!(hora in final[dia])) {
            final[dia][hora] = {};
        }
        // Aqui separamos o setor da linha
        setor = setores[linhaAtual.match(/[B-P].+R\$\d+\./)[0]];
        // por fim a quantidade
        quantidadeTemp = linhaAtual.slice(linhaAtual.match(/\.90/)['index'] + 3);
        cupons = limpaQuantidade(quantidadeTemp);
        if (!(setor in final[dia][hora])) {
            final[dia][hora][setor] = cupons;
        }
        // Aqui adicionamos uma lista apenas com as datas, usada pra construir as paginas
        if (!datas.includes(dia)) {
            datas.push(dia);
        }
    }
    final.datas = datas;
    return final;
}

function limpaHora(hora) {
    hora = hora.replace(/h/, ':');
    if (hora.length == 3) {
        hora += '00';
    } else {
        hora += '0';
    }
    return hora;
}
 
function limpaQuantidade(quantidade) {
    qtdeInt = quantidade.match(/\d+/g);
    if(qtdeInt.length > 1){
        return separaLegacy(qtdeInt)
    } else {
        return separaNovo(qtdeInt)
    }
}

function separaNovo(qtdeInt){
    if(qtdeInt[0].length === 3){
        cuponsFinal = {
            gerados: Number(qtdeInt[0][0]),
            cancelados: Number(qtdeInt[0][1]),
            usados: Number(qtdeInt[0][2]),
            validos: qtdeInt[0][0] - qtdeInt[0][1] - qtdeInt[0][2]
        };
        return cuponsFinal
    } else if(qtdeInt[0].length === 4) {
        cuponsFinal = {
            gerados: Number(qtdeInt[0].slice(0,2)),
            cancelados: Number(qtdeInt[0][2]),
            usados: Number(qtdeInt[0][3]),
            validos: qtdeInt[0].slice(0,2) - qtdeInt[0][2] - qtdeInt[0][3]
        };
        return cuponsFinal
    } else if(qtdeInt[0].length === 5) {
        cuponsFinal = {
            gerados: Number(qtdeInt[0].slice(0,2)),
            cancelados: Number(qtdeInt[0][2]),
            usados: Number(qtdeInt[0].slice(-2)),
            validos: qtdeInt[0].slice(0,2) - qtdeInt[0][2] - qtdeInt[0].slice(-2)
        };
        return cuponsFinal
    } else if(qtdeInt[0].length === 6) {
        cuponsFinal = {
            gerados: Number(qtdeInt[0].slice(0,2)),
            cancelados: Number(qtdeInt[0].slice(2,-2)),
            usados: Number(qtdeInt[0].slice(-2)),
            validos: qtdeInt[0].slice(0,2) - qtdeInt[0].slice(2,-2) - qtdeInt[0].slice(-2)
        };
        return cuponsFinal
    } else if(qtdeInt[0].length === 7) {
        cuponsFinal = {
            gerados: Number(qtdeInt[0].slice(0,2)),
            cancelados: Number(qtdeInt[0].slice(2,-2)),
            usados: Number(qtdeInt[0].slice(-2)),
            validos: qtdeInt[0].slice(0,2) - qtdeInt[0].slice(2,-2) - qtdeInt[0].slice(-2)
        };
        console.log(qtdeInt[0], cuponsFinal)
    }
}

function separaLegacy(qtdeInt){
    for (a = 0; a < qtdeInt.length; a++) {
        qtdeInt[a] = parseInt(qtdeInt[a]);
    }
    cuponsFinal = {
        gerados: qtdeInt[0],
        cancelados: qtdeInt[1],
        usados: qtdeInt[2],
        validos: qtdeInt[0] - qtdeInt[2] - qtdeInt[1]
    };
    return cuponsFinal;
}

function jaExiste(temIsso, nisso){
    if(!(temIsso in nisso)){
        nisso[temIsso] = {};
    }
}

module.exports = filtro