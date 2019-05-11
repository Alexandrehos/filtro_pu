var dias = function(entrada){
        return(entrada.match(/[0-9]+\/[0-9]+/g));
    },
    status = function(entrada){
        return(entrada.match(/[a-z]+/g));
    };
var separa = {
    dias: dias,
    status: status
};

module.exports = separa