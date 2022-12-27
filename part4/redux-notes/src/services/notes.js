import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  console.log("hi there");
  const response = await axios.get(baseUrl)
  console.log("this is response",response)
  return response.data
}

export default { getAll }