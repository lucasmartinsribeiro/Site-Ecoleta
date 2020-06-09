const express = require("express") //eu vou fazer o pedido do express, ele vai voltar e ficar nessa variavel
const server = express() //estou executando a função express no server


//pegar o banco de dados
const db = require("./database/db.js")


//configurar pasta publica
server.use(express.static("public"))


//habilitar o uso do req.body na nossa aplicação
//use serve para fazer configurações no nosso express
server.use(express.urlencoded({ extended: true }))


//utilizando template engine
const nunjucks = require("nunjucks") //estou pedindo um modulo/pacote, que o npm já instalou
nunjucks.configure("src/views", { //o primeiro argumento que ela vai pedir,é qual pasta que está os htmls
    express:server, // aqui estou falando que o nosso servidor express é o server
    noCache: true // o nunjucks pode devolver uma versão velha do documento por causa do cache, então eu retiro o cache, para que não venha ocorrer bugs
})


//configurar caminhos da minha aplicação
//pádina inical
// req: requisição
// res: resposta
server.get("/", (req, res) => {
    //senFile: envie um arquivo
    //__dirname: é uma variavel global já criada. Ele vai me devolver o nome do diretorio que eu estou
    //res.sendFile(__dirname + "/views/index.html")

    
    //Renderizando as páginas
    // o render do res está sendo responsavel de entender que eu tenho o nunjacks aqui configurado. Eu liguei o nunjacks atraves do express
    // enviando um dado
    // resposta do nosso pedido, enviando o dado pelo front-end
     //enviando um dado para o nunjucks
    return res.render("index.html", {title: "Um titulo"})

    /*res.send("Hello word")
    quando ele executar essa função, ele vai enviar essa resposta
    Essa é a resposta do servidor
    */
})


server.get("/create-point", (req, res) => {

    //req.query: trabalha com Query Strings da nossa url, ou seja, com aquelas
    //interrogações, nome, & e tudo mais
    // console.log(req.query)


    return res.render("create-point.html")
})

//para fazer um post
server.post("/savepoint", (req, res) => {
    //req.body: O corpo do nosso formulário
    // console.log(req.body)

    //inserir dados no banco de dados
    //você vai inserir na tabela places valores
    //no primeiro () vai identificar os campos e no segundo () vai identificar os valores
    const query = `
        INSERT INTO places (
            photo,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `

    //como segundo argumento, agora eu vou fazer a troca das interrogações por uma coleção(array)
    const values = [
       req.body.photo,
       req.body.name,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.items
    ]

    /*assim que rodar a query e inserir esses values no banco de dados, eu quero que execute uma função do estilo callback, que significa, chame essa função de volta somente quando terminar tudo isso. A função callback tem duas caracteristicas: 1-É uma função passada como parametro / 2-É uma função que vai ser chamada depois de um serto tempo
    */
    //
    function afterInsertData(err){
        //tratamento de erro
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this) //o this dentro dessa função, ele está referenciado a resposta que p run está trazendo

        return res.render("create-point.html", { saved: true })
    }

    //vou passar a função afterInsertData por referencia, porque ela só vai ser executada depois de rodar tudo
    db.run(query, values, afterInsertData)

})





server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }

    /*pegar os dados do banco de dados
    //vai selecionar todos os campos da tabela places onde
    //estou falando para ele colocar a cidade
    //passar uma string no sql, eu tenho que colocar entre aspas string
    //quando eu não quero que pegue só exatamente o que está escrito, eu coloco LIKE e coloco duas %
    rows serão os registros da minha tabela, mas ela vai vir em um formato de array
    */
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' `, function(err, rows){
        if(err){
            return console.log(err)
        }

        //length vai contar para mim quantos elementos em tenho dentro do array
        // então eu tenho total de elementos, que no caso aqui, vai ser dois
        const total = rows.length

        // //esses dois consoles é para conferir, eles não necessarios aqui na aplicação
        // console.log("Aqui estão os seus registos: ")
        // console.log(rows) // coloquei o rows no console.log para eu ver os meus registros

        //mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })

})


//ligar o servidor
server.listen(3000) //pego o objeto server e fala para ele executar/ouvir a porta 3000