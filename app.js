var express    = require('express'),
    bodyParser = require('body-parser'),
    localStorage = require('node-localstorage').LocalStorage;
    
var app = express();

app.set('view engine', 'ejs');
// app.use(require("sanitize").middleware)
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));

var filtro = require("./filtro.js");

//Rotas:
app.get("/", function(req, res){
    res.render("entrada");
});

app.post("/diasDisponiveis", function(req, res){
    var entradaTexto = req.body.entradaTexto;
    listaFiltrada = filtro(entradaTexto);
    res.render("diasDisponiveis",{listaFiltrada: listaFiltrada, entradaTexto: entradaTexto});
});

app.post("/tabelas", function(req, res){
    var listaStatus = Object.keys(req.body.status),
        listaDias = Object.keys(req.body.diasEscolhidos),
        entradaTexto = req.body.entradaTexto;
    listaFiltrada = filtro(entradaTexto);
    // console.log(listaFiltrada["07/04"]["15:00"]["Br/Pr até 12"]["Gerados"], listaStatus)
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
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
});

app.listen(port, hostname, ()=> {
    console.log(`Servidor foi iniciado em http://${hostname}:${port}/`);
});
