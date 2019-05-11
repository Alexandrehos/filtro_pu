var express    = require('express'),
    bodyParser = require('body-parser'),
    localStorage = require('node-localstorage').LocalStorage;
    
var app = express();

app.set('view engine', 'ejs');
// app.use(require("sanitize").middleware)
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));

var filtro = require("./filtro.js");
var sort = require("./sort.js");
var separa = require("./sortDias.js")

//Rotas:
app.get("/", function(req, res){
    console.log("Temos um acesso | ", Date())
    res.render("entrada");
});

app.post("/diasDisponiveis", function(req, res){
    var entradaTexto = req.body.entradaTexto;
    listaFiltrada = filtro(entradaTexto);
    listaFiltrada["datas"] = sort(listaFiltrada["datas"])
    console.log("2a etapa acessada | ", Date())
    res.render("diasDisponiveis",{listaFiltrada: listaFiltrada, entradaTexto: entradaTexto});
});

app.post("/tabelas", function(req, res){
    var setoresEdias = req.body.setoresEdias,
        entradaTexto = req.body.entradaTexto;
    listaFiltrada = filtro(entradaTexto);
    listaDias = separa.dias(setoresEdias)
    listaStatus = separa.status(setoresEdias)
    console.log("3a etapa acessada | ", Date())
    // console.log(setoresEdias)
    // console.log(listaStatus, "e aqui a lista de Dias: ", listaDias)
    res.render("tabelas", {listaDias: listaDias, listaStatus: listaStatus, listaFiltrada: listaFiltrada});
});



app.get("*",function(req, res){ 
    res.send("Ta errado, isso não existe :(");
});

// app.listen(process.env.PORT, process.env.IP, function () {
//     console.log("Servidor foi iniciado!!")
// });
const http = require('http');

const hostname = '0.0.0.0';
const port = 12674;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
});

app.listen(port, hostname, ()=> {
    console.log(`Servidor foi iniciado em http://${hostname}:${port}/`);
});