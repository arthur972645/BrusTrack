import conn from "../config/conn.js"

const tableMotorista = /*sql*/ `
    CREATE TABLE IF NOT EXISTS motorista(
        id_motorista INT PRIMARY key not null,
        nome varchar(255) not null,
        data_nascimento DATE,
        numero_carteira_habilitacao varchar(255) not null
    );
`;
conn.query(tableMotorista, (err, result,  field) => {
    if(err){
        console.error("erro ao criar a tabela" + err.stack)
    }

    console.log("Tabela [Motorista] criada com sucesso")
})