import "dotenv/config"
import mysql from "mysql2"

const conn = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
});
export default conn

//FUNCÃO DESSA PASTA (1 parte):
    /*-Sua função é armazena configurações e arquivos de inicialização
    da aplicação, com a configuração do banco de dados*/