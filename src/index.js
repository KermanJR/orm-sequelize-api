const express = require('express');
const routes = require('./routes/index.js')


const PORT = 3000;
const app = express();

//busca rotas
routes(app)

app.listen(PORT, (req, res)=>{
    console.log('Servidor aberto na porta http://localhost:3000.');
})

module.exports = app;
