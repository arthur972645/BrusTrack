// Função do Arquivo Server: Ele tem a função de Junstar tudo que foi feito, tipo como no react
import "dotenv/config" // relacionado com o arquivo .env -> vai carregar as variasveis desse arquivo
import express, { request, response } from "express";
import conn from "./config/conn.js" // É nessa parte que eu faço a conexeção com o banco de dados, sem essa parte eu nao vou conseguir criar as tabelas no banco de dados

//IMPORTAÇÃO DOS MODELOS -> é nos models, que tem a contração do banco de dados. ao executar o codigo, ele garante a criação dessas tabelas no banco de daps, para depois vim apartir do back end, colocando os valores
import "./models/linha_onibusModel.js"
import "./models/motoristaModel.js"
import "./models/onibusModel.js"

//IMPORTAÇÃO DAS ROTAS -> é nas rotas que estão os edpoits para cada operação
import linha_onibusRoutes from './routes/linha_onibusRoutes.js'
import motoristaRoutes from './routes/motoristaRoutes.js'
import onibusRoutes from './routes/onibusRoutes.js'

//Configuração do Servidor Express
const app = express()

app.use(express.urlencoded({extended: true})); //Configura o Express para analisar dados de formulário URL-encoded.
app.use(express.json()); //Configura o Express para analisar dados JSON no corpo das requisições.

//Definição das Rotas:
//http://localhost:3333/livros_onibus
app.use("/linha_onibus", linha_onibusRoutes)
//http://localhost:3333/motorista
app.use("/motorista", motoristaRoutes)
//http://localhost:3333/onibus
app.use("/onibus", onibusRoutes)

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log("Servidor rodando na porta:"+PORT)
})