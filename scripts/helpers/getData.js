export async function getDichtheid(){
  const url = `https://api.data.amsterdam.nl/v1/bbga/kerncijfers/?jaar=2021&indicatorDefinitieId=WDICHT&_count=true&_format=json`
  let data = await fetch(url)
  data = await data.json()
  const number = await data.page.totalElements
  let dichtheid = await fetch(url + `&_pageSize=${number}`)
  dichtheid = await dichtheid.json()
  dichtheid = dichtheid._embedded.kerncijfers
  return dichtheid
};

export async function getHuishoudens(){
  const url = `https://api.data.amsterdam.nl/v1/bbga/kerncijfers/?jaar=2021&indicatorDefinitieId=BEVHUISHOUDENHH&_count=true&_format=json`
  let data = await fetch(url)
  data = await data.json()
  const number = await data.page.totalElements
  let huishoudens = await fetch(url + `&_pageSize=${number}`)
  huishoudens = await huishoudens.json()
  huishoudens = huishoudens._embedded.kerncijfers
  return huishoudens
}