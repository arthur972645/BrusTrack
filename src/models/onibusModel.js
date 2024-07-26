import conn from "../config/conn.js";

const tableOnibus = /*sql*/ `
    CREATE TABLE IF NOT EXISTS onibus(
        id_onibus int primary key not null,
        placa varchar(255) not null,
        modelo varchar(255) not null,
        ano_fabricacao int not null,
        capacidade int not null,
        id_linha int not null,
        id_motorista int not null,

        foreign key(id_linha) references linhaOnibus(id_linha),
        foreign key(id_motorista) references motorista(id_motorista)
    );
`;

conn.query(tableOnibus, (err, result, field) => {
    if(err){
        console.error("erro ao criar a tabela" +err.stack)
        return
    }

    console.log("Tabela [onibus] criada com sucesso!")
})