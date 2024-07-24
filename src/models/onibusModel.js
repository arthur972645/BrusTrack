import conn from "../config/conn";

const tableOnibus = /*sql*/ `
    CREATE TABLE IF NOT EXISTS onibus(
        id_onibus int primary key not null,
        placa VARCHAR(255) not null,
        modelo VARCHAR(255) not null,
        ano_fabricacao int not null,
        capacidade int not null,
        id_linha int not null,
        
        foreign key(id_linha) references motorista(id_motorista)
    );
`;

conn.query(tableOnibus, (err, result, field) => {
    if(err){
        console.error("erro ao criar a tabela" +err.stack)
        return
    }

    console.log("Tabela [onibus] criada com sucesso!")
})