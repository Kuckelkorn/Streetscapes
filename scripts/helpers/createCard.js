function createCard(naam, obj){
  const element = document.querySelector('.dataVeld')
  element.innerHTML = `
  <p> ${naam} </p>
  <p> Dichtheid: ${obj.WDICHT}</p>
  <p> Aantal huishoudens: ${obj.BEVHUISHOUDENHH}
  `
}

export default createCard