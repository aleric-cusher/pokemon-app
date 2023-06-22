
const getFromUrl = async (url, showError) => {
  let data = null
  try{
    let response = await fetch(url)
    if (response.status !== 200){
      showError('Something went wrong with fetching data!')
      console.log(response.statusText)
    } else {
      data = await response.json()
      return data
    }
  } catch(error) {
    showError('Error occured while fetching data!')
    console.log('Error:', error)
  }
  return data
}

export default getFromUrl