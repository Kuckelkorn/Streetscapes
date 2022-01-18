function createCard(obj, fnc, fnc2){
  const element = document.createElement("div")
  element.addEventListener("click", fnc)
  element.addEventListener("click", fnc2)
  element.classList.add("card")
  element.innerHTML = `<p> ${obj.naam} </p>`
  document.body.appendChild(element)
}

export default createCard