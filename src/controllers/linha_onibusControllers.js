//FUNÇÃO DA PASTA CONTROLLERS (3 parte):
    /*-É nessa pasta que vai conter a lógica, ou seja
    é aqui que a gente vai adicionar, deletar e listaras coisas referentes
    a linha do onibus e depois vamos importa todos esses codigos nas rotas*/

//
import { request, response } from 'express'
import conn from '../config/conn.js'
import {v4 as uuidv4} from "uuid"

//Listar todas as linhas
export const getLinha = (request, response) => {
    const sql = /*sql*/ `SELECT * FROM linhaOnibus`; // fazendo uma consulta com o banco de dados, na tabela linhaonibus, onde eu to selecionado tudo que tem nessa tabela

    conn.query(sql, (err, data) => { //Executa a consulta SQL usando a conexão do banco de dados(conn).
        if(err){ // caso a execução falhe, vai imprimir um erro no cosole
            console.error(err)
            response.status(500).json({msg: "Erro ao listas as linhas de onibus"})
            return //termina a execução da função
        }
        response.status(200).json(data) //se for bem secedida, retorna os dados dos clientes que estão caadstrados no bancode dados
    })

}

//Mostrar a linha pelo id
export const getLinhaid = (request, response) => {
    const { id_linha } = request.params //Estou obtando o valor do id que eu passar na requisição
    console.log(id_linha)
    const sql = /*sql*/ `SELECT * FROM linhaOnibus WHERE ?? = ?` //Consulta sql para para o banco de dados para verificar se o cliente existe ou não
    const isertDate = ["id_linha", id_linha] //Definido os parametros da cosulta, "id_linha" = ?? e id = ?

    conn.query(sql, isertDate, (err, data) => { //Executando a consulsta sql
        if(data.length === 0) { //se essa consulta nao retornar nada, nao existe a linha
            response.status(404).json({msg: "Linha não existe"})
            return
        }
        response.status(200).json(data) //se retornar, vai mostar a linha que foi pedida
    })
}

//Adicionar uma nova linha
export const postLinha = (request, response) => {
    const {nome_linha, numero_linha, intinerario } = request.body //definindo o que vai ter no corpo da requisição
    //Validação para saber se quando eu for adicionar ta tudo certinho
   
    if(!nome_linha){
        response.status(400).json({msg: "O nome da linha é obigatorio"})    
        return
    }
    if(!numero_linha){
        response.status(400).json({msg: "O numero da linha precisa ser informado"})
        return
    }
    if(!intinerario){
        response.status(400).json({msg: "O itinerario precisa ser informado"})
        return
        
    } 

    const checkSql = /*sql*/` SELECT * FROM linhaOnibus WHERE ?? = ?`
    const checkInsertSql = ["numero_linha", numero_linha]
    conn.query(checkSql, checkInsertSql, (err, data) => {
        if(data.length > 0){
            response.status(400).json({msg: "Linha já existente"})
            return
        }
    //O uuidv4 vai gerando id automativo
    //O sql vai inserir os  dados que eu colocar na reuisição 
    
    const id_linha = 0
    const sql = /*sql*/ `INSERT INTO linhaOnibus(??,??,??,??) VALUES(?,?,?,?)` //consulta sql para podermos inserir os dados no banco de dados
    const inserData = [ 
        "id_linha",
        "nome_linha", 
        "numero_linha", 
        "intinerario",  
        id_linha,
        nome_linha,
        numero_linha,
        intinerario
    ] //Definimos os vamores das colunas(entre "") e dos valores das colunas que eu vou colocar na requisição(sem "")
    
    conn.query(sql, inserData, (err, data) => {
        if (err) {
          console.error(err);
          response.status(500).json({ msg: "Erro ao adicionar linha de onibus" });
          return;
        }
        response.status(201).json({ msg: "adicionado" });
      });
    
    })

}
// Editar uma linha pelo id
export const putLinhaid = (request, response) => {
    const { id_linha } = request.params
    console.log(id_linha)
    const { nome_linha, numero_linha,intinerario } = request.body

    if(!nome_linha){
        response.status(400).json({msg: "O nome é obirgatorio"})
        return
    }
    if(!numero_linha){
        response.status(400).json({msg: "O numero da linha é obrigatorio"})
        return
    }
    if(!intinerario){
        response.status(400).json({msg: "O itinerario é obirgatorio"})
        return
    }

    const checkSql = /*sql*/ `SELECT * FROM  linhaOnibus WHERE id_linha = ${id_linha}`
    console.log(checkSql)
    conn.query(checkSql, (err, data,rows, )=> {
      console.log(data,rows)
        if(err){
            console.error(err)
            response.status(500).json({msg: "Erro ao buscar a linha"})
        }
        if(data.length === 0) {
            response.status(404).json({msg: "Linha nao encontrada"})
            return
        }

        const updateSql = /*sql*/ `UPDATE linhaOnibus SET ?? = ? AND ?? = ? AND ?? = ? AND ?? = ?;`
        const inserDate = [
        "id_linha", 
        id_linha, 
        "nome_linha", 
        nome_linha, 
        "numero_linha", 
        numero_linha, 
        "intinerario", 
        intinerario 
      ]
        
        conn.query(updateSql, inserDate, (err) => {
            if(err){
                console.error(err)
                response.status(500).json({msg: "Erro ao atualizar linha"})
            }
            response.status(200).json({msg: "Linha atualizada"})
        })
    })
}

export const updateLinha = async (req, res) => {
    const { id_linha } = req.params;
    const { nome_linha, numero_linha, intinerario } = req.body;
  
    if (!nome_linha || !numero_linha || !intinerario) {
      return res.status(400).json({
        message:
          "Dados incompletos ou inseridos de forma incorreta. Tente novamente.",
      });
    }
  
    try {
      const existingRow = conn
        .query(
          "SELECT id_linha FROM linhaOnibus WHERE nome_linha = ? AND id_linha = ?",
          [nome_linha, numero_linha]
        );
  
      if (existingRow.length === 0) {
        return res.status(404).json({
          message: "Linha não encontrada na base de dados.",
        });
      }
  
    conn.query(
          "UPDATE linhaOnibus SET nome_linha = ?, numero_linha = ?, intinerario = ? WHERE id_linha = ?",
          [nome_linha, numero_linha, intinerario, id_linha]
        );
  
      res.status(200).json({ message: "Linha atualizada com sucesso." });
    } catch (error) {
      res.status(500).json({message: "Dados não foram entrando com sucesso!"})
    }
  };
  
  