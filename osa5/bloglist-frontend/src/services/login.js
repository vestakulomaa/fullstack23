import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async credentials => {
    console.log("went to login")
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }