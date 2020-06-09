//Formulario
// Estado
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) //ou pode usar dessa forma .then( (res) => {return res.json() }) essa parte é uma função anonima que está retornanndo um valor
    .then( states => {

        //para cada estado de estados
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` //cocatenando valores e interpolando
        }
    })
}

populateUFs()


// Cidade
function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")


    const ufValue = event.target.value
    // pergunta qual é o evento - onde esse evento foi executado - qual é o valor do meu target



    // qual o numero do estado selecionado
    const indexOfSelectedState = event.target.selectedIndex // então de 0 26 ele vai falar para mim qual é o numero

    //trocando os valores do input
    //options é um coleção parecida com arrays, que vai de 0 estados até 26
    stateInput.value = event.target.options[indexOfSelectedState].text //eu tenho que saber qual option está selecionado para pegar o texto dele


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>" //limpando o campo cidade
    citySelect.disabled = true //bloqueando o campo cidade

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) //quando mudar que vai executado a função


// Comentarios
// document
//     .querySelector("select[name=uf]") // para pegar o campo estado
//     .addEventListener("change", () => {
//         console.log("mudei")
//     }) //ouvidor de eventos (no caso ele ouvindo mudanças) e tmabpem foi utilizado arrow function (novo jeito de utilizar a função anonima)




//Itens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

//Para cada um deles, adicionar o ouvidor de eventos (que será o click), e chama a função handSelectedItem
for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}



const collectedItems = document.querySelector("input[name=items]")// continuação de atualizar o campo escondido com os itens selecionados (linha 122)

let selectedItems = []

function handleSelectedItem(event){ // função item selecionado manualmente
    const itemLi = event.target

    //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected") //o elemento li - na lista de classes dele - se existe vai remover, se não existe vai adicionar

    const itemId = itemLi.dataset.id

    //aqui ele vai colocar no meu console.log, o que é o meu itemId, isso é para testar
    // console.log('ITEM ID: ', itemId)

    //verificar se existem itens selecionados, se sim
    //pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => { //função procurar pelo index
        const itemFound = item == itemId //isso será true ou false
        return itemFound
    })

    //se já estiver selecionado,
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => { //função filtrar 
            //Se ela achar false, ela vai remover
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems //utilizar a seleção de itens
    } else {
        //se não já estiver selecionado
        //adicionar à seleção
        selectedItems.push(itemId)  //função para colocar um elemnto de um array
    }
    
    //aqui ele vai colocar no meu console.log, o que é o meu selectedItems, isso é para testar
    // console.log('selectedItems: ', selectedItems)

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}