import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  console.log("hi there");
  const response = await axios.get(baseUrl)
  console.log("this is response",response)
  return response.data
}

const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default { getAll,createNew }