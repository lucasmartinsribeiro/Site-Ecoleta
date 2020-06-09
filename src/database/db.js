// importar a dependencia do sqlite3
// o require vai retornar um objeto para colocar dentro da variavel
// função quando reside dentro de um objeto, se dá o nome de metodo
/* verbose é um metodo que vai configurar para mim o sqlite 3, dizendo para ele que eu quero ver mensagens no meu terminal sempre que acontecer alguma coisa
*/
const sqlite3 = require("sqlite3").verbose()


//criar objetos que irá fazer operações no banco de dados
/* quando eu uso a palavra chave new, eu posso então iniciar um novo objeto, desde que, o que está sendo retornado aqui para mim, seja um nome que a gente chama de constructor, ou uma classe.
Que é essa parte
sqlite3.Database("./src/database/database.db ")
*/
const db = new sqlite3.Database("./src/database/database.db")

// com o module.exports eu vou exportar o objeto db
module.exports = db

//utilizar o objeto de banco de dados, para nossas operações
//serialize que dizer que ele vai rodar uma sequencia de codigo
// db.serialize( () =>{
    //Com comandos SQL eu vou:

//     // 1 Criar uma tabela
//     //o sql vai criar uma tabela de nome place, se não existir.
//     //em baixo eu vou colocar os campos que eu preciso
//     /*só que antes disso eu vou criar um identificador único com o nome de id INTEGER, o INTEGER que ele é do tipo 
//       númerico do sql.
//       E ele é uma chave primaria, que significa que esse é o campo principal que essa tabela vai usar para identificar
//       o meu registro.
//       O campo AUTOINCREMENT significa que el vai ter números que vão se incrementar
//     */
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             photo TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)


//     // 2 Inserir dados na tabela
//     //você vai inserir na tabela places valores
//     //no primeiro () vai identificar os campos e no segundo () vai identificar os valores
//     const query = `
//         INSERT INTO places (
//             photo,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?, ?, ?, ?, ?, ?, ?);
//     `

//     //como segundo argumento, agora eu vou fazer a troca das interrogações por uma coleção(array)
//     const values = [
//         "http://localhost:3000/assets/imagens/photo02-recycle.jpg",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "N° 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão",
//     ]

//     /*assim que rodar a query e inserir esses values no banco de dados, eu quero que execute uma função do estilo callback, que significa, chame essa função de volta somente quando terminar tudo isso. A função callback tem duas caracteristicas: 1-É uma função passada como parametro / 2-É uma função que vai ser chamada depois de um serto tempo
//     */
//     //
//     function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this) //o this dentro dessa função, ele está referenciado a resposta que p run está trazendo
//     }

//     //vou passar a função afterInsertData por referencia, porque ela só vai ser executada depois de rodar tudo
//     db.run(query, values, afterInsertData)


    // // 3 Consultar os dados na tabela
    // //vai selecionar todos os campos da tabela places
    // // rows serão os registros da minha tabela, mas ela vai vir em um formato de array
    // /* se eu quisesse trazer só os nomes, eu colocaria name no lugar do * . Então viria todos registros só com a coluna nome
    // */
    // db.all(`SELECT * FROM places`, function(err, rows){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Aqui estão os seus registos: ")
    //     console.log(rows) // coloquei o rows no console.log para eu ver os meus registros
    // })

    
    // 4 Deletar um dado na tabela
    //DELETE FROM places seria para deletar tudo da tabela places
    // Você vai deletar tudo da tabela onde id é igaul a uma interrogação
    //Entre os parenteses está o número de interrogações
//     db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
//         if(err){
//             return console.log(err)
//         }

//         console.log("Registro deletado com sucesso!")
//     })

// })