import axios from "axios"
const baseUrl = 'http://localhost:3001/api/persons'

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    console.log(request)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const deleteUrl = baseUrl + "/" + id
    const request = axios.delete(deleteUrl)
    console.log(request)
    return request.then(response => response.data)
}

const update = (id, newNumber) => {
    const updateUrl = baseUrl + "/" + id
    const request = axios.put(updateUrl, newNumber)
    return request.then(response => response.data)
}

const exportObject = {
    create,
    deletePerson,
    update
}

export default exportObject