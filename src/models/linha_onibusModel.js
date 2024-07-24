//FUNÇÃO DA PASTA MODELS (2 parte):
    /*-Sua função é definir a estrutura dos dados e interagir
    com o banco de dados, ou seja, vou estar criando a tabela no banco de dados*/

import conn from "../config/conn.js"

const tableLinhaOnibus = /*sql*/ `
    CREATE TABLE IF NOT EXISTS linhaOnibus(
        id_linha INT PRIMARY KEY not null,
        nome_linha VARCHAR(255) not null,
        numero_linha INT not null,
        intinerario VARCHAR(255) not null
    );
`;

conn.query(tableLinhaOnibus, (err, result, field) => {
    if(err){
        console.error("erro ao criar a tabela" + err.stack)
        return
    }

    console.log("Tabela [Linha de onibus] criada com sucesso!")
})