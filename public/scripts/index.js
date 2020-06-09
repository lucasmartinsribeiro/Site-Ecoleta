//pegar o botão
const buttonSearch = document.querySelector("#page-home main a") 
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")


//quando eu clicar no buttonSearch
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide") //para entrar na tela de pesquisa
})

close.addEventListener("click", () => {
    modal.classList.add("hide") // para sair da tela de pesquisa
})